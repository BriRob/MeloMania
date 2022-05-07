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
          title: "Tadow",
          url: "https://melomaniabucket.s3.amazonaws.com/tadow-fkj-masego.mp3",
          description: "Checkout this gem by Masego and FKJ!",
          createdAt: new Date(2022, 2, 4),
          updatedAt: new Date(2022, 2, 4),
        },
        {
          userId: 1,
          title: "Retold by Nate Smith",
          url: "https://melomaniabucket.s3.amazonaws.com/Nate-Smith-Retold.mp3",
          description: "I got this from Ben sound!",
          createdAt: new Date(2022, 2, 5),
          updatedAt: new Date(2022, 2, 5),
        },
        {
          userId: 2,
          title: "I Want You Around Cover",
          url: "https://melomaniabucket.s3.amazonaws.com/iwya_bri.mp3",
          description: `My cover of Snoh Aalegra's "I Want You Around" with a little twist at the end`,
          createdAt: new Date(2022, 2, 6),
          updatedAt: new Date(2022, 2, 6),
        },
        {
          userId: 2,
          title: "Makaya McCraven Mantra",
          url: "https://melomaniabucket.s3.amazonaws.com/Makaya-McCraven-Mantra.mp3",
          description: "",
          createdAt: new Date(2022, 2, 7),
          updatedAt: new Date(2022, 2, 7),
        },
        {
          userId: 3,
          title: "Dreams",
          url: "https://melomaniabucket.s3.amazonaws.com/alfa-mist-dreams.mp3",
          description: "Featured my friend Carmody on this one",
          createdAt: new Date(2022, 2, 8),
          updatedAt: new Date(2022, 2, 8),
        },
        {
          userId: 4,
          title: "Black Truck",
          url: "https://melomaniabucket.s3.amazonaws.com/Mereba-Black-Truck.mp3",
          description: "One of my faves to make!",
          createdAt: new Date(2022, 2, 9),
          updatedAt: new Date(2022, 2, 9),
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
