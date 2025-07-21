import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Sequelize from "sequelize";

import db from "./";
import Client from "./Client.model";

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
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      validate: {
        isUUID: 4,
      },
    },
    clientId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "clients",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    streetName: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    number: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    complement: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    neighborhood: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    city: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    state: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    postalCode: {
      allowNull: true,
      type: Sequelize.STRING,
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

Address.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client",
});

export default Address;
