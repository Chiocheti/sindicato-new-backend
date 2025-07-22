import { DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

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
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: 4,
      },
    },
    bank: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    agency: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    account: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    monthly: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    over: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    reserved: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    checkNumber: {
      allowNull: false,
      type: DataTypes.INTEGER,
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

Bill.belongsTo(Bank, {
  foreignKey: "bankId",
  as: "bank",
});

Bank.hasMany(Conciliation, {
  foreignKey: "bankId",
  as: "conciliations",
});

Conciliation.belongsTo(Bank, {
  foreignKey: "bankId",
  as: "bank",
});

Bank.hasMany(MedicBill, {
  foreignKey: "bankId",
  as: "medicBills",
});

MedicBill.belongsTo(Bank, {
  foreignKey: "bankId",
  as: "bank",
});

export default Bank;
