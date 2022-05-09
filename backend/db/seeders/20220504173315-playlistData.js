"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Playlists",
      [
        {
          userId: 1,
          title: "Love These!",
          createdAt: new Date(2022, 3, 20),
          updatedAt: new Date(2022, 3, 20),
        },
        {
          userId: 1,
          title: "Feeling Seen",
          createdAt: new Date(2022, 3, 21),
          updatedAt: new Date(2022, 3, 21),
        },
        {
          userId: 2,
          title: "Gets Me Goin",
          createdAt: new Date(2022, 3, 22),
          updatedAt: new Date(2022, 3, 22),
        },
        {
          userId: 2,
          title: "Woah",
          createdAt: new Date(2022, 3, 22),
          updatedAt: new Date(2022, 3, 22),
        },
        {
          userId: 3,
          title: "Jazzy Cool",
          createdAt: new Date(2022, 3, 23),
          updatedAt: new Date(2022, 3, 23),
        },
        {
          userId: 4,
          title: "Vibesss",
          createdAt: new Date(2022, 3, 23),
          updatedAt: new Date(2022, 3, 23),
        },
        {
          userId: 2,
          title: "Hip-Hop Art",
          createdAt: new Date(2022, 3, 24),
          updatedAt: new Date(2022, 3, 24),
        },
        {
          userId: 15,
          title: "String Covers!",
          createdAt: new Date(2022, 3, 25),
          updatedAt: new Date(2022, 3, 25),
        },
        {
          userId: 11,
          title: "Classical",
          createdAt: new Date(2022, 3, 27),
          updatedAt: new Date(2022, 3, 27),
        },
        {
          userId: 14,
          title: "Floating on a Cloud",
          createdAt: new Date(2022, 3, 27),
          updatedAt: new Date(2022, 3, 27),
        },
        {
          userId: 6,
          title: "Most Recent Kendrick Drops",
          createdAt: new Date(2022, 4, 1),
          updatedAt: new Date(2022, 4, 1),
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
    return queryInterface.bulkDelete("Playlists", null, {});
  },
};
