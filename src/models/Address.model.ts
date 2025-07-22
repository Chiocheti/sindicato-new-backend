import { DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import db from "./";

class Address extends Model {
  declare id: string;
  declare clientId: string;
  declare streetName: string | null;
  declare number: string | null;
  declare complement: string | null;
  declare neighborhood: string | null;
  declare city: string | null;
  declare state: string | null;
  declare postalCode: string | null;
}

Address.init(
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
    streetName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    number: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    complement: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    neighborhood: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    city: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    state: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    postalCode: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "addresses",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

export default Address;
