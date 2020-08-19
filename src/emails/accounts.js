const sgMail= require('@sendgrid/mail')

const sendgridAPIkey=(process.env.sendgridAPIkey)
sgMail.setApiKey(sendgridAPIkey)
 
const sendWelcomeEmails=(email,name)=>{
    sgMail.send({
        to: email,
        from:'surajrayudu@gmail.com',
        subject:'welcome to task-app',
        text:`welcome to the app, ${name}. Let me know how you get along with the app`
    })
}

const sendDeleteEmails=( email,name)=>{
    sgMail.send({
        to: email,
        from:'surajrayudu@gmail.com',
        subject:'One last mail from task-app',
        text:`sorry , ${name}. Let me what made you delete account from  the app`
    })
}

module.exports={
    sendWelcomeEmails,
    sendDeleteEmails
}