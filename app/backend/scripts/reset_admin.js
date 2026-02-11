import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables from .env file in parent directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const resetAdmin = async () => {
    let connection;
    try {
        console.log("Connecting to database...");
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "",
            database: process.env.DB_NAME || "fullstack_db",
        });

        const email = "admin@example.com";
        const password = "admin123";
        const hashedPassword = await bcrypt.hash(password, 10);

        const [rows] = await connection.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (rows.length > 0) {
            console.log("Admin user exists. Updating password...");
            await connection.execute(
                "UPDATE users SET password = ?, role = 'ADMIN' WHERE email = ?",
                [hashedPassword, email]
            );
            console.log("Admin updated successfully.");
        } else {
            console.log("Admin user does not exist. Creating...");
            await connection.execute(
                "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
                ["Admin", email, hashedPassword, "ADMIN"]
            );
            console.log("Admin created successfully.");
        }

        console.log("\nLogin Credentials:");
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
    } catch (error) {
        console.error("Error resetting admin:", error);
    } finally {
        if (connection) await connection.end();
    }
};

resetAdmin();
