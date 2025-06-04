import { validationResult } from 'express-validator';

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
