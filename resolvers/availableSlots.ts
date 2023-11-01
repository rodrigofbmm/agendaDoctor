import { Request, Response } from "npm:express@4.18.2";
import SlotModel from "../db/person.ts";


const availableSlots = async (req: Request, res: Response) => {
  try {
    const { month, year } = req.query;

    if (!year || !month) {
      res.status(406).send("Endpoint mal construido. Debe especificar año y mes.");
      return;
    }

    const query = {
      year: parseInt(year as string, 10),
      month: parseInt(month as string, 10),
    };

   
    const availableSlots = await SlotModel.find({ ...query, available: true }).exec();

    res.status(200).send(availableSlots);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default availableSlots;
