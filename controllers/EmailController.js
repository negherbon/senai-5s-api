var nodemailer = require('nodemailer');

module.exports = class EmailController {
    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    sendEmail(token, user) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'suportesenai5s@gmail.com',
                pass: 'projetoconsolidado'
            }
        })

        var url = "http://localhost:8080/new-password.html?user=" + user.id + "&token=" + token;

        const mailOptions = {
            from: 'suportesenai5s@gmail.com',
            to: user.email, 
            subject: 'Subject test', 
            html: url
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
         });
    }

}