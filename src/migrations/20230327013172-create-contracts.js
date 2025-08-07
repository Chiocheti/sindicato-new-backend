/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "contracts",
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
        billing_priority_id: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: "billing_priorities",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        priority: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        beneficiary: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        value: {
          allowNull: false,
          type: Sequelize.DECIMAL(10, 2),
        },
        date: {
          allowNull: false,
          type: Sequelize.DATEONLY,
        },
        can_show: {
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
    await queryInterface.dropTable("contracts");
  },
};
