import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async (
    to: string,
    subject: string,
    html?: string
): Promise<string> => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,  // Gmail SMTP server
            port: 465,  // SMTP port for Gmail
            service: 'gmail',  // Gmail service
            secure: true, // Use SSL for secure connection
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        });

        const mailOptions: nodemailer.SendMailOptions = {
            from: process.env.MAIL_USER,
            to,
            subject,
            html
        };

        const mailRes = await transporter.sendMail(mailOptions);
        console.log("Message sent:", mailRes);

        if (mailRes.accepted.length > 0) return 'Email sent successfully';
        if (mailRes.rejected.length > 0) return 'Email not sent';
        return 'Email server not responding';
    } catch (error: any) {
        console.log("Error sending email:", error.message);
        return JSON.stringify(error.message);
    }
};