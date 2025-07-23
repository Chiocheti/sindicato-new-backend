import { DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import db from "./";
import Client from "./Client.model";
import Dependent from "./Dependent.model";
import Specialty from "./Specialty.model";

class Refund extends Model {
  declare id: string;
  declare clientId: string;
  declare dependentId: string | null;
  declare specialtyId: string;
  declare order: number;
  declare date: string;
  declare invoiceReceived: string;
  declare invoiceValue: number;
  declare refundValue: number;
}

Refund.init(
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
    dependentId: {
      allowNull: true,
      type: DataTypes.UUID,
      references: {
        model: "dependents",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    specialtyId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: "specialties",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    order: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    date: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
    invoiceReceived: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
    invoiceValue: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    refundValue: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    sequelize: db,
    tableName: "refunds",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

Refund.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client",
});

Refund.belongsTo(Dependent, {
  foreignKey: "dependentId",
  as: "dependent",
});

Refund.belongsTo(Specialty, {
  foreignKey: "specialtyId",
  as: "specialty",
});

export default Refund;
