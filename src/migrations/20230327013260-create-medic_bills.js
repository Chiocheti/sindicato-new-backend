/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "medic_bills",
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
        client_id: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: "clients",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        service_id: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: "services",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        bank_id: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: "banks",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        contract_id: {
          allowNull: true,
          type: Sequelize.UUID,
          references: {
            model: "contracts",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        dependent_name: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        date: {
          allowNull: false,
          type: Sequelize.DATEONLY,
        },
        confirmation_date: {
          allowNull: true,
          type: Sequelize.DATEONLY,
        },
        reservation_date: {
          allowNull: true,
          type: Sequelize.DATEONLY,
        },
        invoice_received: {
          allowNull: false,
          type: Sequelize.DECIMAL(10, 2),
        },
        invoice_value: {
          allowNull: false,
          type: Sequelize.DECIMAL(10, 2),
        },
        invoice_compensate: {
          allowNull: false,
          type: Sequelize.DECIMAL(10, 2),
        },
        dca: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        status: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        check_number: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        receiver_number: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        order: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        can_receive_refund: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
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
      },
      {
        charset: "utf8mb4",
        collate: "utf8mb4_bin",
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("medic_bills");
  },
};
