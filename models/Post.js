module.exports = function(sequelize, DataTypes) {
  let Post = sequelize.define("Post", {
    title: DataTypes.STRING,
    like: DataTypes.INTEGER
  });

  Post.associate = function(models) {
    models.Post.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};
