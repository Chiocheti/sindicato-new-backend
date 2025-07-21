import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Sequelize from "sequelize";

import db from "./";

class Specialty extends Model {
  declare id: string;
  declare skill: string;
  declare order: number;
  declare lack: boolean;
}

Specialty.init(
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
    skill: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    order: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    lack: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
    },
  },
  {
    sequelize: db,
    tableName: "specialties",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

export default Specialty;
