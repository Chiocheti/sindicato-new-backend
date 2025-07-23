import { DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import db from "./";
import MedicBill from "./MedicBill.model";
import Bill from "./Bill.model";
import Conciliation from "./Conciliation.model";

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
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: 4,
      },
    },
    company: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    service: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    cnpj: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    mail: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    phone01: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    phone02: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    phone03: {
      allowNull: true,
      type: DataTypes.STRING,
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

Service.hasMany(Bill, {
  foreignKey: "serviceId",
  as: "bills",
});

Bill.belongsTo(Service, {
  foreignKey: "serviceId",
  as: "service",
});

Service.hasMany(Conciliation, {
  foreignKey: "serviceId",
  as: "conciliations",
});

Conciliation.belongsTo(Service, {
  foreignKey: "serviceId",
  as: "service",
});

Service.hasMany(MedicBill, {
  foreignKey: "serviceId",
  as: "medicBills",
});

MedicBill.belongsTo(Service, {
  foreignKey: "serviceId",
  as: "service",
});

export default Service;
