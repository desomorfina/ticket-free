const mongoose = require('mongoose');

module.exports = async () => {
    if (!process.env.MONGO_URI) return;

    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado ao MongoDB.');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
    }
};