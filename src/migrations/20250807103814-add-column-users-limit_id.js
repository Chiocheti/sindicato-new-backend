module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "limit_id", {
      type: Sequelize.UUID,
      allowNull: true,
      after: "id",
    });

    await queryInterface.addConstraint(
      "users",
      {
        fields: ["limit_id"],
        type: "foreign key",
        name: "fk-users-limit_id",
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
    await queryInterface.removeConstraint("users", "fk-users-limit_id");
    await queryInterface.removeColumn("users", "limit_id");
  },
};
