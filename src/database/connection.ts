import mongoose from 'mongoose';
const connection = async () => {
    console.log('1: Inicio de proceso de conexion');
    try {
        console.log('2: Intentando realizar la conexion dentro del try');
        await mongoose.connect('mongodb://127.0.0.1:27017/mi_blog');
        //parametros dentro del objeto por si da algun fallo o algun warning
        /* useNewUrlParser: true
            useUnifiedToplogy: true
            useCreateIndex: true
        */
        console.log('3: conexion a base de datos exitosa');
    } catch (error) {
        console.error(error);
        throw new Error('3: ¡No se ha podido conectar a la base de datos!...');
    }
};

export default connection;
