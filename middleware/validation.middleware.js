import { body, validationResult } from 'express-validator';

export const registerValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

export const loginValidator = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
];

export const addToCartValidator = [
    body("gameId").notEmpty().withMessage("Please Select Game"),
    body("quantity").isInt({ gt: 0 }).withMessage("Quantity Cannot be Less than 1")
];

export const updateCartItemValidator = [
    body("quantity").isInt({ gt: 0 }).withMessage("Quantity Cannot be Less than 1")
];

export const categoryValidator = [
    body("name").notEmpty().withMessage("Category Name Cannot be Empty!")
];

export function validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extracted = errors.array().map(err => ({
            field: err.param,
            message: err.msg
        }));
        return res.status(400).json({ errors: extracted });
    }
    next();
}