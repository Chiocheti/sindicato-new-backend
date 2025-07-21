import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Sequelize from "sequelize";

import db from "./";
import Client from "./Client.model";

class Contribution extends Model {
  declare id: string;
  declare clientId: string;
  declare ente: string;
  declare salary: number;
  declare discount: number;
  declare date: string;
  declare description: string | null;
}

Contribution.init(
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
    ente: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    salary: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 2),
    },
    discount: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 2),
    },
    date: {
      allowNull: false,
      type: Sequelize.DATEONLY,
      validate: {
        isDate: true,
      },
    },
    description: {
      allowNull: true,
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "contributions",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

Contribution.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client",
});

export default Contribution;
