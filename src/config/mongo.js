import mongoose from 'mongoose';

export async function connectMongo() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error('Falta MONGO_URI en variables de entorno');
  }

  await mongoose.connect(mongoUri);
}
