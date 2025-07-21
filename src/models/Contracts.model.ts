import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Sequelize from "sequelize";

import db from "./";
import Client from "./Client.model";
import BillingPriority from "./BillingPriority.model";

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
    billingPriorityId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "billing_priorities",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    priority: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    beneficiary: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    value: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 2),
    },
    date: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    canShow: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
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

Contract.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client",
});

Contract.belongsTo(BillingPriority, {
  foreignKey: "billingPriorityId",
  as: "billingPriority",
});

export default Contract;
