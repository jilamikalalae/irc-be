import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb"; // or Prisma/Postgres etc.
import { MongoClient } from "mongodb";
 
const client = new MongoClient("mongodb+srv://irc:wZQy0hOFFW8vP4qo@cluster0.entmv3v.mongodb.net/irc");
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  databaseHooks: {
    user: {
      create: {
        // After a new user is created in Better Auth
        after: async (user) => {
          // Sync with your NestJS/Mongoose User collection
          await db.collection("users").insertOne({
            email: user.email,
            username: user.email.split("@")[0],
            fullName: user.name ?? "",
            role: "user",
            created_at: new Date(),
            updated_at: new Date(),
          });
        },
      },
    },
    // If you’d like to track last login:
    session: {
      create: {
        after: async (session) => {
          // find user and update lastLogin
          await db.collection("users").updateOne(
            { id: session.userId },
            { $set: { lastLogin: new Date() } }
          );
        },
      },
    },
  },
});
