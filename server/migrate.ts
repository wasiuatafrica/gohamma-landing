import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import 'dotenv/config'; // Make sure environment variables are loaded

async function runMigrations() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is required for migration");
  }

  console.log("Starting database migration...");

  // Use a separate client for migrations
  const migrationClient = postgres(process.env.DATABASE_URL, { max: 1 });
  const db = drizzle(migrationClient);

  try {
    await migrate(db, { migrationsFolder: './migrations' });
    console.log("Migrations applied successfully!");
  } catch (error) {
    console.error("Error applying migrations:", error);
    process.exit(1); // Exit with error code
  } finally {
    await migrationClient.end(); // Ensure the connection is closed
    console.log("Migration client connection closed.");
  }
}

runMigrations();
