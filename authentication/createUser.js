import dotenv from 'dotenv'
dotenv.config()
import bcrypt from 'bcrypt'
import express from "express";
import userModel from "../models/user.js";
import displayPictureModel from '../models/displayPictures.js'
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { authorization } from '../middleware/AuthMiddleware.js';
import friendRequestModal from '../models/FrientRequest.js';
import postModel from '../models/Post.js';
import { SendFriendRequestNotification } from '../Services/Notifications/UserSpecificNotification.js';

const router = express.Router()
const storage = multer.memoryStorage();
const uploadDP = multer({ storage: storage, limits: { fileSize: 300 * 300 * 2 } })

//token
const maxAge = 3 * 60 * 60
const creatToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: maxAge
    })
}
//update User Profile picture
router.put('/updateUserProfilePicture', authorization, async (req, res) => {
    const UserId = req.userId;

    const {
        profilePic,
    } = req.body;

    const loggedInUser = await userModel.findById(UserId);
    if (!loggedInUser) {
        res.status(400).send("No User found to update");
    }
    try {
        const updateUserInfo = await userModel.findByIdAndUpdate(UserId, {
            profilePic: profilePic,
            livesIn: livesIn,
            city: city,
            state: State,
            country: country,
            highSchool: highSchool,
            college: college,
            relationShipStatus: relationShipStatus,
            hobbies: hobbies,
            likes: likes,
            dislikes: dislikes,
            bio: bio,
        })
        const updatedUser = await updateUserInfo.save();
        res.status(201).send(updatedUser);

    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
});



// update User
router.put('/updateUserInfo', authorization, async (req, res) => {
    const UserId = req.userId;
    const {
        profilePic,
        livesIn,
        city,
        State,
        country,
        highSchool,
        college,
        relationShipStatus,
        hobbies,
        likes,
        dislikes,
        bio } = req.body;
    const loggedInUser = await userModel.findById(UserId);
    if (!loggedInUser) {
        res.status(400).send("No User found to update");
    }
    try {
        let profilePicture
        profilePic && profilePic.map((item) => {
            profilePicture = item;
        });
        const updateUserInfo = await userModel.findByIdAndUpdate(UserId, {
            profilePic: profilePicture,
            livesIn: livesIn,
            city: city,
            state: State,
            country: country,
            highSchool: highSchool,
            college: college,
            relationShipStatus: relationShipStatus,
            hobbies: hobbies,
            likes: likes,
            dislikes: dislikes,
            bio: bio,
        })
        const updatedUser = await updateUserInfo.save();
        // await monitorRequests(userModel);
        console.log(updatedUser)
        return res.status(201).send(updatedUser);
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal Server Error')

    }
});


//create User
router.post('/createUser', async (req, res) => {
    const { fname, mName, Lname, email, phone, gender, dob, password } = req.body
    const existingUser = await userModel.findOne({ email: email })
    const hashPassword = await bcrypt.hash(password, 10)

    if (existingUser == null) {
        const user = new userModel({
            firstName: fname,
            middlename: mName,
            LastName: Lname,
            email: email,
            phone: phone,
            gender: gender,
            DateOfBirth: dob,
            password: hashPassword
        });
        await user.save()
        const token = creatToken(user._id);
        console.log('token', token)
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        const response = {
            success: true,
            message: "account creation successfull",
            user
        }
        res.status(201).json({ response })
    }
    else {
        res.status(404).send({ message: 'Email already exist!' })
    }
});

//login
// router.post('/login', async (req, res) => {
//     const { email, phone, password } = req.body
//     const searchCriteria = {
//         $or: [
//             { email: email },
//             { phone: phone }
//         ],
//     }
//     const existingUser = await userModel.findOne(searchCriteria)
//     if (existingUser==null || undefined) {
//         res.status(404).send({ success: false, message: "email not found" })
//     }
//     try {
//         const passMatch = await bcrypt.compare(password, existingUser.password)
//         if (existingUser.email == email || existingUser.phone == phone && passMatch) {
//             const token = creatToken(existingUser._id)
//             res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
//             const loggedInUser = {
//                 firstName: existingUser.firstName,
//                 LastName: existingUser.LastName,
//                 DOB: existingUser.DateOfBirth,
//             }
//             res.status(200).send({ success: true, message: "Login successfull!", loggedInUser })
//         } else {
//             res.status(401).send({ success: false, message: "Unauthorized Access" })
//         }

//     } catch (error) {
//         console.log(error)
//     }
// });

//login
router.post('/login', async (req, res) => {
    const { email, phone, password } = req.body;

    // Check if either email or phone `is` provided
    if (!email && !phone) {
        return res.status(400).send({ success: false, message: "Email or phone is required" });
    }
    try {
        let searchCriteria = {};
        if (email) searchCriteria.email = email;
        if (phone) searchCriteria.phone = phone;

        const existingUser = await userModel.findOne(searchCriteria);
        // Check if user exists
        if (!existingUser) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        // Compare passwords
        const passMatch = await bcrypt.compare(password, existingUser.password);

        if (passMatch) {
            // Destructure existingUser for simplicity
            const { firstName, lastName, DateOfBirth, email } = existingUser;

            // Create token
            const token = creatToken(existingUser._id);

            // Set JWT token in cookie
            res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
            SendFriendRequestNotification(existingUser._id);
            // Send response
            return res.status(200).send({
                success: true,
                message: "Login successful!",
                loggedInUser: {
                    firstName,
                    lastName,
                    DateOfBirth,
                    email
                }
            });
        } else {
            return res.status(401).send({ success: false, message: "Unauthorized Access" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});


//logout
router.get('/logout', authorization, async (req, res) => {
    const UserId = req.userId;
    const loggedInUser = await userModel.findById(UserId);
    if (loggedInUser) {
        res.cookie('jwt', '', { expires: new Date(0) });
        res.status(200).send({ message: "logot Successfully" })
    } else {
        res.status(500).send({ message: "Internal Server Error", });
    }
});

//uplaod DP
router.post('/upload-dp', async (req, res) => {
    // const UserId = req.userId
    const { displayPictureUrl, UserId } = req.body
    let dpUrl
    displayPictureUrl.map((item) => {
        dpUrl = item
    })
    try {
        if (!displayPictureUrl) {
            res.json({
                success: "false",
                message: "You must provide at leats 1 file"
            });
        } else {
            const uploadObject = new displayPictureModel({
                displayPictureUrl: dpUrl,
                users: UserId
            });
            const uploadProcess = await uploadObject.save()
            res.status(201).json({
                success: true,
                message: "upload successfull",
                obj: uploadProcess
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
    }
});

router.get('/getLoggedInUserData', authorization, async (req, res) => {
    const userID = req.userId
    // const {userID} = req.body;
    const loggedInUser = await userModel.findById(userID).select('-phone -email -password');
    if (loggedInUser) {
        res.status(200).send({ success: true, loggedInUser })
    } else {
        res.status(401).send({ success: false, message: "Unauthroriazied access" })
    }
});

router.get('/user_profiel_picture', authorization, async (req, res) => {
    const userID = req.userId
    try {
        const UserProfilePicture = await displayPictureModel.find({ users: userID });
        if (!UserProfilePicture) {
            return res.status(404).send('Image not found');
        } else {
            res.status(200).send({ UserProfilePicture })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

export default router;
