import mongoose from 'mongoose';

const MONGODB_URI=process.env.MONGODB_URI;

export async function connectToBD() {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log('Mongodb connected')
    } catch (error) {
        console.log("Hubo un error")
        console.error(error)
    }
}