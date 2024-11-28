import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import type { User } from "@prisma/client";

import { prisma } from "../lib/prisma";
import { envs } from "../envs";
import type { Error } from "../types/error";
import { UserSchema } from "../models/user.model";
import { hashPassowrd, verifyPassword } from "../utils/password";

type AuthRegisterPost = User;
type AuthRegisterResponseWithoutPassword = Omit<User, "password">;
type AuthLoginResponse = { token: string };
type AuthLoginPost = { email: string; password: string };

export const authController = {
  register: async (
    request: Request<{}, {}, AuthRegisterPost>,
    response: Response<AuthRegisterResponseWithoutPassword | Error>
  ) => {
    const body = UserSchema.safeParse(request.body);

    if (!body.success) {
      response
        .status(400)
        .json({ message: "Invalid data", errors: body.error.errors });
      return;
    }

    const { password, email } = body.data;

    const { salt, hash } = hashPassowrd(password);

    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        response.status(400).json({ message: "Este usuário já existe." });
        return;
      }

      const data = {
        ...body.data,
        password: `${salt}:${hash}`,
        birthDate: new Date(body.data.birthDate),
      };

      const user = await prisma.user.create({
        data,
      });

      response.status(201).json(user);
    } catch (error) {
      console.log({ error });
      response
        .status(400)
        .json({ message: "Falha na criação de novo usuário." });
    }
  },
  login: async (
    request: Request<{}, {}, AuthLoginPost>,
    response: Response<AuthLoginResponse | Error>
  ) => {
    const { email, password } = request.body;

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        response.status(401).json({ message: "Credenciais inválidas." });
        return;
      }

      const [salt, hash] = user.password.split(":");
      const isPasswordValid = verifyPassword(password, salt, hash);

      if (!isPasswordValid) {
        response.status(401).json({ message: "Credenciais inválidas." });
        return;
      }

      const token = jwt.sign(
        {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        envs.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      response.status(200).json({ token });
    } catch (error) {
      console.log({ error });
      response.status(400).json({ message: "Falha ao realizar login." });
    }
  },
};
