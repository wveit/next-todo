import mongoose from 'mongoose';

export async function ensureMongooseIsConnected() {
    const MONGO_URI = process.env.MONGO_URI;

    if (mongoose.connection.readyState === 0) {
        try {
            await mongoose.connect(MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            });
            console.log('ensureMongooseIsConnected(): Connected to db');
        } catch (error) {
            console.error(
                'Error: ensureMongooseIsConnected(): ' + error.message
            );
        }
    }
}
