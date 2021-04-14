// // // const registrationSchema = {

// // //     firstName: {
// // //         custom: {
// // //             options: value => {
// // //                 console.log("inside validator firstName", value )

// // //                 return User.find({
// // //                     firstName: value,
// // //                     minLength: 8,
// // //                 }).then(user => {
// // //                     if (user.length > 0) {
// // //                         return Promise.reject('Username already in use')
// // //                     }
// // //                 })
// // //             }
// // //         }
// // //     },

// // //     lastName: {
// // //         custom: {
// // //             options: value => {
// // //                 return User.find({
// // //                     lastName: value
// // //                 }).then(user => {
// // //                     if (user.length > 0) {
// // //                         return Promise.reject('Username already in use')
// // //                     }
// // //                 })
// // //             }
// // //         }
// // //     },
// // //     // gender: {
// // //     //     notEmpty: true,
// // //     //     errorMessage: "Gender field cannot be empty"
// // //     // },
// // //     password: {
// // //         isStrongPassword: {
// // //             minLength: 6,
// // //             minLowercase: 1,
// // //             minUppercase: 1,
// // //             minNumbers: 1
// // //         },
// // //         errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number",
// // //     },


// // //     confirmPassword: {
// // //         isStrongPassword: {
// // //             minLength: 6,
// // //             minLowercase: 1,
// // //             minUppercase: 1,
// // //             minNumbers: 1
// // //         },
// // //         errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number",
// // //     },
// // //     // phone: {
// // //     //     notEmpty: true,
// // //     //     errorMessage: "Phone number cannot be empty"
// // //     // },
// // //     emailId: {
// // //         normalizeEmail: true,
// // //         custom: {
// // //             options: value => {
// // //                 return User.find({
// // //                     emailId: value
// // //                 }).then(user => {
// // //                     if (user.length > 0) {
// // //                         return Promise.reject('Email address already taken')
// // //                     }
// // //                 })
// // //             }
// // //         }
// // //     }
// // // }
// // // module.exports = {
// // //     //collection: collection,
// // //     registrationSchema: registrationSchema,
// // // };


// // const {
// //     check
// // } = require('express-validator');


// // class Vallidation {

// //     name(name) {
// //          check(name)
// //             .isLength({
// //                 min: 3
// //             })
// //             .withMessage('must be at least 5 chars long')
// //             .matches(/\d/)
// //             .withMessage('must contain a number');

// //     }

// //     password(password) {
// //         return check(password)
// //             .isLength({
// //                 min: 6
// //             })
// //             .withMessage('must be at least 5 chars long')
// //             .matches(/\d/)
// //             .withMessage('must contain a number');
// //     }


// //     emailId(userData) {
// //         return check(userData.emailId)
// //             .isLength({
// //                 min: 6
// //             })
// //             .withMessage('must be at least 5 chars long')
// //             .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
// //             .withMessage('must contain a number');

// //     }
// //     // .custom(value => {
// //     //     return User.findByEmail(value).then(user => {
// //     //       if (user) {
// //     //         return Promise.reject('E-mail already in use');
// //     //       }
// //     //     });

// //     registerValidation = (userData) => {
// //        const firstName = this.name(userData.firstName)

// //           const  lastName = this.name(userData.lastName)

// //           const  emailId = this.emailId(userData)
// //           const  password = this.password(userData.password)
// //           const  confirmPassword = this.password(userData.confirmPassword)
// //     }

// // }

// // module.exports = new Vallidation();


// // const {
// //   body
// // } = require('express-validator/check')
// //class Vallidation {

//   const { check, validationResult } = require('express-validator')
//   exports.checkVallidation = (req, next) => {
//     req
//       .getValidationResult() // to get the result of above validate fn
//       .then(validationHandler())
//       .then(next())
//       //  const { userName, email, phone, status } = req.body

//       //  User.create({
//       //    userName,
//       //    email,
//       //    phone,
//       //    status,   
//       //  })
//       //  .then(user => res.json(user))
//       //})
//       .catch(next)
//   }

//   exports.validate = (method) => {
//     console.log("method", method)
//     switch (method) {
//       case 'createUser': {
//         return [
//           check('firstName').exists().isLength({
//             min: 3
//           }),
//           check('lastName').exists().isLength({
//             min: 3
//           }),
//           check('email').exists().isEmail(),
//           check('password').isLength({
//             min: 6
//           })
//         ]
//       }

//       // case 'login': {
//       //     return [ 
//       //        body('email', 'Invalid email').exists().isEmail(),
//       //        body('password').optional().isInt(),

//       //       ]   
//       //    }
//     }
//   }

//   // exports.validate = (method) => {
//   //   console.log("method", method)
//   //   switch (method) {
//   //     case 'createUser': {
//   //       return [
//   //         body('firstName', 'userName doesnt exists').exists().isLength({
//   //           min: 3
//   //         }),
//   //         body('lastName', 'userName doesnt exists').exists().isLength({
//   //           min: 3
//   //         }),
//   //         body('email', 'Invalid email').exists().isEmail(),
//   //         body('password').isLength({
//   //           min: 6
//   //         })
//   //       ]
//   //     }

//   //     // case 'login': {
//   //     //     return [ 
//   //     //        body('email', 'Invalid email').exists().isEmail(),
//   //     //        body('password').optional().isInt(),

//   //     //       ]   
//   //     //    }
//   //   }
//   // }
// // }
// // module.exports = new Vallidation();




const {
  body,
  validationResult
} = require('express-validator')





const userValidationRules = () => {
  return [

    body('firstName').notEmpty().isLength({
      min: 3
    }),
    body('lastName').notEmpty().isLength({
      min: 3
    }),
    // username must be an email
    body('emailId').isEmail().exists().withMessage('must be at least 5 chars long')
               .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
                 .withMessage('must contain a number'),
  //password must be at least 5 chars long
    body('password').isLength({
      min: 6
    }),
  ]
}

const bookValidationRules = () => {
  return [

    body('author').exists().notEmpty().isLength({
      min: 3
    }),
    body('title').exists().notEmpty().isLength({
      min: 3
    }),
    body('description').exists().notEmpty().isLength({
      min: 3
    }),
    body('price').exists().notEmpty().isNumeric().isLength({
      min: 1
    }),
    body('quantity').exists().notEmpty().isNumeric().isLength({
      min: 1
    }),
    body('image').exists().notEmpty().isString().isLength({
      min: 6
    }),
  ]
}





const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({
    [err.param]: err.msg
  }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  bookValidationRules,
  validate,
}