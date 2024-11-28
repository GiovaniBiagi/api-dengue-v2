import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { News, NewsSchema } from "../models/news.model";

type NewsPost = News;

export const newsController = {
  getNews: async (request: Request, response: Response) => {
    try {
      const news = await prisma.news.findMany();
      response.json(news);
    } catch (error) {
      response
        .status(500)
        .json({ message: "Não existem notícias cadastradas", errors: error });
    }
  },
  getNewsById: async (request: Request, response: Response) => {
    const { id } = request.params;

    if (!id) {
      response.status(400).json({ message: "ID não informado" });
      return;
    }

    try {
      const news = await prisma.news.findUnique({
        where: {
          id,
        },
      });

      response.json(news);
    } catch (error) {
      response.status(500).json({ error });
    }
  },
  createNews: async (
    request: Request<{}, {}, NewsPost>,
    response: Response
  ) => {
    const body = NewsSchema.safeParse(request.body);

    if (!body.success) {
      response
        .status(400)
        .json({ message: "Falha ao criar notícia.", error: body.error });
      return;
    }

    const news = body.data;

    try {
      const createdNews = await prisma.news.create({
        data: news,
      });

      response.status(201).json(createdNews);
    } catch (error) {
      response.status(500).json({ error });
    }
  },
  updateNews: async (request: Request, response: Response) => {
    const { id } = request.params;

    if (!id) {
      response.status(400).json({ message: "ID não informado" });
      return;
    }

    try {
      const news = prisma.news.update({
        where: {
          id,
        },
        data: request.body,
      });

      response.json(news);
    } catch (error) {
      response.status(500).json({ error });
    }
  },
  deleteNews: (request: Request, response: Response) => {
    const { id } = request.params;

    if (!id) {
      response.status(400).json({ message: "ID não informado" });
      return;
    }

    try {
      prisma.news.delete({
        where: {
          id,
        },
      });

      response.status(204).send();
    } catch (error) {
      response.status(500).json({ error });
    }
  },
};
