const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const about_pages = require("./about-pages.json");
const sgMail = require('@sendgrid/mail')

require('dotenv').config()

const app = express();

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("home");
});

app.post("/", function(req, res) {
  var email_submit = req.body.emailAddress;
  var email_body = req.body.contactReason

  console.log(email_body + " and " + email_submit)
const msg = {
  to: 'kyle.chesnick@colorad-designs.com', // Change to your recipient
  from: 'customerconnect@colorad-designs.com', // Change to your verified sender
  subject: 'testing email with body',
  text: email_submit + " " + email_body,
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })

  res.render("home");
});

app.get("/seo", function(req, res) {
  res.render("seo", {data: about_pages['SEO']});
});

app.get("/faster", function(req, res) {
  res.render("seo", {data: about_pages['Load Speed']});
});

app.get("/mobilefriend", function(req, res) {
  res.render("seo", {data: about_pages['Mobile Friendly']});
});

let port = process.env.Port;
if ( port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server is running on port 3000");
})
