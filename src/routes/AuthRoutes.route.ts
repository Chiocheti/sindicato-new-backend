import { Router, Request, Response } from "express";

import authenticate from "../middlewares/auth";
import AuthController from "../controllers/Auth.controller";

const authRoutes = Router();

authRoutes.put("/login", async (req: Request, res: Response) => {
  await AuthController.login(req, res);
});

authRoutes.put("/logout", authenticate, async (req: Request, res: Response) => {
  await AuthController.login(req, res);
});

export default authRoutes;
