"use strict";
const { Model } = require("sequelize");
const { encrypt } = require("../middlewares/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Name is required.",
          },
          notEmpty: {
            args: true,
            msg: "Name is required.",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Password is required.",
          },
          notEmpty: {
            args: true,
            msg: "Password is required.",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: "Email is required.",
          },
          notNull: {
            args: true,
            msg: "Email is required.",
          },
          notEmpty: {
            args: true,
            msg: "Email is required.",
          },
        },
      },
      avatar: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Avatar is required.",
          },
          notEmpty: {
            args: true,
            msg: "Avatar is required.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(user, option) {
          user.password = encrypt(user.password);
        },
      },
    }
  );
  return User;
};
