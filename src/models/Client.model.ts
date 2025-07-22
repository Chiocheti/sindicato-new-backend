import { DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import db from "./";
import ClientBank from "./ClientBank.model";
import Address from "./Address.model";
import Dependent from "./Dependent.model";
import Reservation from "./Reservation.model";
import ClientHistory from "./ClientHistory.model";
import MedicBill from "./MedicBill.model";
import Contribution from "./Contribution.model";
import ClientSearch from "./ClientSearch.model";
import ClientLimit from "./ClientLimit.model";
import Contract from "./Contract.model";

class Client extends Model {
  declare id: string;
  declare clientBankId: string | null;
  declare name: string;
  declare cpfNumber: string;
  declare imageLink: string | null;
  declare password: string;
  declare ticketPermission: boolean;
  declare signedAuthorizationTerm: boolean;
  declare ente: string | null;
  declare birthdate: string | null;
  declare admissionDate: string | null;
  declare email: string | null;
  declare idCardNumber: string | null;
  declare issuingAgency: string | null;
  declare gender: string | null;
  declare maritalStatus: string | null;
  declare educationLevel: string | null;
  declare details: string | null;
  declare monthlyCredit: number;
  declare annualCredit: number;
  declare creditLimit: number;
  declare phone01: string | null;
  declare phone02: string | null;
  declare bankAccount: string | null;
  declare bankAgency: string | null;
  declare bankCode: string | null;
  declare companyCode: string | null;
  declare pixKey: string | null;
  declare pixType: string;
  declare associate: string;
  declare associateState: boolean;
  declare beginningDate: string | null;
  declare retirementDate: string | null;
  declare reRegistration: string | null;
  declare workPlace: string | null;
  declare department: string | null;
  declare section: string | null;
  declare occupation: string | null;
  declare monthlyType: string | null;
  declare motherName: string | null;
  declare fatherName: string | null;
}

Client.init(
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
    clientBankId: {
      allowNull: true,
      type: DataTypes.UUID,
      references: {
        model: "client_banks",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    cpfNumber: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    imageLink: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    ticketPermission: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    signedAuthorizationTerm: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ente: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    birthdate: {
      allowNull: true,
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
      },
    },
    admissionDate: {
      allowNull: true,
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
      },
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    idCardNumber: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    issuingAgency: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    gender: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    maritalStatus: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    educationLevel: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    details: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    monthlyCredit: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    annualCredit: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    creditLimit: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    phone01: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    phone02: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    bankAccount: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    bankAgency: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    bankCode: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    companyCode: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    pixKey: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    pixType: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    associate: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    associateState: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    beginningDate: {
      allowNull: true,
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
      },
    },
    retirementDate: {
      allowNull: true,
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
      },
    },
    reRegistration: {
      allowNull: true,
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
      },
    },
    workPlace: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    department: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    section: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    occupation: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    monthlyType: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    motherName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    fatherName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "clients",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

Client.belongsTo(ClientBank, {
  foreignKey: "clientBankId",
  as: "clientBank",
});

ClientBank.hasMany(Client, {
  foreignKey: "clientBankId",
  as: "clients",
});

Client.hasOne(Address, {
  foreignKey: "clientId",
  as: "address",
});

Address.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client",
});

Client.hasMany(Dependent, {
  foreignKey: "clientId",
  as: "dependents",
});

Dependent.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client",
});

Client.hasMany(Contract, {
  foreignKey: "clientId",
  as: "contracts",
});

Contract.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client",
});

Client.hasMany(Reservation, {
  foreignKey: "clientId",
  as: "reservations",
});

Reservation.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client",
});

Client.hasMany(ClientHistory, {
  foreignKey: "clientId",
  as: "clientHistories",
});

ClientHistory.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client",
});

Client.hasMany(MedicBill, {
  foreignKey: "clientId",
  as: "medicBills",
});

MedicBill.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client",
});

Client.hasMany(Contribution, {
  foreignKey: "clientId",
  as: "contributions",
});

Contribution.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client",
});

Client.hasMany(ClientSearch, {
  foreignKey: "clientId",
  as: "clientSearches",
});

ClientSearch.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client",
});

Client.hasMany(ClientLimit, {
  foreignKey: "clientId",
  as: "clientLimits",
});

ClientLimit.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client",
});

export default Client;
