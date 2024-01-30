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


const app = express();
const PORT = process.env.PORT || 4600
const DATABASE_URL = process.env.DATABASE_URL;

//database connection
connectDB(DATABASE_URL)

//middleware
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your client's origin
    credentials: true, // Allow credentials,
    
};
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'build')));


//load Router
app.use('/authentication', authenticationRoutes)
app.use('/services', PostRoutes)
app.use('/services', FriendRequestRoutes)

app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})