const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.users;
const Professor = db.professors;
const Student = db.students;

const generateToken = (user) => {
    return jwt.sign({ id: user.userId, isAdmin: user.isAdmin, role: user.professor ? 'professor' : 'student' }, process.env.JWT_SECRET, { expiresIn: '12h' });
};
const matchPassword = async function (enteredPassword, password) {
    return await bcrypt.compare(enteredPassword, password);
};
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email }, include: [Professor, Student] });

    if (user && (await matchPassword(password, user.password))) {
        res.json({
            userId: user.userId,
            email: user.email,
            isAdmin: user.isAdmin,
            role: user.professor ? 'professor' : 'student',
            token: generateToken(user),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};
