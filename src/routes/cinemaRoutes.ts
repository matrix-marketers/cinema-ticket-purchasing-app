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

export default router;
