var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gadiyakanishk5@gmail.com',
    pass: process.env.mail_password
  }
});


export async function Send(CustomerEmail: string,UserEmail: string, Name: string, Description: string,Id:string,Value:string){console.log("sending mail") 

var mailOptions = {
  from: UserEmail,
  to: CustomerEmail,
  subject: 'Sending Email using Node.js',
  html: `<div><h1>New Invoice</h1>
  <a href="http://localhost:3000/invoice/dashboard/${Id}">
  <button style={{ backgroundColor: "blue", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }} >
  Veiw Invoice
</button></a></div>`
};

await transporter.sendMail(mailOptions, function(error:any, info:any){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});}