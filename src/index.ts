import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import routes from "./routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routes);

// app.post("/newsletter", async (request, response) => {
//   const { email } = request.query;

//   try {
//     await sendEmail({
//       from: '"Portal da dengue 🦟" <giovani.alves121@gmail.com>', // sender address
//       to: `${email}`, // list of receivers
//       subject: "Atualizações - Portal da dengue", // Subject line
//       text: "Atualização sobre o avanço dos casos na cidade de Indaiatuba", // plain text body
//     });

//     response.status(200).json({ message: "Email enviado com sucesso" });
//   } catch (error) {
//     response.status(500).json({ error });
//   }
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
