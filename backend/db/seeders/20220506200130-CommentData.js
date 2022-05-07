"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Comments",
      [
        {
          userId: 1,
          songId: 2,
          comment: `Why do I love this so much?!`,
          createdAt: new Date(2022, 4, 4),
          updatedAt: new Date(2022, 4, 4),
        },
        {
          userId: 1,
          songId: 6,
          comment: `"Stay sick 'cause I follow my gut" 🔥`,
          createdAt: new Date(2022, 3, 23),
          updatedAt: new Date(2022, 3, 23),
        },
        {
          userId: 2,
          songId: 5,
          comment: `I love the syncopation. Can't wait to hear more music you post`,
          createdAt: new Date(2022, 3, 15),
          updatedAt: new Date(2022, 3, 15),
        },
        {
          userId: 2,
          songId: 1,
          comment: `I need to do a cover of this. Brilliant!`,
          createdAt: new Date(2022, 3, 16),
          updatedAt: new Date(2022, 3, 16),
        },
        {
          userId: 3,
          songId: 4,
          comment: `That harp is out of this world!`,
          createdAt: new Date(2022, 3, 17),
          updatedAt: new Date(2022, 3, 17),
        },
        {
          userId: 3,
          songId: 6,
          comment: `🔥🔥🔥🔥🔥`,
          createdAt: new Date(2022, 3, 27),
          updatedAt: new Date(2022, 3, 27),
        },
        {
          userId: 4,
          songId: 4,
          comment: `Absolutely beautiful`,
          createdAt: new Date(2022, 3, 25),
          updatedAt: new Date(2022, 3, 25),
        },
        {
          userId: 4,
          songId: 3,
          comment: `I hope Snoh hears this!`,
          createdAt: new Date(2022, 4, 15),
          updatedAt: new Date(2022, 4, 15),
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
    return queryInterface.bulkDelete("Comments", null, {});
  },
};
