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
          updatedAt: new Date(),
        },
        {
          userId: 1,
          title: "Sample2",
          url: "https://www.bensound.com/bensound-music/bensound-memories.mp3",
          description: "I got this from Ben sound!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          title: "My song",
          url: "https://cdn.pixabay.com/download/audio/2022/04/30/audio_3c7238ff32.mp3?filename=loneliness-of-the-winner-110416.mp3",
          description: "Check this out",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          title: "What a Way to Live",
          url: "https://cdn.pixabay.com/download/audio/2022/04/27/audio_30ff2fdf22.mp3?filename=sedative-110241.mp3",
          description: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          title: "Dreams",
          url: "https://cdn.pixabay.com/download/audio/2022/04/27/audio_67bcf729cf.mp3?filename=whip-110235.mp3",
          description: "Featured my friend Carmody on this one",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          title: "Black Truck",
          url: "https://cdn.pixabay.com/download/audio/2022/03/23/audio_07b2a04be3.mp3?filename=order-99518.mp3",
          description: "One of my faves to make!",
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
    return queryInterface.bulkDelete("Songs", null, {});
  },
};
