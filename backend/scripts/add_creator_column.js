import pool from "../src/database.js";

const migrate = async () => {
    try {
        console.log("Adding created_by column to events table...");

        // Check if column exists
        const [columns] = await pool.query("SHOW COLUMNS FROM events LIKE 'created_by'");

        if (columns.length === 0) {
            await pool.query("ALTER TABLE events ADD COLUMN created_by INT DEFAULT NULL");
            console.log("Column 'created_by' added.");
        } else {
            console.log("Column 'created_by' already exists.");
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

migrate();
