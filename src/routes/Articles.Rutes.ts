/*RUTAS DEFINIDAS */
import express from 'express';
import multer from 'multer';

//cargar el controlador
import { image, prueba, curso, save, getArticle, getArticleSort, uno, deleteArticle, upDate, uplodadImg, searcher } from '../controller/Articles.Controler';
const router = express.Router();
//rutas de pruebas
router.get('/ruta-de-prueba', prueba);
//ruta del curso con objeto
router.get('/curso', curso);

//ruta para crear y guardar en la bd
router.post('/crear', save);

//ruta para  conseguir todos los articulos o los ordenados, dependinedo del metodo escogido del controlador y con parametros contador no obligator
router.get('/articulos/:ultimos?', getArticleSort);

//ruta para  conseguir todos los articulos
router.get('/articulos', getArticle);

//ruta para  conseguir un solo articulo con parametro id obligatorio
router.get('/articulo/:id', uno);

//ruta para eleiminar un articulo
router.delete('/articulo/:id', deleteArticle);

//ruta para actualizar el articulo
router.put('/articulo/:id', upDate);

//ruta para actualizar el articulo con imagen
const storage = multer.diskStorage({
    //La carpeta donde se guardó el archivo, cb: el directorio del archivo 
    destination: function (req, file, cb) {
        cb(null, process.cwd() +'/dist/img/articles');
    },
    //El nombre del archivo en destination, 
    filename: function (req, file, cb) {
        cb(null, 'articulo' + '-' +   file.fieldname +Date.now() + file.originalname )
        //cb(null, file.fieldname  + '-' + Date.now() + file.originalname)//manera de la documetnacion
    }
});

//midelwere que se aplicara a la ruta y se ejecuta antes de la accion del controlador
const upload = multer({ storage: storage });


router.post('/subir-img/:id', upload.single('file'), uplodadImg);//aplicando midelwere. ya sea como array o no dependiendo de la cantidad de archivos

//ruta para  conseguir una imagen en concreto
router.get('/imagen/:fichero', image);

//ruta para realziar busqueda
router.get('/buscar/:busqueda', searcher);
export default router;


