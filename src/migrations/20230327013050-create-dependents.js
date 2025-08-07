/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "dependents",
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
        order: {
          allowNull: false,
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        name: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        birthdate: {
          allowNull: true,
          type: Sequelize.DATEONLY,
        },
        gender: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        relationship: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        documents: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: false,
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
    await queryInterface.dropTable("dependents");
  },
};
