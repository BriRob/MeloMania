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
          createdAt: new Date(2022, 4, 3),
          updatedAt: new Date(2022, 4, 3),
        },
        {
          songId: 1,
          playlistId: 2,
          createdAt: new Date(2022, 4, 3),
          updatedAt: new Date(2022, 4, 3),
        },
        {
          songId: 1,
          playlistId: 3,
          createdAt: new Date(2022, 4, 3),
          updatedAt: new Date(2022, 4, 3),
        },
        {
          songId: 2,
          playlistId: 2,
          createdAt: new Date(2022, 4, 3),
          updatedAt: new Date(2022, 4, 3),
        },
        {
          songId: 2,
          playlistId: 1,
          createdAt: new Date(2022, 4, 3),
          updatedAt: new Date(2022, 4, 3),
        },
        {
          songId: 2,
          playlistId: 5,
          createdAt: new Date(2022, 4, 5),
          updatedAt: new Date(2022, 4, 5),
        },
        {
          songId: 3,
          playlistId: 1,
          createdAt: new Date(2022, 4, 2),
          updatedAt: new Date(2022, 4, 2),
        },
        {
          songId: 3,
          playlistId: 3,
          createdAt: new Date(2022, 4, 3),
          updatedAt: new Date(2022, 4, 3),
        },
        {
          songId: 4,
          playlistId: 1,
          createdAt: new Date(2022, 4, 3),
          updatedAt: new Date(2022, 4, 3),
        },
        {
          songId: 4,
          playlistId: 2,
          createdAt: new Date(2022, 4, 3),
          updatedAt: new Date(2022, 4, 3),
        },
        {
          songId: 4,
          playlistId: 4,
          createdAt: new Date(2022, 4, 4),
          updatedAt: new Date(2022, 4, 4),
        },
        {
          songId: 4,
          playlistId: 5,
          createdAt: new Date(2022, 4, 5),
          updatedAt: new Date(2022, 4, 5),
        },
        {
          songId: 5,
          playlistId: 4,
          createdAt: new Date(2022, 4, 4),
          updatedAt: new Date(2022, 4, 4),
        },
        {
          songId: 5,
          playlistId: 5,
          createdAt: new Date(2022, 4, 5),
          updatedAt: new Date(2022, 4, 5),
        },
        {
          songId: 5,
          playlistId: 6,
          createdAt: new Date(2022, 4, 5),
          updatedAt: new Date(2022, 4, 5),
        },
        {
          songId: 6,
          playlistId: 6,
          createdAt: new Date(2022, 4, 5),
          updatedAt: new Date(2022, 4, 5),
        },
        {
          songId: 12,
          playlistId: 6,
          createdAt: new Date(2022, 4, 5),
          updatedAt: new Date(2022, 4, 5),
        },
        {
          songId: 15,
          playlistId: 6,
          createdAt: new Date(2022, 4, 5),
          updatedAt: new Date(2022, 4, 5),
        },
        {
          songId: 12,
          playlistId: 7,
          createdAt: new Date(2022, 4, 6),
          updatedAt: new Date(2022, 4, 6),
        },
        {
          songId: 8,
          playlistId: 8,
          createdAt: new Date(2022, 4, 6),
          updatedAt: new Date(2022, 4, 6),
        },
        {
          songId: 9,
          playlistId: 8,
          createdAt: new Date(2022, 4, 6),
          updatedAt: new Date(2022, 4, 6),
        },
        {
          songId: 3,
          playlistId: 8,
          createdAt: new Date(2022, 4, 6),
          updatedAt: new Date(2022, 4, 6),
        },
        {
          songId: 13,
          playlistId: 9,
          createdAt: new Date(2022, 4, 7),
          updatedAt: new Date(2022, 4, 7),
        },
        {
          songId: 5,
          playlistId: 10,
          createdAt: new Date(2022, 4, 8),
          updatedAt: new Date(2022, 4, 8),
        },
        {
          songId: 15,
          playlistId: 10,
          createdAt: new Date(2022, 4, 8),
          updatedAt: new Date(2022, 4, 8),
        },
        {
          songId: 17,
          playlistId: 10,
          createdAt: new Date(2022, 4, 8),
          updatedAt: new Date(2022, 4, 8),
        },
        {
          songId: 18,
          playlistId: 10,
          createdAt: new Date(2022, 4, 8),
          updatedAt: new Date(2022, 4, 8),
        },
        {
          songId: 19,
          playlistId: 11,
          createdAt: new Date(2022, 4, 9),
          updatedAt: new Date(2022, 4, 9),
        },
        {
          songId: 19,
          playlistId: 7,
          createdAt: new Date(2022, 4, 9),
          updatedAt: new Date(2022, 4, 9),
        },
        {
          songId: 20,
          playlistId: 10,
          createdAt: new Date(2022, 4, 9),
          updatedAt: new Date(2022, 4, 9),
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
