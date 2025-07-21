import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Sequelize from "sequelize";

import db from "./";
import Client from "./Client.model";

class ClientHistory extends Model {
  declare id: string;
  declare clientId: string;
  declare code: string | null;
  declare order: number;
  declare admissionDate: string | null;
  declare dismissalDate: string | null;
  declare pause: boolean;
  declare dismissalReason: string | null;
  declare ente: string | null;
  declare salary: number | null;
  declare discount: number | null;
  declare monthlyType: string | null;
}

ClientHistory.init(
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
    code: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    order: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    admissionDate: {
      allowNull: true,
      type: Sequelize.DATEONLY,
      validate: {
        isDate: true,
      },
    },
    dismissalDate: {
      allowNull: true,
      type: Sequelize.DATEONLY,
      validate: {
        isDate: true,
      },
    },
    pause: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    dismissalReason: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    ente: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    salary: {
      allowNull: true,
      type: Sequelize.DECIMAL(10, 2),
    },
    discount: {
      allowNull: true,
      type: Sequelize.DECIMAL(10, 2),
    },
    monthlyType: {
      allowNull: true,
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "clientHistory",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

ClientHistory.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client",
});

export default ClientHistory;
