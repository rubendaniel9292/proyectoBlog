/*CONTROLADOR*/
import { Request, Response } from "express";
import { validation } from "../helper/validator";
import Articles from "../model/Articles";
import fs from 'fs';
import path from 'path';
//metodo para probar el controlador (puede comentarse o eliminarse)
export const prueba = (req: Request, res: Response) => {
    return res
        .status(200)
        .json({ message: "Accion de prueba del controlador exitosa" });
};
//metodo para probar el controlador con un objeto (puede comentarse o eliminarse)
export const curso = (req: Request, res: Response) => {
    console.log("Se ha ejecutado el endpoint probando");
    return res.status(200).send(
        //la api devuelve dentro del calback un onbjeto json
        [
            {
                curso: "master en react",
                autor: "Daniel Rivas Web",
                url: "",
            },
        ]
    );
};

//Metodo para crear y guarar el articulo
export const save = async (req: Request, res: Response) => {
    //2: valdiar los datos datos vacios y longitud
    try {
        //1: recoger los parametros por post a guardar
        let params = req.body;
        try {
            validation(params);
            console.log(params);
        } catch (error) {
            return res.status(400).json({
                status: "error",
                message: "Faltan datos por enviar",
            });
        }

        //3: Creando objeto a guardar en la bd
        //asignar valores a objetos al modelo (manual o automatico)
        //article.title = params.title;(manual, para pocos parametros)
        const article = new Articles(params); //de manera automatica, para muchos paramtos
        const articleSaved = await article.save();
        return res.status(200).json({
            status: "success",
            article: articleSaved,
            message: "Artículo guardado con éxito.",
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "No se ha guardado el artículo",
        });
    }
};

//metodo para conseguir el listado de todos articulos
export const getArticle = (req: Request, res: Response) => {
    let query = Articles;
    query.find({})
        .then((Articles: any) => {
            return res.status(200).send({
                status: "success",
                Articles,
            });
        })
        .catch((error: any) => {
            return res.status(404).json({
                status: "error",
                error,
                message: "No se han encontrado artículos",
            });
        });
};

//metodo para conseguir el listado ordeando de todos articulos con metodos de Mongoose con el campo deseado
export const getArticleSort = (req: Request, res: Response) => {

    let query = Articles.find({});

    if (req.params.ultimos) {
        //valida si el parametro existe y despues si es un numero
        const limit = parseInt(req.params.ultimos, 10);
        //lo convierte en base numérica de base 10 que es lo sugerido paa tener el nuero exacto y luego lo valida si es un numero o no
        if (!isNaN(limit)) {
            query.limit(limit);
        } else {
            return res.status(404).json({ error: `'El parámetro "${req.params.ultimos}" no es un número válido.'` });
        }
    }

    //parametro fecha: de mas antiguio a mas reciente con date:1
    //y de mas reciente a mas antiguio con date:-1
    query.sort({ date: -1 }).exec()
        .then((Articles: any) => {
            return res.status(200).send({
                status: "success",
                contador: Articles.length,
                Articles
            });
        })
        .catch((error: any) => {
            return res.status(404).json({
                status: "error",
                error,
                message: "No se han encontrado artículos",
            });
        });
};
//metodo para conseguir un solo articulo en la pagina del blog
export const uno = (req: Request, res: Response) => {
    //1: recoger id por la url, buscar el articulo con el metodo findById y sino existe devolver un error 
    let id = req.params.id;
    Articles.findById(id).exec().then((Articles: any) => {
        return res.status(200).json({
            status: "success",
            article: Articles
        })
    }).catch((error: any) => {
        return res.status(404).json({
            status: "error",
            error,
            message: `No se han encontrado el articulo con id ${id}`,
        });
    });
}

//metodo para eliminar articulos
export const deleteArticle = async (req: Request, res: Response) => {
    let id = req.params.id;
    try {
        const deletedArticle = await Articles.findOneAndDelete({ _id: id });//
        if (!deletedArticle || deleteArticle === null) {
            return res.status(400).json({
                status: "Error",
                message: `No se encontró un artículo con el ID ${id}.`
            });
        };
        // 1. Obtener el nombre del archivo de imagen del artículo eliminado
        const imageFileName = deletedArticle.image;
        // 2. Elimina el archivo de imagen del sistema de archivos
        if (imageFileName) {
            const imagePath = path.join(process.cwd(), 'dist', 'img', 'articles', imageFileName);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(`Error al eliminar el archivo de imagen: ${err}`);
                } else {
                    console.log(`Archivo de imagen ${imageFileName} eliminado con éxito.`);
                }
            });
        }

        return res.status(200).json({
            status: "success",
            article: deletedArticle,
            message: `Artículo con ID ${id} eliminado con éxito.`
        });

    } catch (error) {
        return res.status(404).json({
            status: "Error",
            message: `Error al borrar el artículo con el ID ${id}.`
        });
    }
}

//metodo para editar articulos
export const upDate = async (req: Request, res: Response) => {
    try {
        let id = req.params.id;
        //recoger parametros del body
        let params = req.body;

        // Recoge el artículo actual
        const article = await Articles.findById(id);

        if (!article) {
            return res.status(404).json({
                status: "error",
                message: "Artículo no encontrado",
            });
        }



        //validar articulos
        try {
            validation(params);
        } catch (error) {
            return res.status(400).json({
                status: "error",
                message: "Faltan datos por enviar o no se ha guardado el artículo",
            });
        }
        //buscar y actualziar el articulo
        const articleUpDated = await Articles.findByIdAndUpdate({ _id: id }, params, { new: true })
        /* el tercer parametro del metodo se usa para indicar que después de la actualización,
        se debe devolver el documento actualizado en lugar del documento original.
        Esto te permite obtener el documento actualizado después de la operación.
        */
        // Verifica si se ha cargado una nueva imagen

        // 1. Obtener el nombre del archivo de imagen del artículo eliminado
        const deletedArticle = await Articles.findOne({ _id: id });//
        const imageFileName = deletedArticle!.image;
        // 2. Elimina el archivo de imagen del sistema de archivos
        if (imageFileName) {
            const imagePath = path.join(process.cwd(), 'dist', 'img', 'articles', imageFileName);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(`Error al eliminar el archivo de imagen: ${err}`);
                } else {
                    console.log(`Archivo de imagen ${imageFileName} eliminado con éxito.`);
                }
            });
        }


        return res.status(200).json({
            status: "success",
            article: articleUpDated,
            message: "Artículo actualizado con éxito.",
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Ocurrió un error al actualizar. No se actualizó el aritculo",
        });
    }
}

//metodo para subir imagenes con la ayuda de la liberia multer
export const uplodadImg = async (req: Request, res: Response) => {
    try {
        //1: configurar multer en el archivos de rutas
        //2: validar si existe el archicvo y recogerlo 
        if (!req.file && !req.files) return res.status(400).json({
            status: "error",
            message: "Peticion inválida"
        });

        //3: conseguir el nombre de la imagen 
        let nameFile = req.file!.originalname;//con ! le decimos a TS que el req.file no es indefinido, de lo contrardio dara error
        let fileSplit = nameFile.split('\.');
        let nameExt = fileSplit[1];//segundo indice del nombre del arhivo despues de separarlo
        //4: validar si la extencion correcta, sino se cumple lo eliminamos con un metodo nativo de node unlink
        if (nameExt !== 'png' && nameExt !== 'jpg'
            && nameExt !== 'jpeg' && nameExt !== 'svg'
            && nameExt !== 'gif') {
            fs.unlink(req.file!.path, (error) => {
                return res.status(400).json({
                    status: "error",
                    error,
                    extencion: nameExt,
                    message: "Formato de archivo no válido"
                });
            })
        } else {
            //5: actualiza el articulo si todo sale bien
            let id = req.params.id;

            const articleUpDated = await Articles.findByIdAndUpdate({ _id: id }, { image: req.file!.filename }, { new: true })
            return res.status(200).json({
                status: "success",
                articleUpDated,
                message: "Imagen añadida de manera exitosa",
                fichero: req.file
            });
        }

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Ocurrió un error durante la carga del archivo.",
            error: error
        });
    }
}

//metodo para consultar una imagen de manera individuall
export const image = (req: Request, res: Response) => {
    let fichero = req.params.fichero;
    let ruta = './dist/img/articles/' + fichero;
    console.log('Ruta:', ruta, req);

    //comprueba si existe la ruta fisica, y 
    fs.stat(ruta, (error, existe) => {
        if (existe) {
            return res.sendFile(path.resolve(ruta))
        } else {
            return res.status(500).json({
                status: "error",
                message: "La imagen no existe",
                existe,
                error,
                ruta
            });
        }
    })
}

//metodo para buscar articulos
export const searcher = (req: Request, res: Response) => {
    //1: sacar el string de busqueda
    let search = req.params.busqueda;

    //2: find OR y aplicar un ordem.
    Articles.find({
        //con i se comprueba si el titulo o el contenido incluye el string de busqueda
        $or: [
            { 'title': { '$regex': search, '$options': 'i' } },
            { 'content': { '$regex': search, '$options': 'i' } }
        ]
    }).sort({ fecha: -1 }).exec().then((Articles: any) => {
        //si la búsqueda no encuentra resultados, la promesa se rechaza y entra en el catch. 
        //Se lo hace de esta manera usando promesas  porque el exec ya no admite calbaks y daba error 
        if (Articles && Articles.length >= 0) {
            return res.status(200).send({
                status: "success",
                contador: Articles.length,
                Articles
            });
        } else {
            //se usa el metodo reject para garantizar que se lance la promesa rechazada y entre al catch
            return Promise.reject("No se han encontrado artículos");
        }
    }).catch((error: any) => {
        return res.status(404).json({
            status: "error",
            error
        });
    });
}