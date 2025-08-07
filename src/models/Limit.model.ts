import { DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import db from "./";
import ClientLimit from "./ClientLimit.model";
import BillingPriority from "./BillingPriority.model";

class Limit extends Model {
  declare id: string;
  declare name: string;
}

Limit.init(
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
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "limits",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

Limit.hasMany(ClientLimit, {
  foreignKey: "limitId",
  as: "clientLimits",
});

ClientLimit.belongsTo(Limit, {
  foreignKey: "limitId",
  as: "limit",
});

Limit.hasMany(BillingPriority, {
  foreignKey: "limitId",
  as: "billingPriorities",
});

BillingPriority.belongsTo(Limit, {
  foreignKey: "limitId",
  as: "limit",
});

export default Limit;
