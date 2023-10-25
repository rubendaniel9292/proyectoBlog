/*CONTROLADOR*/
import { Request, Response } from 'express';
import validator from 'validator';
import Articles from '../model/Articles';

export const prueba = (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Accion de prueba del controlador exitosa' });
}

export const curso = (req: Request, res: Response) => {
    console.log('Se ha ejecutado el endpoint probando');
    return res.status(200).send(
        //la api devuelve dentro del calback un onbjeto json
        [{
            curso: 'master en react',
            autor: 'Daniel Rivas Web',
            url: ''
        }]

    );
}

//metodo para crear y guarar el articulo
export const save = async (req: Request, res: Response) => {
    //1: recoger los parametros por post a guardar
    let params = req.body;
    //2: valdiar los datos datos vacios y longitud 
    try {
        let validarTitle = !validator.isEmpty(params.title) && validator.isLength(params.title, { min: 5, max: undefined });
        let validarContent = !validator.isEmpty(params.content);
        if (!validarTitle || !validarContent) {
            throw new Error('No se ha validado la informacion');
        }

        //3: Creando objeto a guardar en la bd
        //asignar valores a objetos al modelo (manual o automatico)
        //article.title = params.title;(manual, para pocos parametros)
        const article = new Articles(params);//de manera automatica, para muchos paramtos
        const articleSaved = await article.save();
        return res.status(200).json({
            status: "success",
            article: articleSaved,
            message: "Artículo guardado con éxito."
        })

    } catch (error) {
        return res.status(400).json({
            status: 'error', message: 'Faltan datos por enviar o no se ha guardado el artículo'
        });
    }

}







