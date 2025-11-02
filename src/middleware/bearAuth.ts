import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';


dotenv.config();

// middleware to check if the user is authenticated/logged in
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjgsInVzZXJfaWQiOjgsImZpcnN0X25hbWUiOiJ0ZXN0IiwibGFzdF9uYW1lIjoidGVzdCIsInJvbGUiOiJ1c2VyIiwiZXhwIjoxNzQ4NjgwNDkwLCJpYXQiOjE3NDg0MjEyOTB9.2h9x-JGOFkTHH_uF7nAU8q3tFiPrsIEDIi_dkhgW51o
    const token = authHeader?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET as string);
        // req.user = decode;
        (req as any).user = decode; // Type assertion to avoid TypeScript error
        next();

    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

// middleare for checking roles



// Main role-checking function
export const checkRoles = (requiredRole: "admin" | "user" | "both") => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const authHeader = req.headers.authorization;

        // Step 1: Check if Authorization header exists and has Bearer token
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        // Step 2: Extract the token
        const token = authHeader.split(' ')[1];

        try {
            // Step 3: Verify and decode the JWT token
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  
            // Step 4: Attach user info to request for later use
            (req as any).user = decoded;

            // Step 5: Role validation - ensure token has role property
            if (typeof decoded === 'object' &&
                decoded !== null && 
                "role" in decoded
            ) {
                // Step 6: Check role permissions
                if (requiredRole === "both") {
                    // Allow both admin and user roles
                    if (decoded.role === "admin" || decoded.role === "user") {
                        next(); // Access granted
                        return;
                    }
                } else if (decoded.role === requiredRole) {
                    // Role matches exactly what's required
                    next(); // Access granted
                    return;
                }
  
                // Wrong role
                res.status(401).json({ message: "Unauthorized" });
                return;
            } else {
                // Token doesn't have proper role information
                res.status(401).json({ message: "Invalid Token Payload" });
                return;
            }
        } catch (error) {
            // Token is invalid or expired
            res.status(401).json({ message: 'Invalid Token' });
            return;
        }
    }
}

// Pre-configured middleware for common use cases
export const adminOnly = checkRoles("admin");   // Only admins allowed
export const userOnly = checkRoles("user");     // Only regular users allowed  
export const adminUser = checkRoles("both");    // Both admins and users allowed