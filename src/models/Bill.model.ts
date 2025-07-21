import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Sequelize from "sequelize";

import db from "./";
import Bank from "./Bank.model";

class Bill extends Model {
  declare id: string;
  declare bankId: string;
  declare referenceId: string;
  declare clientName: string;
  declare date: string;
  declare confirmationDate: string | null;
  declare doc: string;
  declare value: number;
  declare dca: string;
  declare status: string;
  declare order: number;
  declare details: string | null;
}

Bill.init(
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
    referenceId: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    clientName: {
      allowNull: false,
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
    doc: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    value: {
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
    order: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    details: {
      allowNull: true,
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "bills",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

Bill.belongsTo(Bank, {
  foreignKey: "bankId",
  as: "bank",
});

export default Bill;
