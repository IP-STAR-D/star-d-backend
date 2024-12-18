// const jwt = require('jsonwebtoken');
// const bcrypt = require("bcrypt");
// const db = require("../models");
// const User = db.users;
// const Professor = db.professors;
// const Student = db.students;

// const generateToken = (user) => {
//     let role = 'student';
//     if(user.isAdmin) {
//         role = 'admin';
//     } else if(user.professor) {
//         role = 'professor';
//     }
//     return jwt.sign({ id: user.userId, role: role }, process.env.JWT_SECRET, { expiresIn: '12h' });
// };
// const matchPassword = async function (enteredPassword, password) {
//     return await bcrypt.compare(enteredPassword, password);
// };
// exports.loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     const user = await User.findOne({ where: { email }, include: [Professor, Student] });

//     if (user && (await matchPassword(password, user.password))) {
//         res.json({
//             userId: user.userId,
//             email: user.email,
//             isAdmin: user.isAdmin,
//             role: user.professor ? 'professor' : 'student',
//             token: generateToken(user),
//         });
//     } else {
//         res.status(401).json({ message: 'Invalid email or password' });
//     }
// };

const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const db = require("../models");
const admin = require("../../config/firebaseAdmin.js");
const User = db.users;
const Professor = db.professors;
const Student = db.students;


const generateToken = (user) => {
    let role = 'student';
    if (user.isAdmin) {
        role = 'admin';
    } else if (user.professor) {
        role = 'professor';
    }
    return jwt.sign({ id: user.userId, role: role }, process.env.JWT_SECRET, { expiresIn: '12h' });
};


const matchPassword = async function (enteredPassword, password) {
    return await bcrypt.compare(enteredPassword, password);
};


exports.loginUser = async (req, res) => {
    const { email, password, firebaseToken } = req.body; 

    try {
        if (firebaseToken) {
           
            const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
            const firebaseEmail = decodedToken.email;

           
            const user = await User.findOne({ where: { email: firebaseEmail }, include: [Professor, Student] });
            if (user) {
                res.json({
                    userId: user.userId,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    role: user.professor ? 'professor' : 'student',
                    token: generateToken(user),
                });
            } else {
                res.status(404).json({ message: "User not found in the database." });
            }
        } else if (email && password) {
            
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
        } else {
            res.status(400).json({ message: "Firebase token or email/password is required" });
        }
    } catch (error) {
        console.error("Error verifying Firebase token:", error);
        res.status(401).json({ message: "Invalid Firebase token" });
    }
};
