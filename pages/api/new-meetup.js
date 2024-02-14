import { MongoClient } from "mongodb";

// API routes are a special routes, special pages, if you wanna call it like this
// which don't return HTML code, but which are instead about accepting incoming HTTP requests,
// also post patch, put delete requests, whatever you need with JSON data attached to them
// and which then might do whatever you need to do.

// Create API folder inside page (must be called API). Now in this API folder, you can then again
// add JavaScript files where the file names will act as path segments in the URL.

// /api/new-meetup
// POST /api/new-meetup would ensure that only post requests
// to this route would actually trigger this code in here.

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    // We created the database on MongoDB, we then npm i mongodb and import MongoClient at the top.
    // Then, MongoClient.connect and pass the connection string taken from the connection on mongodb website.
    // Make sure to replace username and password with your credentials inside the string.
    // MongoClient returns a promise, so await and async handler()

    const client = await MongoClient.connect(
      "mongodb+srv://robertoquadraccia90:KJ6YX6atbI8065Cz@cluster0.z8a93pe.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups"); // to create a collection inside the db
    // to insert one new document (object) into the collection. Await since it returns a promise
    const result = await meetupsCollection.insertOne(data);

    console.log(result);
    client.close(); // to close the db connection once we are done

    // Finally, we handle the response to send back, which has a status method,
    // which we can call on response to set a HTTP status code of the response which will be returned.
    // For example, a 201 status code to indicate that something was inserted successfully.
    // You can then .json() to prepare the JSON data that will be added to the outgoing response.
    // We could, for example, add a message key where we say'Meetup inserted!'
    res.status(201).json({ message: "Meetup inserted!" });
  }
};

export default handler;
