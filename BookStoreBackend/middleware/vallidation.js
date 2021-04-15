/**
 * @module       Middleware
 * @file         vallidation.js
 * @description  holds the vallidation methods calling from routes as middleware 
 * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
*  @since        05/04/2021  
-----------------------------------------------------------------------------------------------*/

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
    //password must be at least 6 chars long
    body('password').isLength({
      min: 6
    }),
  ]
}

const loginUserValidationRules = () => {
  return [
    // username must be an email
    body('emailId').isEmail().exists().withMessage('must be at least 5 chars long')
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    .withMessage('must contain a number'),
    //password must be at least 6 chars long
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
  loginUserValidationRules,
  validate,
}