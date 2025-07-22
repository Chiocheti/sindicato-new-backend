import { Router, Request, Response } from "express";

import authenticate from "../middlewares/auth";
import ClientController from "../controllers/Client.controller";

const clientRoutes = Router();

clientRoutes.post(
  "/findById",
  authenticate,
  async (req: Request, res: Response) => {
    await ClientController.findById(req, res);
  }
);

clientRoutes.post(
  "/search",
  authenticate,
  async (req: Request, res: Response) => {
    await ClientController.search(req, res);
  }
);

export default clientRoutes;
