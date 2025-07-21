import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ExpectedApiResponse } from "../Types/ApiTypes";

export default function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
  const token = req.headers["x-access-token"];

  if (!token || typeof token !== "string") {
    const apiResponse: ExpectedApiResponse = {
      success: false,
      type: 1,
      data: JSON.stringify("Nenhum Token Enviado"),
    };

    res.status(201).json(apiResponse);
    return;
  }

  try {
    if (!ACCESS_TOKEN_SECRET_KEY) {
      const apiResponse: ExpectedApiResponse = {
        success: false,
        type: 1,
        data: JSON.stringify("ACCESS_TOKEN_SECRET_KEY não esta definido"),
      };

      res.status(201).json(apiResponse);
      return;
    }

    try {
      jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);
    } catch (error) {
      const apiResponse: ExpectedApiResponse = {
        success: false,
        type: 1,
        data: JSON.stringify("Token invalido ou expirado"),
      };

      res.status(201).json(apiResponse);
      return;
    }

    next();
  } catch (error) {
    const apiResponse: ExpectedApiResponse = {
      success: false,
      type: 1,
      data: JSON.stringify(error),
    };

    res.status(201).json(apiResponse);
    return;
  }
}
