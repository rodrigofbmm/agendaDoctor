import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import  removeSlot from "./resolvers/removeSlot.ts";
import  availableSlots  from "./resolvers/availableSlots.ts";
import  addSlot  from "./resolvers/addSlot.ts";
import  bookSlot  from "./resolvers/bookSlot.ts";


import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

const MONGO_URL=env.MONGO_URL||Deno.env.get("MONGO_URL");// si hay .emv lo leo si no lo lee de las variables de entorno de deno

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());
app
.post("/addSlot", addSlot)
.delete("/removeSlot", removeSlot)
.get("/availableSlots", availableSlots)
.put("/bookSlot", bookSlot);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});