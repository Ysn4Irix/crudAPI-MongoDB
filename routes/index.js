/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 24-08-2021
 * @modify date 20-09-2021
 * @desc [Routes]
 */

const router = require("express").Router();
const crud = require("../controllers/crudController");

/* GET All Users. */
router.get("/", crud.getAllUsers);

/* GET one User. */
router.get("/:id", crud.getuser, crud.getOneUser);

/* creating a User. */
router.post("/adduser", crud.addUser);

/* updating a User. */
router.patch("/:id", crud.getuser, crud.updateUser);

/* deleting a User. */
router.delete("/:id", crud.getuser, crud.deleteUser);

/* insert many. router for testing */
/* router.post("/insert", crud.insertMany); */

module.exports = router;
