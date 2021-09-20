/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 24-08-2021
 * @modify date 20-09-2021
 * @desc [CRUD Controller]
 */

const User = require("../models/Users");
const { validateInsert, validateUpdate } = require("../helpers/validation");
const nodecache = require("node-cache");
const { hash } = require("bcrypt");

const mycache = new nodecache({ stdTTL: 60 });

const UsersCrud = {
  addUser: async (req, res, next) => {
    /* Validation */
    const { error } = validateInsert(req.body);
    if (error) return next(error);

    /* Check Email Exists */
    const EmailExist = await User.findOne({
      email: req.body.email,
    });
    //return res.status(200).jsonp(EmailExist);
    if (EmailExist) return next(new Error("⛔ Email ID already exists"));

    /* Check Username Exists */
    const UsernameExist = await User.findOne({
      username: req.body.username,
    });
    if (UsernameExist) return next(new Error("⛔ Username already in use"));

    const hashed = await hash(req.body.password, 16);

    const user = new User({
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: hashed,
      ip: req.ip,
    });

    await user
      .save()
      .then(() => {
        res.status(200).json({
          status: 200,
          response: "OK",
          message: "Account created succesfully ✅",
        });
      })
      .catch((err) => {
        next(new Error("⛔ Error while registring a user" + err));
      });
  },
  /* Getting All Users */
  getAllUsers: async (req, res, next) => {
    try {
      if (mycache.has("databaseCache")) {
        res.status(200).json({
          status: 200,
          response: mycache.get("databaseCache"),
        });
      } else {
        const users = await User.find();
        mycache.set("databaseCache", users);
        res.status(200).json({
          status: 200,
          response: users,
        });
      }
    } catch (err) {
      next(err);
    }
  },
  /* Getting One */
  getOneUser: (req, res) => {
    res.status(200).json({
      status: 200,
      response: res.user,
    });
  },
  /* update user data */
  updateUser: async (req, res, next) => {
    /* Validation */
    const { error } = validateUpdate(req.body);
    if (error) return next(error);

    if (req.body.fullname != null) res.user.fullname = req.body.fullname;
    if (req.body.username != null) res.user.username = req.body.username;
    if (req.body.email != null) res.user.email = req.body.email;

    try {
      const updatedUser = await res.user.save();
      res.status(200).json({
        status: 200,
        response: updatedUser,
      });
    } catch (err) {
      next(err);
    }
  },
  /* Delete User */
  deleteUser: async (req, res) => {
    try {
      await res.user.remove();
      res.status(200).json({
        status: 200,
        message: "User Deleted Successfully",
      });
    } catch (err) {
      next(err);
    }
  },
  // TODO Uncomment for inserting a dump data for testing
  /*  insertMany: async (req, res, next) => {
    User.insertMany([]) // TODO passing your data as an array of json data
      .then(() => {
        res.status(200).json({
          message: "Response 🆗",
        });
      })
      .catch((err) => {
        next(err);
      });
  }, */
  /* Get user */
  getuser: async (req, res, next) => {
    let user;
    try {
      user = await User.findById(req.params.id);
      if (user == null) return next(new Error("⛔ Cannot find user"));
    } catch {
      next(new Error("⛔ Database Error 😢"));
    }
    res.user = user;
    next();
  },
};

module.exports = UsersCrud;
