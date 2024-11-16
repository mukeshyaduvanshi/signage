import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

let client;
let clientPromise = client;

if (!process.env.MONGODB_URI) {
    throw new Error('Added Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;

// Add this new function to get the database connection
export async function getDatabase() {
    try {
        const client = await clientPromise;
        return client.db();
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        throw error;
    }
}
