// const registrationSchema = {

//     firstName: {
//         custom: {
//             options: value => {
//                 console.log("inside validator firstName", value )

//                 return User.find({
//                     firstName: value,
//                     minLength: 8,
//                 }).then(user => {
//                     if (user.length > 0) {
//                         return Promise.reject('Username already in use')
//                     }
//                 })
//             }
//         }
//     },

//     lastName: {
//         custom: {
//             options: value => {
//                 return User.find({
//                     lastName: value
//                 }).then(user => {
//                     if (user.length > 0) {
//                         return Promise.reject('Username already in use')
//                     }
//                 })
//             }
//         }
//     },
//     // gender: {
//     //     notEmpty: true,
//     //     errorMessage: "Gender field cannot be empty"
//     // },
//     password: {
//         isStrongPassword: {
//             minLength: 6,
//             minLowercase: 1,
//             minUppercase: 1,
//             minNumbers: 1
//         },
//         errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number",
//     },


//     confirmPassword: {
//         isStrongPassword: {
//             minLength: 6,
//             minLowercase: 1,
//             minUppercase: 1,
//             minNumbers: 1
//         },
//         errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number",
//     },
//     // phone: {
//     //     notEmpty: true,
//     //     errorMessage: "Phone number cannot be empty"
//     // },
//     emailId: {
//         normalizeEmail: true,
//         custom: {
//             options: value => {
//                 return User.find({
//                     emailId: value
//                 }).then(user => {
//                     if (user.length > 0) {
//                         return Promise.reject('Email address already taken')
//                     }
//                 })
//             }
//         }
//     }
// }
// module.exports = {
//     //collection: collection,
//     registrationSchema: registrationSchema,
// };


const {
    check
} = require('express-validator');


class vallidation {

    name(name) {
         check(name)
            .isLength({
                min: 3
            })
            .withMessage('must be at least 5 chars long')
            .matches(/\d/)
            .withMessage('must contain a number');

    }

    password(password) {
        return check(password)
            .isLength({
                min: 6
            })
            .withMessage('must be at least 5 chars long')
            .matches(/\d/)
            .withMessage('must contain a number');
    }


    emailId(userData) {
        return check(userData.emailId)
            .isLength({
                min: 6
            })
            .withMessage('must be at least 5 chars long')
            .matches(/\d/)
            .withMessage('must contain a number');

    }
    // .custom(value => {
    //     return User.findByEmail(value).then(user => {
    //       if (user) {
    //         return Promise.reject('E-mail already in use');
    //       }
    //     });

    registerValidation = (userData) => {
       const firstName = this.name(userData.firstName)
   
          const  lastName = this.name(userData.lastName)
     
          const  emailId = this.emailId(userData)
          const  password = this.password(userData.password)
          const  confirmPassword = this.password(userData.confirmPassword)
    }

}

module.exports = new vallidation();