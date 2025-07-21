import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Sequelize from "sequelize";

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
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      validate: {
        isUUID: 4,
      },
    },
    clientBankId: {
      allowNull: true,
      type: Sequelize.UUID,
      references: {
        model: "client_banks",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    cpfNumber: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    imageLink: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    ticketPermission: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    signedAuthorizationTerm: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    ente: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    birthdate: {
      allowNull: true,
      type: Sequelize.DATEONLY,
      validate: {
        isDate: true,
      },
    },
    admissionDate: {
      allowNull: true,
      type: Sequelize.DATEONLY,
      validate: {
        isDate: true,
      },
    },
    email: {
      allowNull: true,
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      },
    },
    idCardNumber: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    issuingAgency: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    gender: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    maritalStatus: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    educationLevel: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    details: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    monthlyCredit: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 2),
    },
    annualCredit: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 2),
    },
    creditLimit: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0,
    },
    phone01: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    phone02: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    bankAccount: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    bankAgency: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    bankCode: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    companyCode: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    pixKey: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    pixType: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    associate: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    associateState: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    beginningDate: {
      allowNull: true,
      type: Sequelize.DATEONLY,
      validate: {
        isDate: true,
      },
    },
    retirementDate: {
      allowNull: true,
      type: Sequelize.DATEONLY,
      validate: {
        isDate: true,
      },
    },
    reRegistration: {
      allowNull: true,
      type: Sequelize.DATEONLY,
      validate: {
        isDate: true,
      },
    },
    workPlace: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    department: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    section: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    occupation: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    monthlyType: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    motherName: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    fatherName: {
      allowNull: true,
      type: Sequelize.STRING,
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

Client.hasOne(Address, {
  foreignKey: "clientId",
  as: "address",
});

Client.hasMany(Dependent, {
  foreignKey: "clientId",
  as: "dependents",
});

Client.hasMany(Reservation, {
  foreignKey: "clientId",
  as: "reservations",
});

Client.hasMany(ClientHistory, {
  foreignKey: "clientId",
  as: "clientHistories",
});

Client.hasMany(MedicBill, {
  foreignKey: "clientId",
  as: "medicBills",
});

Client.hasMany(Contribution, {
  foreignKey: "clientId",
  as: "contributions",
});

Client.hasMany(ClientSearch, {
  foreignKey: "clientId",
  as: "clientSearches",
});

Client.hasMany(ClientLimit, {
  foreignKey: "clientId",
  as: "clientLimits",
});

export default Client;
