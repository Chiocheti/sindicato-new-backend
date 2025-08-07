module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("contracts", "client_limit_id", {
      type: Sequelize.UUID,
      allowNull: true,
      after: "client_id",
    });

    await queryInterface.addConstraint(
      "contracts",
      {
        fields: ["client_limit_id"],
        type: "foreign key",
        name: "fk-contracts-client_limit_id",
        references: {
          table: "Client_Limits",
          field: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      {
        charset: "utf8mb4",
        collate: "utf8mb4_bin",
      }
    );
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint(
      "contracts",
      "fk-contracts-client_limit_id"
    );
    await queryInterface.removeColumn("contracts", "client_limit_id");
  },
};
