import { DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import db from "./";

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
    serviceId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: "services",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    bankId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: "banks",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    contractId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: "contracts",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    dependentName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    date: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
    confirmationDate: {
      allowNull: true,
      type: DataTypes.DATEONLY,
    },
    reservationDate: {
      allowNull: true,
      type: DataTypes.DATEONLY,
    },
    invoiceReceived: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    invoiceValue: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    invoiceCompensate: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    dca: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    checkNumber: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    receiverNumber: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    order: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    canReceiveRefund: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
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

export default MedicBill;
