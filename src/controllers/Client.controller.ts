import { Op } from "sequelize";
import { Response, Request } from "express";

import Client from "../models/Client.model";
import Address from "../models/Address.model";
import Dependent from "../models/Dependent.model";
import ClientHistory from "../models/ClientHistory.model";
import ClientLimit from "../models/ClientLimit.model";
import Bill from "../models/Bill.model";
import Conciliation from "../models/Conciliation.model";
import MedicBill from "../models/MedicBill.model";
import Bank from "../models/Bank.model";
import Service from "../models/Service.model";
import Refund from "../models/Refund.model";
import Specialty from "../models/Specialty.model";
import Contract from "../models/Contract.model";
import BillingPriority from "../models/BillingPriority.model";
import Contribution from "../models/Contribution.model";

const ClientController = {
  async findById(req: Request, res: Response) {
    const id: string = req.body.id;
    const complete: boolean = req.body.complete;
    const startLastMonth: string = req.body.startLastMonth;
    const endLastMonth: string = req.body.endLastMonth;
    const startMonth: string = req.body.startMonth;
    const endMonth: string = req.body.endMonth;

    try {
      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "Id não informado" });
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

      if (!complete) {
        return res.status(200).json(findClient);
      }

      if (!startLastMonth || !endLastMonth || !startMonth || !endMonth) {
        return res
          .status(400)
          .json({ message: "Datas incorretas ou faltando" });
      }

      const monthBills = await Bill.findAll({
        include: [
          {
            model: Bank,
            as: "bank",
          },
        ],
        where: {
          clientId: id,
          date: { [Op.gte]: startMonth },
        },
        order: ["date"],
      });

      const lastBills = await Bill.findAll({
        include: [
          {
            model: Bank,
            as: "bank",
          },
        ],
        where: {
          clientId: id,
          date: { [Op.lt]: startMonth },
        },
        order: ["date"],
      });

      const monthConciliations = await Conciliation.findAll({
        include: [
          {
            model: Bank,
            as: "bank",
          },
        ],
        where: {
          clientId: id,
          date: { [Op.gte]: startMonth },
        },
        order: ["date"],
      });

      const lastConciliations = await Conciliation.findAll({
        include: [
          {
            model: Bank,
            as: "bank",
          },
        ],
        where: {
          clientId: id,
          date: { [Op.lt]: startMonth },
        },
        order: ["date"],
      });

      const monthMedicBills = await MedicBill.findAll({
        include: [
          {
            model: Bank,
            as: "bank",
          },
          {
            model: Service,
            as: "service",
          },
        ],
        where: {
          clientId: id,
          date: { [Op.gte]: startMonth },
        },
        order: ["date"],
      });

      const lastMedicBills = await MedicBill.findAll({
        include: [
          {
            model: Bank,
            as: "bank",
          },
          {
            model: Service,
            as: "service",
          },
        ],
        where: {
          clientId: id,
          date: { [Op.lt]: startMonth },
        },
        order: ["date"],
      });

      const monthRefunds = await Refund.findAll({
        include: [
          {
            model: Specialty,
            as: "specialty",
          },
          {
            model: Dependent,
            as: "dependent",
          },
          {
            model: Client,
            as: "client",
          },
        ],
        where: {
          clientId: id,
          date: { [Op.gte]: startMonth },
        },
        order: ["date"],
      });

      const lastRefunds = await Refund.findAll({
        include: [
          {
            model: Specialty,
            as: "specialty",
          },
          {
            model: Dependent,
            as: "dependent",
          },
          {
            model: Client,
            as: "client",
          },
        ],
        where: {
          clientId: id,
          date: { [Op.lt]: startMonth },
        },
        order: ["date"],
      });

      const lastMonthContracts = await Contract.findAll({
        include: [
          {
            model: BillingPriority,
            as: "billingPriority",
          },
        ],
        where: {
          clientId: id,
          date: { [Op.between]: [startLastMonth, endLastMonth] },
        },
        order: ["date", ["billingPriority", "name"]],
      });

      const monthContracts = await Contract.findAll({
        include: [
          {
            model: BillingPriority,
            as: "billingPriority",
          },
        ],
        where: {
          clientId: id,
          date: { [Op.between]: [startMonth, endMonth] },
        },
        order: ["date", ["billingPriority", "name"]],
      });

      const nextContracts = await Contract.findAll({
        include: [
          {
            model: BillingPriority,
            as: "billingPriority",
          },
        ],
        where: {
          clientId: id,
          date: { [Op.gt]: endMonth },
        },
        order: ["date", ["billingPriority", "name"]],
      });

      const lastContracts = await Contract.findAll({
        include: [
          {
            model: BillingPriority,
            as: "billingPriority",
          },
        ],
        where: {
          clientId: id,
          date: { [Op.lt]: startLastMonth },
        },
        order: ["date", ["billingPriority", "name"]],
      });

      const contributions = await Contribution.findAll({
        where: { clientId: id },
        order: ["date"],
      });

      return res.status(200).json({
        findClient,
        monthBills,
        lastBills,
        monthConciliations,
        lastConciliations,
        monthMedicBills,
        lastMedicBills,
        monthRefunds,
        lastRefunds,
        lastMonthContracts,
        monthContracts,
        nextContracts,
        lastContracts,
        contributions,
      });
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
