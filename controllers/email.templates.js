//import emailMsgs from "./email.msgs";

const CLIENT_ORIGIN = "https://hinterlandgoa.netlify.app";

// This file is exporting an Object with a single key/value pair.
// However, because this is not a part of the logic of the application
// it makes sense to abstract it to another file. Plus, it is now easily
// extensible if the application needs to send different email templates
// (eg. unsubscribe) in the future.
const emailTemplates = {
  confirm: (id) => ({
    subject: "Hinterland Confirm Email",
    html: `
      <a href=${CLIENT_ORIGIN}/user/email/confirm/${id}>
        click to confirm 
      </a>
    `,
    text:
      "Copy and paste this link:" +
      `${CLIENT_ORIGIN}` +
      "/user/email/confirm/" +
      `${id}`,
  }),
};

export default emailTemplates;
