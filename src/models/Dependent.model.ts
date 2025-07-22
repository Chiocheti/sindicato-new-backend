import { DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import db from "./";

class Dependent extends Model {
  declare id: string;
  declare clientId: string;
  declare order: number;
  declare name: string | null;
  declare birthdate: string | null;
  declare gender: string | null;
  declare relationship: string | null;
  declare documents: boolean;
}

Dependent.init(
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
    order: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    birthdate: {
      allowNull: true,
      type: DataTypes.DATEONLY,
    },
    gender: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    relationship: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    documents: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    tableName: "dependents",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

export default Dependent;
