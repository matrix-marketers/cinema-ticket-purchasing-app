import mongoose, { Schema, Document } from "mongoose";

interface ISeat extends Document {
  number: number;
  isBooked: boolean;
}

interface ICinema extends Document {
  seats: ISeat[];
}

const SeatSchema = new Schema<ISeat>({
  number: { type: Number, required: true },
  isBooked: { type: Boolean, default: false },
});

const CinemaSchema = new Schema<ICinema>({
  seats: [SeatSchema],
});

const Cinema = mongoose.model<ICinema>("Cinema", CinemaSchema);
export default Cinema;
