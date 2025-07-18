module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('clients', 'signed_authorization_term', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      after: 'ticket_permission',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('clients', 'signed_authorization_term');
  },
};
