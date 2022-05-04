'use strict';
module.exports = (sequelize, DataTypes) => {
  const SongsPlaylist = sequelize.define('SongsPlaylist', {
    songId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER
  }, {});
  SongsPlaylist.associate = function(models) {
    // associations can be defined here
  };
  return SongsPlaylist;
};