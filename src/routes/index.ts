import { Router } from "express";

import authRoutes from "./Auth.routes";
import clientRoutes from "./Client.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/clients", clientRoutes);

export default router;
