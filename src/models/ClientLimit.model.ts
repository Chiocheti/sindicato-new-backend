import { DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import db from "./";

class ClientLimit extends Model {
  declare id: string;
  declare clientId: string;
  declare limitId: string;
  declare name: string;
  declare limitValue: number;
}

ClientLimit.init(
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
    clientId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: "clients",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    limitId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: "limits",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    limitValue: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    sequelize: db,
    tableName: "client_limits",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

export default ClientLimit;
