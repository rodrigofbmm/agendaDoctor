import { Request, Response } from "npm:express@4.18.2";
import SlotModel from "../db/person.ts";


const bookSlot = async (req: Request, res: Response) => {
  try {
    const { day, month, year, hour, dni } = req.body;
    
    const slot = 1;

    if (!day || !month || !year || !hour || !dni) {
      res.status(400).send("Faltan parámetros en la solicitud");
      return;
    }

    const query = {
      day: parseInt(day as string, 10),
      month: parseInt(month as string, 10),
      year: parseInt(year as string, 10),
      hour: parseInt(hour as string, 10),
    };

    const foundSlot = await SlotModel.findOne({ ...query, available: true }).exec();

    if (!foundSlot) {
      res.status(404).send("No hay una cita disponible en la fecha y hora especificadas");
      return;
    }

    foundSlot.available = false;
    foundSlot.dni = dni;
    await foundSlot.save();

    res.status(200).send("Cita reservada con éxito");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default bookSlot;
