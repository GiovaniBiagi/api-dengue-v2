import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { envs } from "../envs";

export const userController = {
  me: async (request: Request, response: Response) => {
    const token = request.headers.authorization?.split(" ")[1];

    console.log({ token });

    const decodedToken = jwt.verify(token!, envs.JWT_SECRET);

    if (!decodedToken || typeof decodedToken === "string") {
      response.status(401).json({ message: "Não autorizado." });
      return;
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: decodedToken.id,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      });

      if (!user) {
        response.status(404).json({ message: "Usuário não encontrado." });
        return;
      }

      response.json(user);
    } catch (error) {
      console.log({ error });
      response
        .status(400)
        .json({ message: "Falha ao solicitar informações do usuário." });
    }
  },
};
