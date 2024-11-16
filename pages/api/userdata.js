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
            // checking if login credentials are valid
            const loggedInUser = await db.collection('regUsers').findOne({
                _id: new ObjectId(bodyObject.userId),
            });

            // conditioanlly sending response to the frontend
            loggedInUser ?
                (res.status(200).json({ data: { loggedInUser } }))
                :
                (res.status(401).json({ message: "Invalid email" + bodyObject.userId }))
            console.log(bodyObject.userId + loggedInUser.name);

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
