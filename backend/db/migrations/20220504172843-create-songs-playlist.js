'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SongsPlaylists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      songId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: "Songs"}
      },
      playlistId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: "Playlists"}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SongsPlaylists');
  }
};
