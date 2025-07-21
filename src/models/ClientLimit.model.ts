import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Sequelize from "sequelize";

import db from "./";
import Client from "./Client.model";

class ClientLimit extends Model {
  declare id: string;
  declare clientId: string;
  declare name: string;
  declare limit: number;
}

ClientLimit.init(
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
    clientId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "clients",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    limit: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 2),
    },
  },
  {
    sequelize: db,
    tableName: "clientLimits",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

ClientLimit.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client",
});

export default ClientLimit;
