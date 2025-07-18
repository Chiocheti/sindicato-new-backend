/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("clients", {
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
      client_bank_id: {
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
      cpf_number: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      image_link: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      ticket_permission: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      signed_authorization_term: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      ente: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      birthdate: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DATEONLY,
        validate: {
          isDate: true,
        },
      },
      admission_date: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DATEONLY,
        validate: {
          isDate: true,
        },
      },
      email: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        },
      },
      id_card_number: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      issuing_agency: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      gender: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      marital_status: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      education_level: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      details: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      monthly_credit: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      annual_credit: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      credit_limit: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },
      phone01: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      phone02: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      bank_account: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      bank_agency: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      bank_code: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      company_code: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      pix_key: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      pix_type: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      associate: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      associate_state: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      beginning_date: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DATEONLY,
        validate: {
          isDate: true,
        },
      },
      retirement_date: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DATEONLY,
        validate: {
          isDate: true,
        },
      },
      re_registration: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DATEONLY,
        validate: {
          isDate: true,
        },
      },
      work_place: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      department: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      section: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      occupation: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      monthly_type: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      mother_name: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      father_name: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("clients");
  },
};
