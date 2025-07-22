import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
  const token = req.headers["x-access-token"];

  if (!token || typeof token !== "string") {
    res.status(401).json({ message: "Nenhum Token Enviado" });
    return;
  }

  try {
    if (!ACCESS_TOKEN_SECRET_KEY) {
      res
        .status(500)
        .json({ message: "ACCESS_TOKEN_SECRET_KEY não esta definido" });
      return;
    }

    try {
      jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);
    } catch (error) {
      res.status(401).json({ message: "Token invalido ou expirado" });
      return;
    }

    next();
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
    return;
  }
}
