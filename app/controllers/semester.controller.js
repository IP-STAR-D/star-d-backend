const db = require("../models");
const Semester = db.semesters;
const Op = db.Sequelize.Op;

// Create a new Semester
exports.create = async (req, res) => {
  try {
    const { year, semester, colloquyStart, colloquyEnd, examStart, examEnd, semesterStart, semesterEnd } = req.body;

    if (
      !year ||
      semester == null ||
      !colloquyStart ||
      !colloquyEnd ||
      !examStart ||
      !examEnd ||
      !semesterStart ||
      !semesterEnd
    ) {
      return res.status(400).send({ message: "All fields are required." });
    }

    const newSemester = await Semester.create({
      year,
      semester,
      colloquyStart,
      colloquyEnd,
      examStart,
      examEnd,
      semesterStart,
      semesterEnd,
    });

    res.status(201).send(newSemester);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error creating Semester." });
  }
};

// Retrieve all Semesters
exports.findAll = async (req, res) => {
  try {
    const semesters = await Semester.findAll();
    res.status(200).send(semesters);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error retrieving Semesters." });
  }
};

// Retrieve a single Semester by ID
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const semester = await Semester.findByPk(id);

    if (!semester) {
      return res.status(404).send({ message: "Semester not found." });
    }

    res.status(200).send(semester);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error retrieving Semester." });
  }
};

// Retrieve Semesters by Year and Semester
exports.findByYearAndSemester = async (req, res) => {
  try {
    const { year, semester } = req.query;

    if (!year || semester == null) {
      return res.status(400).send({ message: "Year and Semester are required." });
    }

    const semesters = await Semester.findAll({ where: { year, semester } });

    if (semesters.length === 0) {
      return res.status(404).send({ message: "No Semesters found for the specified year and semester." });
    }

    res.status(200).send(semesters);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error retrieving Semesters by year and semester." });
  }
};

// Retrieve the Current Semester
exports.findCurrentSemester = async (req, res) => {
  try {
    const currentDate = new Date();

    const semester = await Semester.findOne({
      where: {
        semesterStart: { [Op.lte]: currentDate },
        examEnd: { [Op.gte]: currentDate },
      },
    });

    if (!semester) {
      return res.status(404).send({ message: "No current Semester found." });
    }

    res.status(200).send(semester);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error retrieving the current Semester." });
  }
};

// Update a Semester by ID
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { year, semester, colloquyStart, colloquyEnd, examStart, examEnd, semesterStart, semesterEnd } = req.body;

    const semesterToUpdate = await Semester.findByPk(id);

    if (!semesterToUpdate) {
      return res.status(404).send({ message: "Semester not found." });
    }

    await semesterToUpdate.update({
      year,
      semester,
      colloquyStart,
      colloquyEnd,
      examStart,
      examEnd,
      semesterStart,
      semesterEnd,
    });

    res.status(200).send(semesterToUpdate);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error updating Semester." });
  }
};

// Delete a Semester by ID
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const semester = await Semester.findByPk(id);

    if (!semester) {
      return res.status(404).send({ message: "Semester not found." });
    }

    await semester.destroy();

    res.status(204).send({
      message: "Semester was deleted successfully.",
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error deleting Semester." });
  }
};
