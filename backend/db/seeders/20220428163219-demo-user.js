"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "demo@user.io",
          username: "Demo-Melomaniac",
          hashedPassword: bcrypt.hashSync("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "knowell@briana.io",
          username: "knowell3",
          hashedPassword: bcrypt.hashSync("knowEll3"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "alfamist@user.io",
          username: "alfamist",
          hashedPassword: bcrypt.hashSync("alfamistnocturne"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "mereba@user.io",
          username: "mereba",
          hashedPassword: bcrypt.hashSync("merebakin"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "david@user.io",
          username: "davidR",
          hashedPassword: bcrypt.hashSync("davidR55"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "alycia@user.io",
          username: "alyciaWR",
          hashedPassword: bcrypt.hashSync("alyciaWR"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "anomalie@user.io",
          username: "anomalie",
          hashedPassword: bcrypt.hashSync("anomalie"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "jermainec@user.io",
          username: "jcole",
          hashedPassword: bcrypt.hashSync("jcole14"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "lamark@user.io",
          username: "kungfukenny",
          hashedPassword: bcrypt.hashSync("duckworth"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "srachmaninoff@user.io",
          username: "sergeiRach",
          hashedPassword: bcrypt.hashSync("rachmaninoff"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "liannelahavas@user.io",
          username: "lahavasLi",
          hashedPassword: bcrypt.hashSync("lianne"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "corinnebaileyrae@user.io",
          username: "RinnyBRae",
          hashedPassword: bcrypt.hashSync("raecorrinebailey"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "thomyork@user.io",
          username: "thom",
          hashedPassword: bcrypt.hashSync("dreamersneverlearn"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "michaelkiwanuka@user.io",
          username: "mkiwanuka",
          hashedPassword: bcrypt.hashSync("finaldays"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "alexisley@user.io",
          username: "aIsley",
          hashedPassword: bcrypt.hashSync("marigold"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Users",
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
