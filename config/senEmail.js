import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.RESEND_API) {
  console.log("❌ RESEND_API is missing inside .env file");
}

const resend = new Resend(process.env.RESEND_API);  

const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Blinkit <onboarding@resend.dev>",
      to: sendTo,
      subject,
      html
    });

    if (error) {
      console.log("Mail Error:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.log("Mail Exception:", err);
    return null;
  }
};

export default sendEmail;
