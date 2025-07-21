import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Sequelize from "sequelize";

import db from "./";
import MedicBill from "./MedicBill.model";

class Service extends Model {
  declare id: string;
  declare company: string;
  declare service: string;
  declare cnpj: string | null;
  declare mail: string | null;
  declare phone01: string | null;
  declare phone02: string | null;
  declare phone03: string | null;
}

Service.init(
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
    company: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    service: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    cnpj: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    mail: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    phone01: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    phone02: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    phone03: {
      allowNull: true,
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "services",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

Service.hasMany(MedicBill, {
  foreignKey: "serviceId",
  as: "medicBills",
});

export default Service;
