import { DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import db from "./";
import Contract from "./Contract.model";

class Reservation extends Model {
  declare id: string;
  declare clientId: string;
  declare contractIdFirst: string | null;
  declare contractIdSecond: string | null;
  declare date: string;
  declare createDate: string;
  declare name: string | null;
  declare cpf: string | null;
  declare phone: string | null;
  declare value: number | null;
  declare payStyle: string;
  declare payDateFirst: string | null;
  declare payDateSecond: string | null;
  declare description: string | null;
}

Reservation.init(
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
      allowNull: true,
      type: DataTypes.UUID,
      references: {
        model: "clients",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    contractIdFirst: {
      allowNull: true,
      type: DataTypes.UUID,
      references: {
        model: "contracts",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    contractIdSecond: {
      allowNull: true,
      type: DataTypes.UUID,
      references: {
        model: "contracts",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    date: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
    createDate: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    cpf: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    phone: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    value: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2),
    },
    payStyle: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    payDateFirst: {
      allowNull: true,
      type: DataTypes.DATEONLY,
    },
    payDateSecond: {
      allowNull: true,
      type: DataTypes.DATEONLY,
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "reservations",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

Reservation.belongsTo(Contract, {
  foreignKey: "contractIdFirst",
  as: "contractFirst",
});

Reservation.belongsTo(Contract, {
  foreignKey: "contractIdSecond",
  as: "contractSecond",
});

export default Reservation;
