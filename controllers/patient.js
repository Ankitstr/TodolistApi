const jwt = require('jsonwebtoken'); //used to decode jwt token
const Patient = require('../models/patient'); //Patient model
const Doctor = require('../models/doctor'); //Doctor model
//const Report = require('../models/report'); //Report model

//creating a new patient
module.exports.CreatePatient = async function (req, res) {
    //extracting doctor's info from jwt token sent to server
    const doctorJWTToken = req.headers.authorization;
    const token = doctorJWTToken.split(' ');
    const decoded = jwt.verify(token[1], 'PaOpZvKmDVqtVwaUWLBvia9X5qNMaSNp');
    try {
        const doctor = await Doctor.findById(decoded._id); //finding the doctor

        if (!doctor) {
            //if doctor dosen't exist
            return res.json(401, {
                message: 'Doctor does not exist in database!'
            })
        } else {
            let patient = await Patient.findOne({ phone: req.body.phone }); //finding the patient
            if (patient) {
                //if patient already exists return his/her details
                return res.json(201, {
                    message: 'Patient already exists',
                    data: patient
                })
            } else {
                patient = await Patient.create(req.body); //creating a new patient
                return res.json(200, {
                    message: 'Patient created successfully',
                    data: patient
                });
            }
        }
    } catch {
        //checking for errors
        console.log('Internal server error!!');
        return res.json(500, {
            message: 'Internal Server Error'
        })
    }
}
// DELETE a patient
    
   module.exports.delete= async function (req, res) {
        ///extracting doctor's info from jwt token sent to server
        const doctorJWTToken = req.headers.authorization;
        const token = doctorJWTToken.split(' ');
        const decoded = jwt.verify(token[1], 'PaOpZvKmDVqtVwaUWLBvia9X5qNMaSNp');
    
        try {
            const doctor = await Doctor.findById(decoded._id); //finding the doctor
    
            if (!doctor) {
                //if doctor dosen't exist
                return res.json(401, {
                    message: 'Doctor does not exist in database!'
                })
            } else {
                let patient = await Patient.findByIdAndDelete(req.params.id); //finding the patient
                if (patient) {
                    //if patient already exists return his/her details
                    return res.json(201, {
                        message: 'Patient Deleted',
                       // data: patient
                    })
                } 
            }
        } catch {
            //checking for errors
            console.log('Internal server error!!');
            return res.json(500, {
                message: 'Internal Server Error'
            })

        }
    }

