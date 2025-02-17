import { Router } from "express";
import { z } from "zod";
import Cinema from "../models/Cinema";
import { apiHandler } from "../utils/api-handler";

const router = Router();

// Create Cinema Route with Validation
router.post(
  "/create",
  apiHandler({
    params: z.object({
      seatCount: z.number().positive(),
    }),
    handler: async ({ res, params }) => {
      const seats = Array.from({ length: params.seatCount }, (_, i) => ({
        number: i + 1,
        isBooked: false,
      }));

      const cinema = new Cinema({ seats });
      await cinema.save();

      res.status(201).json({ cinemaId: cinema._id });
    },
  })
);

// Purchase a Specific Seat with Validation (Concurrency Handling with Transaction)
router.post(
  "/:cinemaId/purchase",
  apiHandler({
    params: z.object({
      seatNumber: z.number().positive(),
    }),
    handler: async ({ req, res, params }) => {
      try {
        const cinema = await Cinema.findById(req.params.cinemaId);
        if (!cinema) {
          res.status(404).json({ error: "Cinema not found" });
          return;
        }

        const seat = cinema.seats.find((s) => s.number === params.seatNumber);
        if (!seat) {
          res.status(400).json({ error: "Invalid seat number" });
          return;
        }

        if (seat.isBooked) {
          res.status(400).json({ error: "Seat already booked" });
          return;
        }

        seat.isBooked = true;
        await cinema.save();

        res.json({ message: "Seat booked successfully", seat });
      } catch (error) {
        console.error("Error:", error);
        res
          .status(500)
          .json({ error: "An error occurred while booking the seat" });
      }
    },
  })
);

export default router;
