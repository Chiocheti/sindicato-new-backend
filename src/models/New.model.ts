import { DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import db from "./";

class New extends Model {
  declare id: string;
  declare title: string;
  declare content: string;
  declare imageLink: string;
  declare infos: string;
  declare date: string;
}

New.init(
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
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    imageLink: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    infos: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    date: {
      allowNull: false,
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
      },
    },
  },
  {
    sequelize: db,
    tableName: "news",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

export default New;
