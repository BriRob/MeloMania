"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Songs",
      [
        {
          userId: 1,
          title: "Sample1",
          url: "https://samplelib.com/lib/preview/mp3/sample-12s.mp3",
          description: "I got this from sample lib!",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 2,
          title: "Sample2",
          url: "https://www.bensound.com/bensound-music/bensound-memories.mp3",
          description: "I got this from Ben sound!",
          createdAt: new Date(),
          updatedAt: new Date()
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
    return queryInterface.bulkDelete("Songs", null, {});
  },
};
