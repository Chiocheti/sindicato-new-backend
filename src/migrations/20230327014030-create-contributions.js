/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contributions', {
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
          model: 'clients',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ente: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      salary: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      discount: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      date: {
        allowNull: true,
        type: Sequelize.DATEONLY,
        validate: {
          isDate: true,
        },
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('contributions');
  },
};
