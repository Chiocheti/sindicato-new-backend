module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('clients', 'credit_limit', {
      type: Sequelize.FLOAT,
      allowNull: true,
      after: 'annual_credit',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('clients', 'credit_limit');
  },
};
