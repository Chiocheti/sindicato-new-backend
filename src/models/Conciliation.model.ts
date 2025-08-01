import { DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import db from "./";

class Conciliation extends Model {
  declare id: string;
  declare bankId: string;
  declare referenceId: string;
  declare clientName: string;
  declare date: string;
  declare value: number;
  declare dca: string;
  declare status: string;
  declare order: number;
  declare details: string | null;
}

Conciliation.init(
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
    client_id: {
      allowNull: true,
      type: DataTypes.UUID,
      references: {
        model: "clients",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    service_id: {
      allowNull: true,
      type: DataTypes.UUID,
      references: {
        model: "services",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    other: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    clientName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    date: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
    value: {
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
    order: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    details: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "conciliations",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

export default Conciliation;
