/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "client_history",
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
        code: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        order: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        admission_date: {
          allowNull: true,
          type: Sequelize.DATEONLY,
          validate: {
            isDate: true,
          },
        },
        dismissal_date: {
          allowNull: true,
          type: Sequelize.DATEONLY,
          validate: {
            isDate: true,
          },
        },
        pause: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        dismissal_reason: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        ente: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        salary: {
          allowNull: true,
          type: Sequelize.DECIMAL(10, 2),
        },
        discount: {
          allowNull: true,
          type: Sequelize.DECIMAL(10, 2),
        },
        monthly_type: {
          allowNull: true,
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
      },
      {
        charset: "utf8mb4",
        collate: "utf8mb4_bin",
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("client_history");
  },
};
