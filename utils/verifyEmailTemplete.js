const verifyEmailTemplate = ({ name, url }) => {
  return `
    <p>Dear ${name}</p>
    <p>Thank you for registering to Blinkeyit</p>
    <a href="${url}" 
       style="color:white; background:blue; padding:10px 20px; margin-top:10px; display:inline-block; text-decoration:none;">
      Verify Email
    </a>
  `;
};

export default verifyEmailTemplate;
