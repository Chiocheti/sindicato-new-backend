import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Sequelize from "sequelize";

import db from "./";

class Discount extends Model {
  declare id: string;
  declare title: string;
  declare content: string;
  declare imageLink: string;
  declare infos: string;
  declare date: string;
  declare isHealth: boolean;
  declare isEducation: boolean;
  declare isBusiness: boolean;
  declare isServices: boolean;
}

Discount.init(
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
    title: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    content: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
    imageLink: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    infos: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    date: {
      allowNull: false,
      type: Sequelize.DATEONLY,
      validate: {
        isDate: true,
      },
    },
    isHealth: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    isEducation: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    isBusiness: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    isServices: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    tableName: "discounts",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

export default Discount;
