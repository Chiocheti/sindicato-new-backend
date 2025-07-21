module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("client_searches", "dependent_id", {
      type: Sequelize.UUID,
      allowNull: true,
      after: "user_id",
    });

    await queryInterface.addConstraint("client_searches", {
      fields: ["dependent_id"],
      type: "foreign key",
      name: "fk_dependent_id",
      references: {
        table: "Dependents",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint("client_searches", "fk_dependent_id");
    await queryInterface.removeColumn("client_searches", "dependent_id");
  },
};
