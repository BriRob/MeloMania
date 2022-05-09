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
        {
          userId: 4,
          title: "Kinfolk",
          url: "https://melomaniabucket.s3.amazonaws.com/Mereba%E2%80%93Kinfolk.mp3",
          description: "Let me know what you think!",
          createdAt: new Date(2022, 2, 9),
          updatedAt: new Date(2022, 2, 9),
        },
        {
          userId: 5,
          title: "Old Town Road - Youth Orchestra Arrangement",
          url: "https://melomaniabucket.s3.amazonaws.com/OldTownRoad-Sinfo-NiaYouthOrchestra.mp3",
          description: "I arranged this for my youth orchestra. Enjoy!",
          createdAt: new Date(2022, 2, 9),
          updatedAt: new Date(2022, 2, 9),
        },
        {
          userId: 5,
          title: "Uptown Funk - Youth Orchestra Arrangement",
          url: "https://melomaniabucket.s3.amazonaws.com/UptownFunkOrchestra+Cover.mp3",
          description:
            "One of my older arrangements, live from one of the youth orchestra concerts",
          createdAt: new Date(2022, 2, 9),
          updatedAt: new Date(2022, 2, 9),
        },
        {
          userId: 6,
          title: "Blessed - Jill Scott",
          url: "https://melomaniabucket.s3.amazonaws.com/JillScott-Blessed.mp3",
          description:
            "This song just gives me life. Jill knows what she's doing 😌",
          createdAt: new Date(2022, 2, 10),
          updatedAt: new Date(2022, 2, 10),
        },
        {
          userId: 7,
          title: "Le Bleury",
          url: "https://melomaniabucket.s3.amazonaws.com/ANOMALIE-LE+BLEURY.mp3",
          description: "We snapped with this one!",
          createdAt: new Date(2022, 2, 10),
          updatedAt: new Date(2022, 2, 10),
        },
        {
          userId: 8,
          title: "Love Yourz",
          url: "https://melomaniabucket.s3.amazonaws.com/LoveYourz.mp3",
          description: "Just speaking from the heart ❤️",
          createdAt: new Date(2022, 2, 10),
          updatedAt: new Date(2022, 2, 10),
        },
        {
          userId: 10,
          title: "Prelude in C Sharp Minor",
          url: "https://melomaniabucket.s3.amazonaws.com/Rachmaninov-PreludeCSharpMinor.mp3",
          description: "",
          createdAt: new Date(2022, 2, 11),
          updatedAt: new Date(2022, 2, 11),
        },
        {
          userId: 11,
          title: "No Room for Doubt",
          url: "https://melomaniabucket.s3.amazonaws.com/LianneLaHavas-NoRoomForDoubt.mp3",
          description: 'Check out my album "Lost & Found"',
          createdAt: new Date(2022, 2, 11),
          updatedAt: new Date(2022, 2, 11),
        },
        {
          userId: 12,
          title: "Enchantment",
          url: "https://melomaniabucket.s3.amazonaws.com/Enchantment-CorinneBaileyRae.mp3",
          description: "This one hits differently",
          createdAt: new Date(2022, 2, 12),
          updatedAt: new Date(2022, 2, 12),
        },
        {
          userId: 13,
          title: "Weird Fishes / Arpeggi",
          url: "https://melomaniabucket.s3.amazonaws.com/Radiohead-Weird+Fishes_Arpeggi.mp3",
          description:
            'Loved making this one. Check it out and the other songs on the album, "Weird Fishes"',
          createdAt: new Date(2022, 2, 12),
          updatedAt: new Date(2022, 2, 12),
        },
        {
          userId: 14,
          title: "Final Days",
          url: "https://melomaniabucket.s3.amazonaws.com/FinalDays.mp3",
          description: "",
          createdAt: new Date(2022, 2, 13),
          updatedAt: new Date(2022, 2, 13),
        },
        {
          userId: 15,
          title: "Too Bad I Forget",
          url: "https://melomaniabucket.s3.amazonaws.com/TooBadIForget.mp3",
          description: "with my guy, Jack Dine!!",
          createdAt: new Date(2022, 2, 13),
          updatedAt: new Date(2022, 2, 13),
        },
        {
          userId: 9,
          title: "The Heart Part 5",
          url: "https://melomaniabucket.s3.amazonaws.com/KendrickLamar-The+HeartP5.mp3",
          description: "",
          createdAt: new Date(2022, 4, 9),
          updatedAt: new Date(2022, 4, 9),
        },
        {
          userId: 1,
          title: "Testify - Kamasi Washington",
          url: "https://melomaniabucket.s3.amazonaws.com/KamasiWashington-Testify.mp3",
          description: "",
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
    return queryInterface.bulkDelete("Songs", null, {});
  },
};
