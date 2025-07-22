import { DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import db from "./";

class Contribution extends Model {
  declare id: string;
  declare clientId: string;
  declare ente: string;
  declare salary: number;
  declare discount: number;
  declare date: string;
  declare description: string | null;
}

Contribution.init(
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
    ente: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    salary: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    discount: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    date: {
      allowNull: false,
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
      },
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "contributions",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

export default Contribution;
