import { Request, Response } from "express";
import Api from "../lib/api";

const searchParams = new URLSearchParams({
  geocode: "3520509",
  disease: "dengue",
  format: "json",
  ew_start: "1",
  ew_end: "25",
  ey_start: "2023",
  ey_end: "2024",
});

export const dengueController = {
  getDengueData: async (request: Request, response: Response) => {
    try {
      const fetchResponse = await Api.get(`/alertcity?${searchParams}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      response.json(fetchResponse.data);
    } catch (error) {
      response.status(500).json({ error });
    }
  },
};
