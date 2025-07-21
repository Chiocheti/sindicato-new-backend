import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Sequelize from "sequelize";

import db from "./";
import Client from "./Client.model";

class ClientBank extends Model {
  declare id: string;
  declare name: string;
  declare value: number;
}

ClientBank.init(
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
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    value: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize: db,
    tableName: "clientBanks",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

ClientBank.hasMany(Client, {
  foreignKey: "clientBankId",
  as: "clients",
});

export default ClientBank;
