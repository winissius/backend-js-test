import { MongoClient } from 'mongodb';

export default async function connectDB(stringConexao) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(stringConexao);
        console.log('Connecting with db ... ');
        await mongoClient.connect();
        console.log('Sucess conected with DB!');

        return mongoClient;
    } catch (erro) {
        console.error('Error to connect with DB!', erro);
        process.exit();
    }
}