module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("client_limits", "limit_id", {
      type: Sequelize.UUID,
      allowNull: true,
      after: "client_id",
    });

    await queryInterface.addConstraint(
      "client_limits",
      {
        fields: ["limit_id"],
        type: "foreign key",
        name: "fk-client_limits-limit_id",
        references: {
          table: "Limits",
          field: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      {
        charset: "utf8mb4",
        collate: "utf8mb4_bin",
      }
    );
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint(
      "client_limits",
      "fk-client_limits-limit_id"
    );
    await queryInterface.removeColumn("client_limits", "limit_id");
  },
};
