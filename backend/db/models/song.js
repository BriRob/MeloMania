"use strict";
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define(
    "Song",
    {
      userId: DataTypes.INTEGER,
      url: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      votes: DataTypes.INTEGER,
    },
    {}
  );
  Song.associate = function (models) {
    // associations can be defined here
    const columnMapping = {
      through: "SongsPlaylist",
      foreignKey: "songId",
      otherKey: "playlistId",
      onDelete: "CASCADE",
      hooks: true
    };

    Song.belongsTo(models.User, { foreignKey: "userId" });
    Song.belongsToMany(models.Playlist, columnMapping);
  };
  return Song;
};
