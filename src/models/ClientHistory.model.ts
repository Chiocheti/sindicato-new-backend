import { DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import db from "./";

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
    code: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    order: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    admissionDate: {
      allowNull: true,
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
      },
    },
    dismissalDate: {
      allowNull: true,
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
      },
    },
    pause: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    dismissalReason: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    ente: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    salary: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2),
    },
    discount: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2),
    },
    monthlyType: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "client_history",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

export default ClientHistory;
