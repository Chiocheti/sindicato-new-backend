/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "contributions",
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
        ente: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        salary: {
          allowNull: false,
          type: Sequelize.DECIMAL(10, 2),
        },
        discount: {
          allowNull: false,
          type: Sequelize.DECIMAL(10, 2),
        },
        date: {
          allowNull: false,
          type: Sequelize.DATEONLY,
          validate: {
            isDate: true,
          },
        },
        description: {
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
    await queryInterface.dropTable("contributions");
  },
};
