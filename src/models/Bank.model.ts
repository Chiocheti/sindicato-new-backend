import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Sequelize from "sequelize";

import db from "./";
import Bill from "./Bill.model";
import Conciliation from "./Conciliation.model";
import MedicBill from "./MedicBill.model";

class Bank extends Model {
  declare id: string;
  declare bank: string;
  declare type: string;
  declare agency: string;
  declare account: string;
  declare monthly: number;
  declare over: number;
  declare reserved: number;
  declare checkNumber: number;
}

Bank.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      validate: {
        isUUID: 4,
      },
    },
    bank: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    type: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    agency: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    account: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    monthly: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 2),
    },
    over: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 2),
    },
    reserved: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 2),
    },
    checkNumber: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize: db,
    tableName: "banks",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

Bank.hasMany(Bill, {
  foreignKey: "bankId",
  as: "bills",
});

Bank.hasMany(Conciliation, {
  foreignKey: "bankId",
  as: "conciliations",
});

Bank.hasMany(MedicBill, {
  foreignKey: "bankId",
  as: "medicBills",
});

export default Bank;
