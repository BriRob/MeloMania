"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: 'demo@user.io',
          username: 'Demo-Melomaniac',
          hashedPassword: bcrypt.hashSync('password'),
          createdAt: new Date(),
          updatedAt: new Date()
          },
          {
          email: 'knowell@briana.io',
          username: 'knowell3',
          hashedPassword: bcrypt.hashSync('knowEll3'),
          createdAt: new Date(),
          updatedAt: new Date()
          },
          {
          email: 'alfamist@user.io',
          username: 'alfamist',
          hashedPassword: bcrypt.hashSync('alfamistnocturne'),
          createdAt: new Date(),
          updatedAt: new Date()
          },
          {
          email: 'mereba@user.io',
          username: 'mereba',
          hashedPassword: bcrypt.hashSync('merebakin'),
          createdAt: new Date(),
          updatedAt: new Date()
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
