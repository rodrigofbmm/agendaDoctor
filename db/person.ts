import mongoose from "npm:mongoose@7.6.3";
import { Slot } from "../types.ts";

const Schema = mongoose.Schema;

const SlotSchema = new Schema(
  {
    day: { type: Number, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    hour: { type: Number, required: true },
    available: { type: Boolean, required: false },
    dni: { type: String, required: false },
  },
  { timestamps: true }
);

export type SlotModelType = mongoose.Document & Omit<Slot, "id">;

export default mongoose.model<SlotModelType>("Slot", SlotSchema);