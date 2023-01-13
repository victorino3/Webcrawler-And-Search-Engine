//mackdb db name
import mongoose from 'mongoose';
import dotenv from "dotenv"
dotenv.config({ path: 'dotenv/.env.prod' })
dotenv.config({ encoding: 'latin1' })
export function connected() {
    mongoose.connect(process.env.ULR_MONGODB, {
        useNewUrlParser: true
    }, function (error) {
        if (!error)
            return;
        console.log('Falha na conexão!', error);
    });
    const connection = mongoose.connection;

    connection.once('open', () => console.log('database rodando!!'));

    return connection;
}






