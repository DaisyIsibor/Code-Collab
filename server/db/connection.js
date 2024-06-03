// This page is for setting up the connection/db name

import { MongoClient, ServerApiVersion } from "mongodb";

// Atlas uri from the env
const URI = process.env.ATLAS_URI || "";
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Code Collab database is now up and running!");
} catch (err) {
  console.error(err);
}

let db = client.db("users");

export default db;