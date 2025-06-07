import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

export async function registerUser({ name, email, password }) {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('Email already in use');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const { password: _, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
}

export async function loginUser({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    const { password: _, ...userWithoutPassword } = user.toObject();
    return { token, user: userWithoutPassword };
}
