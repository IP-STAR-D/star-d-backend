const db = require("../models");
const User = db.users;
const Students = db.students;
const Professors = db.professors;
const Groups = db.groups;
const Degrees = db.degrees;
const Faculties = db.faculties;

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.findAll()
    .then((data) => {
      data.forEach((user) => (user.password = undefined));
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const user_id = req.params.id;

  User.findByPk(user_id)
    .then((data) => {
      if (data) {
        data.password = undefined;
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with user_id=${user_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with user_id=" + user_id,
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const userId = req.params.userId;

  User.update(req.body, {
    where: { userId },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Get data about the user
exports.getUserData = async (req, res) => {
  const user_id = req.user.id;
  const role = req.user.role;
  const isAdmin = req.user.isAdmin;

  try {
    const user = await db.users.findByPk(user_id);
    if (!user) {
      return res.status(404).send({ message: `Cannot find User with user_id=${user_id}.` });
    }
    user.password = undefined;

    if (role === "admin" || isAdmin) {
      return res.send({ user });
    } else if (role === "student") {
      const student = await db.students.findByPk(user_id);
      if (!student) {
        return res.status(404).send({ message: `Cannot find Student with user_id=${user_id}.` });
      }

      const group = await db.groups.findByPk(student.groupId);
      if (!group) {
        return res.status(404).send({ message: `Cannot find Group with group_id=${student.groupId}.` });
      }

      const degree = await db.degrees.findByPk(group.degreeId);
      if (!degree) {
        return res.status(404).send({ message: `Cannot find Degree with degree_id=${group.degreeId}.` });
      }

      const faculty = await db.faculties.findByPk(degree.facultyId);
      if (!faculty) {
        return res.status(404).send({ message: `Cannot find Faculty with faculty_id=${degree.facultyId}.` });
      }

      return res.send({ user, student, group, degree, faculty });
    } else if (role === "professor") {
      const professor = await db.professors.findByPk(user_id);
      if (!professor) {
        return res.status(404).send({ message: `Cannot find Professor with user_id=${user_id}.` });
      }

      const faculty = await db.faculties.findByPk(professor.facultyId);
      if (!faculty) {
        return res.status(404).send({ message: `Cannot find Faculty with faculty_id=${professor.facultyId}.` });
      }

      return res.send({ user, professor, faculty });
    } else {
      return res.status(400).send({ message: "Invalid user role." });
    }
  } catch (err) {
    return res.status(500).send({ message: "Error retrieving data for user_id=" + user_id });
  }
};

const bcrypt = require("bcrypt");

// Temporary route to encrypt all passwords
exports.encryptPasswords = async (req, res) => {
  try {
    const users = await User.findAll();

    for (const user of users) {
      if (user.password && !user.password.startsWith("$2b$")) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await user.update({ password: hashedPassword });
      }
    }

    res.send({ message: "All passwords have been encrypted successfully." });
  } catch (error) {
    console.error("Error encrypting passwords:", error);
    res.status(500).send({ message: "Error occurred while encrypting passwords." });
  }
};
