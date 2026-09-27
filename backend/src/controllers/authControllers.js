import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
    try {
        const { name, email, password } = req.body;

        // 1. Check whether all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // 2. Check whether the email is already registered
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered",
            });
        }

        // 3. Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // 4. Create the user
        const user = await User.create({
            name,
            email,
            passwordHash,
        });

        // 5. Send response
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error in signup controller:", error);

        res.status(500).json({
            message: "Internal server error",
        });
    }
}
export async function login(req, res) {
    try {
        const { email, password } = req.body;

        // 1. Check whether email and password were provided
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        // 2. Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // 3. Compare entered password with stored password hash
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
                const token = jwt.sign(
    {
        userId: user._id,
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d",
    }
);
        // 4. Login successful
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error in login controller:", error);

        res.status(500).json({
            message: "Internal server error",
        });
    }
}