import { DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import db from "./";

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
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: 4,
      },
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    value: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    tableName: "client_banks",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

export default ClientBank;
