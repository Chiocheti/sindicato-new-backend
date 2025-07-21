import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Sequelize from "sequelize";

import db from "./";
import Client from "./Client.model";
import Contract from "./Contracts.model";

class Reservation extends Model {
  declare id: string;
  declare clientId: string;
  declare contractIdFirst: string | null;
  declare contractIdSecond: string | null;
  declare date: string;
  declare createDate: string;
  declare name: string | null;
  declare cpf: string | null;
  declare phone: string | null;
  declare value: number | null;
  declare payStyle: string;
  declare payDateFirst: string | null;
  declare payDateSecond: string | null;
  declare description: string | null;
}

Reservation.init(
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
      allowNull: true,
      type: Sequelize.UUID,
      references: {
        model: "clients",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    contractIdFirst: {
      allowNull: true,
      type: Sequelize.UUID,
      references: {
        model: "contracts",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    contractIdSecond: {
      allowNull: true,
      type: Sequelize.UUID,
      references: {
        model: "contracts",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    date: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    createDate: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    name: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    cpf: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    phone: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    value: {
      allowNull: true,
      type: Sequelize.DECIMAL(10, 2),
    },
    payStyle: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    payDateFirst: {
      allowNull: true,
      type: Sequelize.DATEONLY,
    },
    payDateSecond: {
      allowNull: true,
      type: Sequelize.DATEONLY,
    },
    description: {
      allowNull: true,
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "reservations",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

Reservation.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client",
});

Reservation.belongsTo(Contract, {
  foreignKey: "contractIdFirst",
  as: "contractFirst",
});

Reservation.belongsTo(Contract, {
  foreignKey: "contractIdSecond",
  as: "contractSecond",
});

export default Reservation;
