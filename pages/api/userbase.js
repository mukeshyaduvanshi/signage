// allusers.js

import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongoDB.js';

export default async function handler(req, res) {
    // Connect to the MongoDB database
    const client = await clientPromise;
    const db = client.db('ssdb');
    // Handle different HTTP methods
    switch (req.method) {
        // case 'GET':
        //     let bodyObjectuser = req.body;
        //     const regUsers = await db.collection('regUsers').find({}).toArray();
        //     // const regUser = await db.collection('regUsers').findOne({ name: bodyObjectuser })
        //     // console.log(bodyObjectuser);

        //     res.json(regUser);
        //     break;
        case 'POST':
            // getting data request from frontend
            let bodyObject = req.body;
            // checking if email already exists
            const existingUser = await db.collection('regUsers').findOne({ email: bodyObject.email });
            // Adding timestamp for new documents
            bodyObject.timestamp = new Date()
            // declaring newRegUser
            let newRegUser
            // conditioanlly sending response to the frontend
            existingUser ?
                //if the user already exists in the database we simply return the message about that and the path to the login page
                (res.status(201).json({ message: "User email " + bodyObject.email + " belongs to " + existingUser.name + " if you are " + existingUser.name + ", please login with correct credentials or recover your password", path: "/auth/cover-login" }))
                :
                (
                    //if the user does not exist in the database we insert the new user with the timestamp
                    newRegUser = await db.collection('regUsers').insertOne(bodyObject, { timestamp: bodyObject.timestamp }),
                    //and return the message about that to the frontend and also send the path to redirect the user to dashboard page, here we also send data of the new user _id to the frontend to update localstorage for the users login process
                    (res.status(200).json({ message: `Welcome ` + bodyObject.name + ` to Sawhney Signage, Your account has been created successfully`, data: newRegUser.insertedId, path: "/" }))
                )
            // return res.json(newRegUser, existingUser)
            break
        case 'PUT':
            let updateObject = req.body;
            console.log(updateObject);
            const result = await db.collection(`regUsers`).findOneAndUpdate(
                { _id: new ObjectId(updateObject.userId) },
                {
                    $set: {
                        ...updateObject.data,
                        // timestamp: new Date() // Add timestamp for updates
                    },
                },
                { returnDocument: 'after' } // Move this option inside the findOneAndUpdate method
            );

            res.json(result.value);
            break;
    }
}
