import nodemail from "nodemailer";
import { google } from "googleapis";
import path from "path";
import ejs from "ejs";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

const GOOGLE_ID = process.env.GOOGLE_ID;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET;
const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL;
const GOOGLE_REFRESH = process.env.GOOGLE_REFRESH;

const oAuth = new google.auth.OAuth2(
  GOOGLE_ID,
  GOOGLE_SECRET,
  GOOGLE_REDIRECT_URL
);

oAuth.setCredentials({ refresh_token: GOOGLE_REFRESH });

const url: string = "http://localhost:2233";

export const verifiedEmail = async (user: any) => {
  try {
    const accessToken: any = (await oAuth.getAccessToken()).token;

    const transporter = nodemail.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "codelabbest@gmail.com",
        clientSecret: GOOGLE_SECRET,
        clientId: GOOGLE_ID,
        refreshToken: GOOGLE_REFRESH,
        accessToken,
      },
    });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      "secretCode"
    );

    let frontEndURL: string = `${url}/${token}/sign-in`;
    let devURL: string = `${url}/api/verify-user/${user._id}`;

    const myPath = path.join(__dirname, "../views/index.ejs");
    const html = await ejs.renderFile(myPath, {
      link: devURL,
      tokenCode: user.token,
      userName: user.userName,
    });

    const mailerOption = {
      from: "wecareHMO❤️⛑️🚑 <codelabbest@gmail.com>",
      to: user.email,
      subject: "Account Verification",
      html,
    };

    await transporter.sendMail(mailerOption);
  } catch (error) {
    console.error();
  }
};

export const addMemberEmail = async (member: any, getUser: any) => {
  try {
    console.log("work: ", member);
    const accessToken: any = (await oAuth.getAccessToken()).token;

    const transporter = nodemail.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "codelabbest@gmail.com",
        clientSecret: GOOGLE_SECRET,
        clientId: GOOGLE_ID,
        refreshToken: GOOGLE_REFRESH,
        accessToken,
      },
    });
    console.log("work1 ");

    let devURL: string = `${url}/api/verify-user/${getUser._id}`;

    const myPath = path.join(__dirname, "../views/memberAdded.ejs");
    console.log(
      "fill test: ",
      getUser.email,
      member.firstName,
      member.relationship,

      myPath
    );

    const html = await ejs.renderFile(myPath, {
      relationship: member.relationship,
      firstName: member.firstName,
    });

    const mailerOption = {
      from: "wecareHMO❤️⛑️🚑 <codelabbest@gmail.com>",
      to: getUser.email,
      subject: "Family Member added Notification",
      html,
    };

    console.log("work2 ");
    await transporter.sendMail(mailerOption).then(() => {
      console.log("done sending");
    });
  } catch (error) {
    console.error();
  }
};
