/*RUTAS DEFINIDAS */
import express from 'express';
const router = express.Router();
//cargar el controlador
import {prueba, curso} from '../controller/Articles.Controler';

//rutas de pruebas
router.get('/ruta-de-prueba', prueba);

//ruta del curso
router.get('/curso', curso);
export default router;