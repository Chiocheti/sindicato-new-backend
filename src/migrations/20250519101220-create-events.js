/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "events",
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
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        open: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        message: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        date: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        tickets_left: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        image: {
          type: Sequelize.STRING,
          allowNull: false,
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
    await queryInterface.dropTable("events");
  },
};
