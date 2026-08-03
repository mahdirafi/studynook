import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("Studynook");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
     
    client
  }),
   //...other options
  emailAndPassword: { 
    enabled: true, 
  }, 
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENTID, 
            clientSecret: process.env.GOOGLE_SECRET, 
        }, 
    },
    session : {
      cookieCache : {
        enabled: true,
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60 //7 days in seconds
      }
    },
    plugins: [
      jwt()
    ]

   
});