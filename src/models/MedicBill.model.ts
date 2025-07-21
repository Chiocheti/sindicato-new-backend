import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Sequelize from "sequelize";

import db from "./";
import Client from "./Client.model";
import Service from "./Service.model";
import Bank from "./Bank.model";
import Contract from "./Contracts.model";

class MedicBill extends Model {
  declare id: string;
  declare clientId: string;
  declare serviceId: string;
  declare bankId: string;
  declare contractId: string;
  declare dependentName: string | null;
  declare date: string;
  declare confirmationDate: string | null;
  declare reservationDate: string | null;
  declare invoiceReceived: number;
  declare invoiceValue: number;
  declare invoiceCompensate: number;
  declare dca: string;
  declare status: string;
  declare checkNumber: number;
  declare receiverNumber: number;
  declare order: number;
  declare canReceiveRefund: boolean;
}

MedicBill.init(
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
    serviceId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "services",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    bankId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "banks",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    contractId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "contracts",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    dependentName: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    date: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    confirmationDate: {
      allowNull: true,
      type: Sequelize.DATEONLY,
    },
    reservationDate: {
      allowNull: true,
      type: Sequelize.DATEONLY,
    },
    invoiceReceived: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 2),
    },
    invoiceValue: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 2),
    },
    invoiceCompensate: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 2),
    },
    dca: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    status: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    checkNumber: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    receiverNumber: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    order: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    canReceiveRefund: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
    },
  },
  {
    sequelize: db,
    tableName: "medicBills",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

MedicBill.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client",
});

MedicBill.belongsTo(Service, {
  foreignKey: "serviceId",
  as: "service",
});

MedicBill.belongsTo(Bank, {
  foreignKey: "bankId",
  as: "bank",
});

MedicBill.belongsTo(Contract, {
  foreignKey: "contractId",
  as: "contract",
});

export default MedicBill;
