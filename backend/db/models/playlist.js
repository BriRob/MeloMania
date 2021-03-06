"use strict";
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define(
    "Playlist",
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
    },
    {}
  );
  Playlist.associate = function (models) {
    // associations can be defined here
    const columnMapping = {
      through: "SongsPlaylist",
      foreignKey: "playlistId",
      otherKey: "songId",
      onDelete: "CASCADE",
      hooks: true
    };

    Playlist.belongsToMany(models.Song, columnMapping);
    Playlist.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Playlist;
};
