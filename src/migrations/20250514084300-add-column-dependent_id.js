module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('clients_search', 'dependent_id', {
      type: Sequelize.UUID,
      allowNull: true,
      after: 'user_id',
    });

    await queryInterface.addConstraint('clients_search', {
      fields: ['dependent_id'],
      type: 'foreign key',
      name: 'fk_dependent_id',
      references: {
        table: 'Dependents',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint('clients_search', 'fk_dependent_id');
    await queryInterface.removeColumn('clients_search', 'dependent_id');
  },
};
