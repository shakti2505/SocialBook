import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import express from 'express';
import connectDB from './DB/ConnectDB.js';
import authenticationRoutes from './authentication/createUser.js'
import PostRoutes from './Services/CreatePost.js'
import FriendRequestRoutes from './Services/FrientRequest.js'
import path from 'path';
import url from 'url'
import userModel from './models/user.js';
import webpush from 'web-push'
import SubscriptionModel from './models/SubscriptionSchema.js'
import options from './middleware/PushNotification.js';
import postModel from './models/Post.js';
import SubscriptionRoute from './Services/Subscription/SubscriptionForPushNotifications.js'
import PostCommentsRoutes from './Services/Comments/PostComments.js'

const app = express();
const PORT = process.env.PORT || 4600
const DATABASE_URL = process.env.DATABASE_URL;
//database connection
connectDB(DATABASE_URL)
//middleware
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

const allowedOrigins = [
    'http://localhost:3000',
    'https://socialbook-x3jq.onrender.com'
]

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin
            // (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg =
                    "The CORS policy for this site does not " +
                    "allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true,
    })
);

app.use(express.static(path.join(__dirname, 'build')));

// app.post('/subscribe', async (req, res) => {
//     try {
//         console.log('rbody:', req.body)
//         const { endpoint, expirationTime, keys } = req.body
//         if (!endpoint || !keys) {
//             return res.status(401).json({ messgae: 'All fields are mandatory' });
//         }
//         const newSubscription = new SubscriptionModel({
//             endpoint, expirationTime, keys
//         })
//         console.log('newSubscription', newSubscription)
//         await newSubscription.save()
//         // checking the change in the collection
//         const res2 = await webpush.sendNotification(    
//             newSubscription,
//           { title: 'Hello from server',
//             description: 'this message is coming from the server',
//             image: 'https://cdn2.vectorstock.com/i/thumb-large/94/66/emoji-smile-icon-symbol-smiley-face-vector-26119466.jpg',},
//             options
//         );
//         return res.status(200);
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({ messgae: "Internal Server Error", error });
//     }
// });

//load Router
app.use('/authentication', authenticationRoutes);
app.use('/services', PostRoutes);
app.use('/services', FriendRequestRoutes);
app.use('/services', SubscriptionRoute);
app.use('/services/Comments', PostCommentsRoutes);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});