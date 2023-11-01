import { Request, Response } from "npm:express@4.18.2";
import SlotModel from "../db/person.ts";

const isValidDate = (year: number, month: number, day: number, hour: number): boolean => {
    const date = new Date(year, month - 1, day, hour);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day &&
      date.getHours() === hour
    );
  };
  
const addSlot = async (req: Request, res: Response) => {
  try {
    const { day, month, year, hour, dni } = req.body;

    if (!day || !month || !year || !hour) {
      res.status(406).send("Datos de fecha y hora incorrectos");
      return;
    }

    if (!isValidDate(year, month, day, hour)) {
        res.status(406).send("Datos de fecha y hora incorrectos");
        return;
      }
    const foundSlot = await SlotModel.findOne({ day, month, year, hour });
    if (foundSlot) {
      if (!foundSlot.available) {
        res.status(403).send("La cita ya está ocupada");
        return;
      } else {
        res.status(200).send("La cita ya existe y está disponible");
        return;
      }
    }

    const newPerson = new SlotModel({ day, month, year, hour, available: true , dni });
    await newPerson.save();

    res.status(200).send({
      day: newPerson.day,
      month: newPerson.month,
      year: newPerson.year,
      hour: newPerson.hour,
      available: newPerson.available,
      dni: newPerson.dni,
      id: newPerson._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addSlot;