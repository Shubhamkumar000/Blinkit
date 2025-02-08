const verifyEmailTemplate = ({name, url}) => {
    return `
    <p>Dear ${name}</p>
    <p>Thank you for registering at Blinkit</p>
    <a href=${url} style="color: white; background-color: blue; padding: 10px 20px; border: none; border-radius: 5px;">
    Verify Email
    </a>
    `
}


export default verifyEmailTemplate;