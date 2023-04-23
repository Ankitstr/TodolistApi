const jwt = require('jsonwebtoken'); //used to decode jwt token
const Doctor = require('../models/doctor'); //Doctor model


//creates a new doctor account
module.exports.CreateDoctor = async function (req, res) {
    try {
        let doctor = await Doctor.findOne({ email: req.body.email }); //checking if doctor alreadr exists
        if (doctor) {
            //if doctor exists
            return res.json(409, {
                message: 'Doctor already exists!'
            });
        } else {
            doctor = await Doctor.create(req.body); //creating a new doctor account
            return res.json(201, {
                message: 'Doctor created successfully!'
            })
        }
    } catch {
        //catching errors
        console.log('Internal server error!!');
        return res.json(500, {
            message: 'Internal Server Error'
        })
    }
}

//logging in a doctor
module.exports.DoctorLogin = async function (req, res) {
    try {
        //finding the doctor
        let doctor = await Doctor.findOne({ email: req.body.email });
        if (!doctor || doctor.password != req.body.password) {
            //if doctor dosen't exist or invalid password
            return res.json(401, {
                message: 'Invalid username/password'
            });
        }

        //if log in successfull return a new jwt token that expires in 2 hours
        return res.json(200, {
            message: 'Login successfull, JWT token sen\'t successfully, please keep it safe!',
            data: {
                //creating the new jwt token
                token: jwt.sign(doctor.toJSON(), 'PaOpZvKmDVqtVwaUWLBvia9X5qNMaSNp', { expiresIn: '7200000' })
            }
        })
    } catch {
        //catching errors
        console.log('Internal Server Error!!');
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}
