import { Request, Response } from "npm:express@4.18.2";
import SlotModel from "../db/person.ts";

const removeSlot = async (req: Request, res: Response) => {
    try {
      const { day, month, year, hour } = req.query;
  
      if (!day || !month || !year || !hour) {
        res.status(406).send("Formato de solicitud incorrecto. Debe especificar day, month, year y hour.");
        return;
      }
  
      const query = {
        day: parseInt(day as string, 10),
        month: parseInt(month as string, 10),
        year: parseInt(year as string, 10),
        hour: parseInt(hour as string, 10),
      };
  
      const foundSlot = await SlotModel.findOne({ ...query });
  
      if (!foundSlot) {
        res.status(404).send("No se encontró una cita en el horario especificado");
        return;
      }
  
      if (foundSlot.available) {
        res.status(200).send("Cita eliminada");
        await SlotModel.findByIdAndRemove(foundSlot._id);
      } else {
        res.status(409).send("La cita ya está ocupada y no se puede eliminar");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  export default removeSlot;