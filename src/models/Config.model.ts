import { DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import db from "./";

class Config extends Model {
  declare id: string;
  declare amount: number;
  declare receiverNumber: number;
  declare actualizedMonthlyCredit: boolean;
  declare actualizedAnnualCredit: boolean;
  declare aposentadoPaymentDate: string;
  declare ativoPaymentDate: string;
}

Config.init(
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
    amount: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    receiverNumber: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    actualizedMonthlyCredit: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    actualizedAnnualCredit: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    aposentadoPaymentDate: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
    ativoPaymentDate: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
  },
  {
    sequelize: db,
    tableName: "configs",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

export default Config;
