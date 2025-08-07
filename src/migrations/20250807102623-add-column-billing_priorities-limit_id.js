module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("billing_priorities", "limit_id", {
      type: Sequelize.UUID,
      allowNull: true,
      after: "id",
    });

    await queryInterface.addConstraint(
      "billing_priorities",
      {
        fields: ["limit_id"],
        type: "foreign key",
        name: "fk-billing_priorities-limit_id",
        references: {
          table: "Limits",
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
      "billing_priorities",
      "fk-billing_priorities-limit_id"
    );
    await queryInterface.removeColumn("billing_priorities", "limit_id");
  },
};
