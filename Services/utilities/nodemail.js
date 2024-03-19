import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

export const transport = nodemailer.createTransport(
    {
    service:'gmail',
    host:'smtp.gmail.com',
    port:578,
    secure:false,
    auth:{
        user:process.env.user,
        pass:process.env.pass,
    }
});

