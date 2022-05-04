"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "SongsPlaylists",
      [
        {
          songId: 1,
          playlistId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 1,
          playlistId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 2,
          playlistId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 2,
          playlistId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 3,
          playlistId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 3,
          playlistId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 4,
          playlistId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 4,
          playlistId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 5,
          playlistId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 5,
          playlistId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 5,
          playlistId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 6,
          playlistId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("SongsPlaylists", null, {});
  },
};
