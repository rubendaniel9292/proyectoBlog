/*RUTAS DEFINIDAS */
import express from 'express';
const router = express.Router();
//cargar el controlador
import { prueba, curso, save } from '../controller/Articles.Controler';

//rutas de pruebas
router.get('/ruta-de-prueba', prueba);
//ruta del curso
router.get('/curso', curso);

//ruta para crear y guardar en la bd
router.post('/crear', save);
export default router;