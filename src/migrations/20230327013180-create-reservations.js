/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reservations', {
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
        allowNull: true,
        type: Sequelize.UUID,
        references: {
          model: 'clients',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      contract_id_first: {
        allowNull: true,
        type: Sequelize.UUID,
        references: {
          model: 'contracts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      contract_id_second: {
        allowNull: true,
        type: Sequelize.UUID,
        references: {
          model: 'contracts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      create_date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      cpf: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      phone: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      value: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      pay_style: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      pay_date_first: {
        allowNull: true,
        type: Sequelize.DATEONLY,
      },
      pay_date_second: {
        allowNull: true,
        type: Sequelize.DATEONLY,
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('reservations');
  },
};
