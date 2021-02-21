import mongoose from 'mongoose';

export async function ensureMongooseIsConnected() {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/test';

    if (mongoose.connection.readyState === 0) {
        try {
            await mongoose.connect(MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('ensureMongooseIsConnected(): Connected to db');
        } catch (error) {
            console.error(
                'Error: ensureMongooseIsConnected(): ' + error.message
            );
        }
    }
}
