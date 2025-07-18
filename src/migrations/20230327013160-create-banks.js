/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("banks", {
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
      bank: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      agency: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      account: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      monthly: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      over: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      reserved: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      check_number: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("banks");
  },
};
