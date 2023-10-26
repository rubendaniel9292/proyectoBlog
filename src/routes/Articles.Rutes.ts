/*RUTAS DEFINIDAS */
import express from 'express';
const router = express.Router();
//cargar el controlador
import { prueba, curso, save, getArticle, getArticleSrot, uno } from '../controller/Articles.Controler';

//rutas de pruebas
router.get('/ruta-de-prueba', prueba);
//ruta del curso con objeto
router.get('/curso', curso);

//ruta para crear y guardar en la bd
router.post('/crear', save);

//ruta para  conseguir todos los articulos o los ordenados, dependinedo del metodo escogido del controlador y con parametros contador no obligator
router.get('/articulos/:ultimos?', getArticleSrot);

//ruta para  conseguir todos los articulos
router.get('/articulos/:ultimos?', getArticle);

//ruta para  conseguir un solo articulo con parametro id obligatorio
router.get('/articulo/:id', uno);
export default router;



