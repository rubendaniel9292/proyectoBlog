
console.log('app de node arrancada');
import connection from "./database/connection";
import express from 'express';
import cors from 'cors';

connection();
//servidor de node
const app = express();
const port = 3900;
//configuracion de cors para middelwere para ejecutarse antes de cualquier ruta

app.use(cors());
//convertir body a objeto js ejecutando un diddelwere 
app.use(express.json());

//RUTAS
//definir ruta
import ruotesArticle from './routes/Articles.Rutes';
//cargar ruta
app.use('/api', ruotesArticle);


//crear rutas de pruebas
app.get('/probando', (req, res) => {
    console.log('Se ha ejecutado el endpoint probando');
    return res.status(200).send(
        //la api devuelve dentro del calback un onbjeto json
        [{
            curso:'master en react',
            autor:'Daniel Rivas Web',
            url:''
        }]

    ); 
});

app.get('/', (req, res) => {
    console.log('Se ha ejecutado el endpoint probando');
    return res.status(200).send(
        //la api devuelvedentro elementos html
        '<H1>Probando ruta de Node.js</H1>'
        //'<H1>Probando ruta de Node.js</H1>'
    ); //codigo http 200 de exitoso
});
//crear el servidor y escuchar peticiones HTTP
app.listen(port, () => {
    console.log(`Servidor corriendo correctamente en el puerto ${port}`);
});



