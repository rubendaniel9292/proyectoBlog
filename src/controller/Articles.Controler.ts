/*CONTROLADOR*/
import { Request, Response } from "express";
import validator from "validator";
import Articles from "../model/Articles";
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
    //1: recoger los parametros por post a guardar
    let params = req.body;
    //2: valdiar los datos datos vacios y longitud
    try {
        let validarTitle =
            !validator.isEmpty(params.title) &&
            validator.isLength(params.title, { min: 5, max: undefined });
        let validarContent = !validator.isEmpty(params.content);
        if (!validarTitle || !validarContent) {
            throw new Error("No se ha validado la informacion");
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
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar o no se ha guardado el artículo",
        });
    }
};

//metodo para conseguir el listado de todos articulos
export const getArticle = (req: Request, res: Response) => {
    let query = Articles;
    query.find({})
        .then((Articles) => {
            return res.status(200).send({
                status: "success",
                Articles,
            });
        })
        .catch((error) => {
            return res.status(404).json({
                status: "error",
                error,
                message: "No se han encontrado artículos",
            });
        });
};

//metodo para conseguir el listado ordeando de todos articulos con metodos de Mongoose con el campo deseado
export const getArticleSrot = (req: Request, res: Response) => {

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
    query.sort({ date: -1 })
        .then((Articles) => {
            return res.status(200).send({
                status: "success",
                contador: Articles.length,
                Articles,
            });
        })
        .catch((error) => {
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
    Articles.findById(id).then((Articles) => {
        return res.status(200).json({
            status: "success",
            Articles
        })
    }).catch((error) => {
        return res.status(404).json({
            status: "error",
            error,
            message: `No se han encontrado el articulo con id ${id}`,
        });
    });
    


}