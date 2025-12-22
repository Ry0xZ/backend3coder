const { Router } = require("express");
const mocksRouter = require("./mocks.router");
const usersRouter = require("./users.router");
const petsRouter = require("./pets.router");

const router = Router();

router.use("/mocks", mocksRouter);
router.use("/users", usersRouter);
router.use("/pets", petsRouter);

module.exports = router;