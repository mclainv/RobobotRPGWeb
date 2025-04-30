import { GetServerSidePropsContext } from "next";

export const validateCookies = (ctx: GetServerSidePropsContext) => {
    const sessionID = ctx.req.cookies['connect.sid'];
    console.log("ctx.req.cookies are ", ctx.req.cookies);
    console.log("sessionID is ", sessionID);
    return sessionID ? ({
        Cookie: `connect.sid=${sessionID}`
    }) : false;
}