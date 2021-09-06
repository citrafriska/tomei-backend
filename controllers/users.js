const { User, sequelize } = require("../models");

class UserControllers {
  static async signUp(req, res, next) {
    const { name, password, email } = JSON.parse(req.body.data);
    const t = await sequelize.transaction();

    try {
      await User.findOne({ where: { email } }).then(async (user) => {
        if (!user) {
          if (!req.file) {
            res.status(500).json({ msg: "Avatar is required." });
            return next({
              type: "Bad Request",
              errors: [{ message: "Avatar is required." }],
            });
          }

          const newUser = {
            name,
            password,
            email,
          };

          newUser.avatar = req.file.filename;

          await User.create(newUser, { transaction: t, validate: true });

          await t.commit();

          res.status(201).json({
            msg: "Successfully Signed Up!",
            newUser,
          });
        } else {
          res.status(409).json({ msg: "Account already exists." });
          await t.rollback();
          return next(err);
        }
      });
    } catch (err) {
      await t.rollback();
      return next(err);
    }
  }
}

module.exports = UserControllers;
