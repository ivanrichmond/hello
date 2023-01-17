//@flow
// External Modules
import express from 'express';

// Internal Modules
// var dbClient = require('./db.js');

// // Application Variables
// var app = express();
// var jsonParser = bodyParser.json();
// var port = 80;
// var transporter = null; // Email transporter obj.

// // Database
// dbClient.connect();

// // Middleware to check to see if password parameter matches the
// // main admin password in the DB that allows me
// // to actually save things but keeps others from 
// // doing so.
// // TO DO: Move this to its own module.
// var checkAdminPassword = function(request, response, next) {
//     console.log(passwordsCollection);
//     dbClient.passwords().find({
//         "name": "site"
//     }, {
//         "password": 1,
//         "_id": 0
//     }).toArray(function(error, document) {
//         if (error) {
//             sendStatus500(response);
//             return false;
//         } else {
//             sitePassword = document[0].password;
//         }
//         // If it doesn't match, exit.
//         if (request.params.password == sitePassword && request.params.password.length > 0) {
//             // Drop down to next function.
//             next();
//         } else {
//             sendStatus401(response);
//             return false;
//         }
//     });
// };

// // Email transporter.
// // I setup a special gmail account for this
// // site so I can use gmail's email 
// // services.
// // The reason why I have this as a function 
// // rather than just a variable is because 
// // asychronicity can often lead to the 
// // getPassword() function failing, because
// // the assignment can occur before DB 
// // connection is established.
// // This way, transporter is assigned when 
// // needed, and by that time, the DB connection
// // is ready.
// var getTransporter = function(password) {
//     if (!transporter) {
//         transporter = nodemailer.createTransport({
//             host: 'smtp.gmail.com',
//             port: 465,
//             secure: true, // use SSL 
//             auth: {
//                 user: 'ivanrichmond.com@gmail.com',
//                 pass: password
//             }
//         });
//     }
// }

// /*
//  * This function provides everything I need
//  * to send a very simple email via this site's
//  * Gmail account.
//  * At some point, I may add other options, such
//  * as attachments and the like, but this just
//  * means that anywhere in the app where I want 
//  * a very simple email, I can just call it
//  * without much fuss.
//  */
// var sendEmailViaGmail = function(to, subject, text, html) {
//     var mailOptions = {
//         to: to,
//         subject: subject,
//         text: text,
//         html: html
//     };

//     // Get gmail password from DB.
//     // TO DO: Can I refactor this further?
//     // It would be nice to decouple getting
//     // the PW from creating the transporter,
//     // but MongoDB functions use callbacks.
//     // So, making the transporter seems 
//     // dependent on getting the password.
//     // 
//     // Is there some way I can revamp this
//     // by writing middlewares?  I mean,
//     // could I get the password as a middleware
//     // and then get the transporter as
//     // a middleware and send the email
//     // as a middleware?
//     var gmailPassword = null;
//     dbClient.passwords().findOne({
//         "name": 'gmail'
//     }, function(error, document) {
//         if (error) {
//             sendStatus500(response);
//             return false;
//         } else {
//             gmailPassword = document.password;
//             // Create transporter object.
//             getTransporter(gmailPassword);
//             // Send email using transporter.
//             transporter.sendMail(mailOptions, function(error, info) {
//                 if (error) {
//                     return console.log(error);
//                 }
//                 console.log('Message sent: ' + info.response);
//             });
//         }
//     });
// }

// // HTTP
// // TO DO: 
// // 1. Change sendFile to put up in JSON mime format.
// // 2. Consider refactoring all my routes that 
// // use resources.json to one that looks for
// // whatever the current dirs are and gets 
// // the resource.json appropriate to it.
// // PRO: Follows DRY principle.
// // CON: We could end up looking for files that
// // aren't there.
// app.use(express.static(__dirname + "/../client/"));
// app.route('/site-data')
//     .get(function(request, response) {
//         response.sendFile(__dirname + "/json/globals.json");
//     });
// app.route('/nav-data')
//     .get(function(request, response) {
//         response.sendFile(__dirname + "/json/site.json");
//     });
// app.route('/home-data')
//     .get(function(request, response) {
//         response.sendFile(__dirname + "/views/pages/home/resources.json");
//     });
// app.route('/about-data')
//     .get(function(request, response) {
//         response.sendFile(__dirname + "/views/pages/about/resources.json");
//     });
// app.route('/silence-and-noise-data')
//     .get(function(request, response) {
//         response.sendFile(__dirname + "/views/pages/silence-and-noise/resources.json");
//     });
// app.route('/is-it-a-cult-data')
//     .get(function(request, response) {
//         response.sendFile(__dirname + "/views/pages/is-it-a-cult/resources.json");
//     });
// app.route('/interests/recent-books-data')
//     .get(function(request, response) {
//         response.sendFile(__dirname + "/views/pages/interests/recent-books/resources.json");
//     });
// app.route('/interests/cultural-history-data')
//     .get(function(request, response) {
//         response.sendFile(__dirname + "/views/pages/interests/cultural-history/resources.json");
//     });
// app.route('/interests/science-fiction-data')
//     .get(function(request, response) {
//         response.sendFile(__dirname + "/views/pages/interests/science-fiction/resources.json");
//     });
// app.route('/interests/period-dancing-data')
//     .get(function(request, response) {
//         response.sendFile(__dirname + "/views/pages/interests/period-dancing/resources.json");
//     });
// app.route('/how-tos/setup-sublime-data')
//     .get(function(request, response) {
//         response.sendFile(__dirname + "/views/pages/how-tos/setup-sublime/resources.json");
//     });
// app.route('/how-tos/setup-grunt-data')
//     .get(function(request, response) {
//         response.sendFile(__dirname + "/views/pages/how-tos/setup-grunt/resources.json");
//     });
// app.route('/source-code-data')
//     .get(function(request, response) {
//         response.sendFile(__dirname + "/views/pages/source-code/resources.json");
//     });
// app.route('/contact-data')
//     .get(function(request, response) {
//         response.sendFile(__dirname + "/views/pages/contact/resources.json");
//     })
//     .post(jsonParser, function(request, response) {
//         // Email me
//         // 
//         // This is the clever way I filter 
//         // recruiters.  If recruiters admit
//         // that they want personal information
//         // from me, it will flag it as a warning!
//         // 
//         // NOTE: Since users can download the 
//         // entire source code, they could dig
//         // in here, find my email address
//         // and email me.  But, most recruiters
//         // probably aren't that technical or
//         // willing to put in that much effort.
//         // So, is this great security if I 
//         // wanted to hide my email address?
//         // No!  But, it's probably good enough
//         // to filter recruiters.
//         // 
//         // NOTE ALSO: I'm just using the post
//         // of contact-data for this, because
//         // I only have one form here and it 
//         // seems logical that the contact form
//         // is the default of what's posted
//         // in post-data, but if things get 
//         // any more complex, I may want to 
//         // put it in /contact-form or something.
//         var message = request.body;
//         var myEddress = 'irichmond@yahoo.com';
//         var subject = 'MY SITE: ' + message.type;
//         var text = "A " + message.type +
//             " by the name of " + message.name +
//             " filled out my contact form.\n\nEmail: " + message.email + "\nPhone: " + message.phone + "\nCompany:" + message.company;
//         // End of text
//         var html = "A " + message.type +
//             " by the name of " + message.name +
//             " filled out my contact form.<br><br>Email: " + message.email + "<br>Phone: " + message.phone + "<br>Company:" + message.company;
//         // End of html
//         if (message.type === 'recruiter') {
//             if (message.dobFull || message.dobPartial || message.ssn) {
//                 // The recruiter wants personal
//                 // information, so send warning.
//                 subject = 'MY SITE WARNING: ' + message.name;
//             }
//             text += "\nTheir Client: " + message.client + "\nRequire Full DOB: " + message.dobFull + "\nRequire Partial DOB: " + message.dobPartial + "\nRequire SSN: " + message.ssn;
//             html += "<br>Their Client: " + message.client + "<br>Require Full DOB: " + message.dobFull + "<br>Require Partial DOB: " + message.dobPartial + "<br>Require SSN: " + message.ssn;
//         }
//         text += "\n\nTheir message to me is\n\n" + message.message;
//         html += "<br><br>Their message to me is:<br><br>" + message.message;
//         sendEmailViaGmail(myEddress, subject, text, html);
//     });
// app.route('/todo-data')
//     .get(function(request, response) {
//         dbClient.todo().find().toArray(function(error, documents) {
//             // TO DO: 
//             // 1. Error handling.
//             // 2. Get it to give something more like JSON in DB.  That is, I shouldn't have to re-create
//             // the structure here.
//             var todo = documents.map(function(u) {
//                 return {
//                     name: u.name,
//                     description: u.description,
//                     _id: u._id
//                 };
//             });
//             response.json(todo);
//         });
//     });
// app.route('/todo-add/:password')
//     .post(jsonParser, checkAdminPassword,
//         function(request, response) {
//             // Password has been validate.  Proceed.
//             var newTodo = request.body;
//             var todoCollection = dbClient.todo();
//             todoCollection.insertOne(
//                 newTodo,
//                 function(error, result) {
//                     if (error) {
//                         return sendStatus500(response);
//                     }
//                     return sendStatus201(response);
//                 }
//             );
//         });
// app.route('/todo-delete/:name/:password')
//     .post(jsonParser, checkAdminPassword,
//         function(request, response) {
//             // Password has been validate.  Proceed.
//             var todoCollection = dbClient.todo();
//             todoCollection.remove({
//                     "name": request.params.name
//                 },
//                 function(error, result) {
//                     if (error) {
//                         return sendStatus500(response);
//                     }
//                     return sendStatus201(response);
//                 }
//             );
//         });
// app.route('/todo-update/:password')
//     .post(jsonParser, checkAdminPassword,
//         function(request, response) {
//             // Password has been validate.  Proceed.
//             var todoCollection = dbClient.todo();
//             var query = {
//                 "_id": new mongo.ObjectId(request.body._id)
//             };
//             var update = {
//                 "name": request.body.name,
//                 "description": request.body.description
//             };
//             todoCollection.update(query, update,
//                 function(error, result) {
//                     if (error) {
//                         return sendStatus500(response);
//                     }
//                     return sendStatus201(response);
//                 }
//             );
//         });
// // Status Code wrapper functions
// var sendStatus201 = function(response) {
//     console.log("SUCCESSFUL DB UPDATE.");
//     response.sendStatus(201); // Created
// };
// var sendStatus500 = function(response) {
//     console.log("UNKNOWN DB ERROR: Unable to save new to do list to DB.");
//     response.sendStatus(500); // Internal server error.
// };
// var sendStatus401 = function(response) {
//     console.log("UNAUTHORIZED.  Bad password passed for saving To Do list.");
//     response.sendStatus(401); // Unauthorized.
// };

// app.listen(port, function() {
//     console.log("Listening on port " + port + "...");
// });