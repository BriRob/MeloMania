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
        {
          userId: 15,
          songId: 7,
          comment: `YASSSSSSS 🔥🔥🔥🔥🔥🔥`,
          createdAt: new Date(2022, 3, 21),
          updatedAt: new Date(2022, 3, 21),
        },
        {
          userId: 2,
          songId: 8,
          comment: `Cant wait to hear more of your arrangements!`,
          createdAt: new Date(2022, 3, 21),
          updatedAt: new Date(2022, 3, 21),
        },
        {
          userId: 13,
          songId: 8,
          comment: `Nice arrangement`,
          createdAt: new Date(2022, 3, 22),
          updatedAt: new Date(2022, 3, 22),
        },
        {
          userId: 3,
          songId: 9,
          comment: `Wow! These are children playing this? What a great arrangement!`,
          createdAt: new Date(2022, 3, 22),
          updatedAt: new Date(2022, 3, 22),
        },
        {
          userId: 9,
          songId: 10,
          comment: `this song moves me so much...emotionally so blessed, yes, yes!!`,
          createdAt: new Date(2022, 3, 22),
          updatedAt: new Date(2022, 3, 22),
        },
        {
          userId: 2,
          songId: 10,
          comment: `Feeling this one on so many levels`,
          createdAt: new Date(2022, 3, 23),
          updatedAt: new Date(2022, 3, 23),
        },
        {
          userId: 3,
          songId: 11,
          comment: `You guys killed this one!! 🔥🔥🔥🔥🔥🔥🔥🔥🔥`,
          createdAt: new Date(2022, 3, 23),
          updatedAt: new Date(2022, 3, 23),
        },
        {
          userId: 4,
          songId: 12,
          comment: `"It's beauty in the struggle, ugliness in the success" this verse hits hard.`,
          createdAt: new Date(2022, 3, 23),
          updatedAt: new Date(2022, 3, 23),
        },
        {
          userId: 14,
          songId: 12,
          comment: `you gotta listen to this song at least once a month, its like therapy.`,
          createdAt: new Date(2022, 3, 24),
          updatedAt: new Date(2022, 3, 24),
        },
        {
          userId: 2,
          songId: 13,
          comment: `Yooo I thought he was about to drop a trap beat on this one 😂 Love it with or without trap though!!`,
          createdAt: new Date(2022, 3, 24),
          updatedAt: new Date(2022, 3, 24),
        },
        {
          userId: 4,
          songId: 14,
          comment: `Can't get enough of this song. It's makes me sad, and happy at the same time. `,
          createdAt: new Date(2022, 3, 24),
          updatedAt: new Date(2022, 3, 24),
        },
        {
          userId: 8,
          songId: 14,
          comment: `Her voice sounds like a smile after an unexpected compliment.`,
          createdAt: new Date(2022, 3, 25),
          updatedAt: new Date(2022, 3, 25),
        },
        {
          userId: 7,
          songId: 15,
          comment: `Everything this woman touches turns into gold, she's one in a million!`,
          createdAt: new Date(2022, 3, 28),
          updatedAt: new Date(2022, 3, 28),
        },
        {
          userId: 3,
          songId: 15,
          comment: `The composer is brilliant.  They managed to capture the very sound of "enchantment" in the entirety of this song...Ethereal!`,
          createdAt: new Date(2022, 3, 29),
          updatedAt: new Date(2022, 3, 29),
        },
        {
          userId: 7,
          songId: 16,
          comment: `Inspirational!`,
          createdAt: new Date(2022, 3, 28),
          updatedAt: new Date(2022, 3, 28),
        },
        {
          userId: 8,
          songId: 16,
          comment: `This rhythm is wild! 🤯`,
          createdAt: new Date(2022, 3, 28),
          updatedAt: new Date(2022, 3, 28),
        },
        {
          userId: 6,
          songId: 17,
          comment: `this song just gave me the most peaceful feeling ever in a long time.`,
          createdAt: new Date(2022, 3, 29),
          updatedAt: new Date(2022, 3, 29),
        },
        {
          userId: 7,
          songId: 17,
          comment: `This guy gets better & better.`,
          createdAt: new Date(2022, 3, 29),
          updatedAt: new Date(2022, 3, 29),
        },
        {
          userId: 14,
          songId: 18,
          comment: `Thank you!!!! ❤️`, // Alex
          createdAt: new Date(2022, 3, 29),
          updatedAt: new Date(2022, 3, 29),
        },
        {
          userId: 11,
          songId: 18,
          comment: `Alex and Jack are perfection together`,
          createdAt: new Date(2022, 3, 30),
          updatedAt: new Date(2022, 3, 30),
        },
        {
          userId: 5,
          songId: 19,
          comment: `This isn't just music, this is pure art. Just wow.`,
          createdAt: new Date(2022, 4, 9),
          updatedAt: new Date(2022, 4, 9),
        },
        {
          userId: 15,
          songId: 19,
          comment: `How are you going to leave me hanging after dropping a gem like this?!`,
          createdAt: new Date(2022, 4, 10),
          updatedAt: new Date(2022, 4, 10),
        },
        {
          userId: 2,
          songId: 20,
          comment: `My heart!`,
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
    return queryInterface.bulkDelete("Comments", null, {});
  },
};
