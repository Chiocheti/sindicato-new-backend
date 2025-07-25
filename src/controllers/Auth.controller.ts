import { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.model";
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
      const findUser = await User.findOne({
        where: { username },
        attributes: {
          exclude: ["refreshToken"],
        },
        include: [
          {
            model: Role,
            as: "roles",
            attributes: {
              exclude: ["id"],
            },
          },
          {
            model: Permission,
            as: "permissions",
            attributes: {
              exclude: ["id"],
            },
          },
        ],
      });

      if (!findUser) {
        return res.status(401).json({ message: "Usuário ou Senha Incorretos" });
      }

      const isMatch = await bcrypt.compare(password, findUser.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Usuário ou Senha Incorretos" });
      }

      if (!REFRESH_TOKEN_SECRET_KEY || !ACCESS_TOKEN_SECRET_KEY) {
        return res.status(500).json({ message: "Houve um erro interno" });
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

      return res.status(200).json({
        user: findUser,
        tokens: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Houve um erro interno" });
    }
  },

  async logout(req: Request, res: Response) {
    const id: string = req.body.id;

    try {
      const findUser = await User.findByPk(id);

      if (!findUser) {
        return res.status(401).json({ message: "Usuário não encontrado" });
      }

      await findUser.update({ refreshToken: null });

      return res.status(200).json({ message: "Deslogado com sucesso" });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Houve um erro interno" });
    }
  },
};

export default AuthController;
