import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Sequelize from "sequelize";

import db from "./";
import Client from "./Client.model";
import User from "./User.model";

class ClientSearch extends Model {
  declare id: string;
  declare clientId: string;
  declare userId: string;
  declare used: boolean;
}

ClientSearch.init(
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
    userId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    used: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    tableName: "clientSearches",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

ClientSearch.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client",
});

ClientSearch.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export default ClientSearch;
