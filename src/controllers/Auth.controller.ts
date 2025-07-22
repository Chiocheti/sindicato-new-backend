import { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.model";

import { ExpectedApiResponse } from "../Types/ApiTypes";
import Role from "../models/Role.model";
import Permission from "../models/Permission.model";

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;

const ACCESS_TOKEN_DURATION = "7d";
const REFRESH_TOKEN_DURATION = "30d";

const AuthController = {
  async login(req: Request, res: Response) {
    const username: string = req.body.username;
    const password: string = req.body.password;

    try {
      const findUser = await User.findOne({ where: { username } });

      if (!findUser) {
        const apiResponse: ExpectedApiResponse = {
          success: false,
          type: 3,
          data: JSON.stringify("Usuário ou Senha Incorretos"),
        };

        return res.status(201).json(apiResponse);
      }

      const isMatch = await bcrypt.compare(password, findUser.password);

      if (!isMatch) {
        const apiResponse: ExpectedApiResponse = {
          success: false,
          type: 3,
          data: JSON.stringify("Usuário ou Senha Incorretos"),
        };

        return res.status(201).json(apiResponse);
      }

      if (!REFRESH_TOKEN_SECRET_KEY || !ACCESS_TOKEN_SECRET_KEY) {
        const apiResponse: ExpectedApiResponse = {
          success: false,
          type: 1,
          data: JSON.stringify("Houve um erro interno"),
        };

        return res.status(500).json(apiResponse);
      }

      const accessToken = jwt.sign(
        { id: findUser.id },
        ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: ACCESS_TOKEN_DURATION }
      );

      const refreshToken = jwt.sign(
        { id: findUser.id },
        REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: REFRESH_TOKEN_DURATION }
      );

      await findUser.update({ refreshToken });

      const apiResponse: ExpectedApiResponse = {
        success: true,
        type: 0,
        data: JSON.stringify({
          user: findUser,
          tokens: { accessToken, refreshToken },
        }),
      };

      return res.status(200).json(apiResponse);
    } catch (error) {
      console.log(error);

      const apiResponse: ExpectedApiResponse = {
        success: false,
        type: 1,
        data: JSON.stringify("Houve um erro interno"),
      };

      return res.status(500).json(apiResponse);
    }
  },

  async logout(req: Request, res: Response) {
    const id: string = req.body.id;
    try {
      const findUser = await User.findByPk(id);

      if (!findUser) {
        const apiResponse: ExpectedApiResponse = {
          success: false,
          type: 3,
          data: JSON.stringify("Usuário não encontrado"),
        };

        return res.status(201).json(apiResponse);
      }

      await findUser.update({ refreshToken: null });

      const apiResponse: ExpectedApiResponse = {
        success: true,
        type: 0,
        data: JSON.stringify("Deslogado com sucesso"),
      };

      return res.status(500).json(apiResponse);
    } catch (error) {
      console.log(error);

      const apiResponse: ExpectedApiResponse = {
        success: false,
        type: 1,
        data: JSON.stringify("Houve um erro interno"),
      };

      return res.status(500).json(apiResponse);
    }
  },
};

export default AuthController;
