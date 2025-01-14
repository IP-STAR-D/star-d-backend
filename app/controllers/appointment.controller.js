const db = require("../models");
const Appointment = db.appointments;
const User = db.users;
const Student = db.students;
const Professor = db.professors;
const Exam = db.exams;
const Group = db.groups;
const Classroom = db.classrooms;
const AppSettings = db.appSettings;
const Op = db.Sequelize.Op;
const sendEmail = require("../utils/email");

const checkIfBoss = async (studentId) => {
  let student = await Student.findByPk(studentId, {
    include: [
      {
        model: Group,
        attributes: ["bossId"],
      },
    ],
  });
  return studentId === student.group.bossId;
};

const sendEmails = async () => {
  let setting = await AppSettings.findOne({ name: "sendEmails" });
  return setting.value;
};

// Create a new Appointment
exports.create = async (req, res) => {
  const { examId, groupId, classroomId, status, startTime, endTime } = req.body;
  const studentIsBoss = await checkIfBoss(req.user.id);
  if (req.user.role == "student" && !studentIsBoss) {
    return res.status(400).json({ message: "Student is not the leader of the group!" });
  }

  if (!examId || !groupId || !classroomId || !startTime || !status || !endTime) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Găsim profesorul asociat examenului
    const exam = await Exam.findByPk(examId, {
      include: [
        {
          model: Professor,
          as: "professor",
          include: [{ model: User, as: "user" }],
        },
      ],
    });

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const professorEmail = exam.professor?.user?.email;
    if (!professorEmail) {
      return res.status(404).json({ message: "Associated professor not found or has no email" });
    }

    // Creăm programarea
    const appointment = await Appointment.create({
      examId,
      groupId,
      classroomId,
      status,
      startTime,
      endTime,
    });

    const group = await Group.findByPk(groupId);
    const classroom = await Classroom.findByPk(classroomId);

    if (await sendEmails()) {
      // Trimitem e-mail profesorului
      const emailTemplate = `
      Stimat(a) ${exam.professor?.user?.firstName} ${exam.professor?.user?.lastName},

      O noua programare a fost creata.

      Detalii despre programare:
      - Examen: ${exam.class_name || "Necunoscut"}
      - Grupa: ${group.groupName || "Necunoscut"}
      - Sala: ${classroom.classroomName || "Necunoscut"}
      - Status: ${translateStatus(status) || "Necunoscut"}
      - Ora de incepere: ${new Date(startTime).toLocaleString("ro-RO")}
      - Ora de incheiere: ${new Date(endTime).toLocaleString("ro-RO")}

      Cu respect,
      Echipa STAR-D
    `;

      sendEmail({
        to: professorEmail,
        subject: `[Programari USV] ${exam.shortName} | Programare creata`,
        text: emailTemplate,
      });
    }
    // Returnăm răspunsul
    res.status(201).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message || "An error occurred while creating the appointment.",
    });
  }
};

// Retrieve all Appointments from the database
exports.findAll = async (req, res) => {
  let conditions = {};
  if (req.user.role == "student") {
    let student = await Student.findByPk(req.user.id);

    conditions = { where: { groupId: student.groupId } };
  } else {
    conditions = {
      attributes: ["*"],
      include: [
        {
          model: Exam,
          attributes: ["class_name"],
          required: true,
          include: [
            {
              model: Professor,
              attributes: [],
              required: true,
              where: { user_id: req.user.id },
            },
          ],
        },
      ],
      raw: true,
    };
  }
  Appointment.findAll(conditions)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Appointments.",
      });
    });
};

// Find appointments by professorId, classroomId, groupId and day
exports.findFiltered = async (req, res) => {
  const { professorId, classroomId, groupId: queryGroupId, day } = req.query;

  let groupId = queryGroupId;
  if (!groupId && req.user.role === "student") {
    try {
      const student = await Student.findByPk(req.user.id);
      groupId = student?.groupId;
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving student group.",
        error: error.message,
      });
    }
  }

  try {
    const startOfDay = new Date(day);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(day);
    endOfDay.setHours(23, 59, 59, 999);

    // Fetch appointments by professorId and day
    const professorAppointments = professorId
      ? await Appointment.findAll({
          where: {
            startTime: { [Op.between]: [startOfDay, endOfDay] },
          },
          include: [
            {
              model: Exam,
              required: true,
              where: { professorId: professorId },
            },
          ],
        })
      : [];

    // Fetch appointments by classroomId and day
    const classroomAppointments = classroomId
      ? await Appointment.findAll({
          where: {
            startTime: { [Op.between]: [startOfDay, endOfDay] },
            classroomId: classroomId,
          },
          include: [
            {
              model: Exam,
              required: true,
            },
          ],
        })
      : [];

    // Fetch appointments by groupId and day
    const groupAppointments = groupId
      ? await Appointment.findAll({
          where: {
            startTime: { [Op.between]: [startOfDay, endOfDay] },
            groupId: groupId,
          },
          include: [
            {
              model: Exam,
              required: true,
            },
          ],
        })
      : [];

    // Combine results
    const combinedAppointments = [...professorAppointments, ...classroomAppointments, ...groupAppointments];

    // Remove duplicates based on ID
    const uniqueAppointments = Array.from(
      new Map(combinedAppointments.map((appt) => [appt.appointmentId, appt])).values()
    );

    if (uniqueAppointments.length > 0) {
      const matches = uniqueAppointments.map((appointment) => {
        const criteria = [];
        if (professorAppointments.some((appt) => appt.appointmentId === appointment.appointmentId)) {
          criteria.push("professor");
        }
        if (classroomAppointments.some((appt) => appt.appointmentId === appointment.appointmentId)) {
          criteria.push("classroom");
        }
        if (groupAppointments.some((appt) => appt.appointmentId === appointment.appointmentId)) {
          criteria.push("group");
        }
        return {
          id: appointment.appointmentId,
          matches: criteria,
        };
      });
      res.send({
        appointments: uniqueAppointments,
        matches: matches,
      });
    } else {
      res.status(404).send({ message: "No appointments found for the provided criteria." });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving appointments.",
      error: err.message,
    });
  }
};

// Find all appointments by a groupId or examId
exports.findByGroupOrExamId = (req, res) => {
  const { examId, groupId } = req.params;
  let where = {};
  if (examId) {
    where = { examId };
  } else if (groupId) {
    where = { groupId };
  } else {
    return res.status(400).json({ message: "All fields are required" });
  }

  Appointment.findAll({ where })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No appointments found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving appointments!" + prof,
      });
    });
};

// Find a single Appointment with an id
exports.findOne = (req, res) => {
  const appointment_id = req.params.id;

  Appointment.findByPk(appointment_id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Appointment with id=${appointment_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Appointment with id=" + appointment_id,
      });
    });
};

function translateStatus(status) {
  switch (status) {
    case "scheduled":
      return "Programat";
    case "rejected":
      return "Respins";
    case "pending":
      return "In asteptare";
    default:
      return status;
  }
}

function getActionStatus(status) {
  switch (status) {
    case "scheduled":
      return "acceptata";
    case "rejected":
      return "respinsa";
    default:
      return "modificata";
  }
}

// Update a Appointment by the id in the request
exports.update = async (req, res) => {
  const appointment_id = req.params.id;
  const app = req.body;

  Appointment.update(req.body, {
    where: { appointmentId: appointment_id },
  })
    .then(async (result) => {
      const group = await Group.findByPk(app.groupId);
      const classroom = await Classroom.findByPk(app.classroomId);
      const exam = await Exam.findByPk(app.examId);

      const bossUser = await User.findByPk(group.bossId);

      if (result == 1) {
        res.send({
          message: "Appointment was updated successfully.",
        });
        if (await sendEmails()) {
          try {
            const emailTemplate = `
            Stimat(a) ${bossUser.firstName} ${bossUser.lastName},

            Una din programarile dumneavoastra a fost ${getActionStatus(app.status)}.

            Detalii despre programare:
            - Examen: ${exam.class_name || "Necunoscut"}
            - Grupa: ${group.groupName || "Necunoscut"}
            - Sala: ${classroom.classroomName || "Necunoscut"}
            - Status: ${translateStatus(app.status) || "Necunoscut"}
            - Ora de incepere: ${new Date(app.startTime).toLocaleString("ro-RO")}
            - Ora de incheiere: ${new Date(app.endTime).toLocaleString("ro-RO")}

            Cu respect,
            Echipa STAR-D
            `;

            sendEmail({
              to: bossUser.email,
              subject: `[Programari USV] ${exam.shortName} | Programare ${getActionStatus(req.body.status)}`,
              text: emailTemplate,
            });
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        res.status(400).send({
          message: `Cannot update Appointment with id=${appointment_id}. Maybe Appointment was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Appointment with id=" + appointment_id,
      });
    });
};

// Delete a Appointment by the id in the request
exports.delete = async (req, res) => {
  const appointment_id = req.params.id;
  const app = req.body;

  Appointment.destroy({ where: { appointmentId: appointment_id } })
    .then(async (result) => {
      const group = await Group.findByPk(app.groupId);
      const classroom = await Classroom.findByPk(app.classroomId);
      const exam = await Exam.findByPk(app.examId);

      const bossUser = await User.findByPk(group.bossId);

      if (result == 1) {
        res.send({
          message: "Appointment was deleted successfully.",
        });
        if (await sendEmails()) {
          try {
            const emailTemplate = `
            Stimat(a) ${bossUser.firstName} ${bossUser.lastName},

            Una din programarile dumneavoastra a fost stearsa.

            Detalii despre programare:
            - Examen: ${exam.class_name || "Necunoscut"}
            - Grupa: ${group.groupName || "Necunoscut"}
            - Sala: ${classroom.classroomName || "Necunoscut"}
            - Status: ${translateStatus(app.status) || "Necunoscut"}
            - Ora de incepere: ${new Date(app.startTime).toLocaleString("ro-RO")}
            - Ora de incheiere: ${new Date(app.endTime).toLocaleString("ro-RO")}

            Cu respect,
            Echipa STAR-D
          `;

            sendEmail({
              to: bossUser.email,
              subject: `[Programari USV] ${exam.shortName} | Programare stearsa`,
              text: emailTemplate,
            });
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        res.status(404).send({
          message: `Cannot find Appointment with id=${appointment_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Appointment with id=" + appointment_id,
      });
    });
};
