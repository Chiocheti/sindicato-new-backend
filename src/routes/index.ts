import { Router } from "express";

import authRoutes from "./AuthRoutes.route";

const router = Router();

router.use("/auth", authRoutes);

export default router;
