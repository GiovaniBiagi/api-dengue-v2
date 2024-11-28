import type { Request, Response } from "express";

import { sendEmail } from "../lib/nodemailer";

type SubscribePost = {
  email: string;
};

export const newsletterController = {
  subscribe: async (
    request: Request<{}, {}, SubscribePost>,
    response: Response
  ) => {
    const { email } = request.body;

    if (!email) {
      response.status(400).json({ error: "Email não informado" });
      return;
    }

    try {
      await sendEmail({
        from: '"Portal da dengue 🦟" <giovani.alves121@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "Atualizações - Portal da dengue", // Subject line
        text: "Atualização sobre o avanço dos casos na cidade de Indaiatuba", // plain text body
      });
      response.status(200).json({ message: "Email enviado com sucesso" });
      return;
    } catch (error) {
      response.status(500).json({ error });
      return;
    }
  },
};
