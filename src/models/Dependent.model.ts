import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Sequelize from "sequelize";

import db from "./";
import Client from "./Client.model";

class Dependent extends Model {
  declare id: string;
  declare clientId: string;
  declare order: number;
  declare name: string | null;
  declare birthdate: string | null;
  declare gender: string | null;
  declare relationship: string | null;
  declare documents: boolean;
}

Dependent.init(
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
    order: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    name: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    birthdate: {
      allowNull: true,
      type: Sequelize.DATEONLY,
    },
    gender: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    relationship: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    documents: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    tableName: "dependents",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

Dependent.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client",
});

export default Dependent;
