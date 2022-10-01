const express = require('express');
var router = express.Router();
const User = require("../model/User");



router.post('/register', (req, res, next) => {
	let personInfo = req.body;

	if (!personInfo.email || !personInfo.pwd || !personInfo.passwordConf || !personInfo.firstName || !personInfo.lastName || !personInfo.mobile) {
		res.send();
	} else {
		if (personInfo.pwd !== personInfo.passwordConf) {

			User.findOne({ email: personInfo.email }, (err, data) => {
				if (!data) {
					User.findOne({}, (err, data) => {

						let newPerson = new User({
							email: personInfo.email,
							pwd: personInfo.pwd,
							firstName: personInfo.firstName,
              lastName: personInfo.lastName,
              mobile: personInfo.mobile
						});

						newPerson.save((err, Person) => {
							if (err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({ _id: -1 }).limit(1);
					res.send({ "Success": "You are regestered,You can login now." });
				} else {
					res.send({ "Success": "Email is already used." });
				}

			});
		} else {
			res.send({ "Success": "password is not matched" });
		}
	}
});



// router.post("/insert", async (req, res) => {
//     // Create a new user
//     try {
//       const { firstName, lastName, pwd, email, mobile } = req.body;
  
//       const user = new User({
//         firstName,
//         lastName,
//         pwd,
//         email,
//         mobile,
//       });
//       await user.save();
//       const token = await user.generateAuthToken();
//       const response = {
//         email: user.email,
//         mobile: user.mobile,
//         token: token,
//       };
//       res.send({
//         status: 1,
//         message: "User registered successfully.",
//         data: response,
//       });
//     } catch (error) {
//     //   if (error.message.includes("duplicate key")) {
//     //     if (error.message.includes("email:")) {
//     //       res.send({ status: 0, message: "email already exists.", data: "" });
//     //     } else {
//     //       res.send({
//     //         status: 0,
//     //         message: "User for selected employee already exists.",
//     //         data: "",
//     //       });
//     //     }
//     //   } else {
//     //     // res.send({ status: 0, message: "Something went wrong.", data: "" });
//     //   }
//     }
//   });

router.post("/login", async (req, res) => {
    try {
      const { email, pwd } = req.body;
      const user = await User.login(email, pwd);
    //   console.log(User, "akjsgfkjahf")
      if (!user) {
        return res.send({
          error: "Login failed! Check authentication credentials",
        });
      }
      const token = await user.generateAuthToken();
      const response = {
        email: user.email,
        first_name: user.first_name,
        role: user.role,
        email: user.email,
        mobile: user.mobile,
        token: token,
      };
      res.send({ status: 1, message: "Login successful.", data: response });
    } catch (error) {
      res.send({ status: 0, message: error.message, data: "" });
    }
  });


  router.post("/logout", async (req, res) => {
    // Log user out of the application
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token != req.token;
      });
      await req.user.save();
      res.send({ status: 1, message: "Logout successfully.", data: "" });
    } catch (error) {
      res.send({ status: 0, message: "Something went wrong.", data: "" });
    }
  });
  
  router.post("/getbyid",  async (req, res) => {
    try {
        const {id} = req.body;
        const user = await User.findOne({_id:id})
      res.send({
        status: 1,
        message: "Query executed successfully.",
        data: user,
      });
    } catch (error) {
      res.send({ status: 0, message: "Query execution error.", data: "" });
    }
  });



module.exports = router