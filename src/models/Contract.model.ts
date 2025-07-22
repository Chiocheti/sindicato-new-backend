import { DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import db from "./";
import Client from "./Client.model";
import BillingPriority from "./BillingPriority.model";
import MedicBill from "./MedicBill.model";

class Contract extends Model {
  declare id: string;
  declare clientId: string;
  declare billingPriorityId: string;
  declare priority: number;
  declare beneficiary: string;
  declare value: number;
  declare date: string;
  declare canShow: boolean;
}

Contract.init(
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
    billingPriorityId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: "billing_priorities",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    priority: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    beneficiary: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    value: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    date: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
    canShow: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    tableName: "contracts",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

Contract.belongsTo(BillingPriority, {
  foreignKey: "billingPriorityId",
  as: "billingPriority",
});

MedicBill.belongsTo(Contract, {
  foreignKey: "contractId",
  as: "contract",
});

export default Contract;
