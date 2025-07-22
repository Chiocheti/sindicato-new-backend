import { Op } from "sequelize";
import { Response, Request } from "express";

import Client from "../models/Client.model";
import Address from "../models/Address.model";
import Dependent from "../models/Dependent.model";
import ClientHistory from "../models/ClientHistory.model";
import ClientLimit from "../models/ClientLimit.model";

const ClientController = {
  async findById(req: Request, res: Response) {
    const id: string = req.body.id;

    try {
      if (!id || typeof id !== "string") {
        return res.status(400).json("Id não informado");
      }

      const findClient = await Client.findByPk(id, {
        include: [
          {
            model: Address,
            as: "address",
          },
          {
            model: Dependent,
            as: "dependents",
          },
          {
            model: ClientHistory,
            as: "clientHistories",
          },
          {
            model: ClientLimit,
            as: "clientLimits",
          },
        ],
        order: [
          ["dependents", "order"],
          ["clientHistories", "order"],
          ["clientLimits", "name", "ASC"],
        ],
      });

      return res.status(200).json(findClient);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Houve um erro interno" });
    }
  },

  async search(req: Request, res: Response) {
    const filter: string = req.body.filter;

    try {
      if (!filter || typeof filter !== "string") {
        return res.status(400).json("Filter não informado");
      }

      const findClients = await Client.findAll({
        attributes: ["id", "name", "cpfNumber"],
        where: {
          [Op.or]: {
            name: { [Op.like]: `%${filter}%` },
            cpfNumber: { [Op.like]: `%${filter}%` },
          },
        },
        limit: 20,
        order: ["name", "cpfNumber"],
      });

      return res.status(200).json(findClients);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Houve um erro interno" });
    }
  },
};

export default ClientController;
