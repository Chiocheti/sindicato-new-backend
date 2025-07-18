/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("addresses", {
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
      street_name: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      number: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      complement: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      neighborhood: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      city: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      state: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      postal_code: {
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
    await queryInterface.dropTable("addresses");
  },
};
