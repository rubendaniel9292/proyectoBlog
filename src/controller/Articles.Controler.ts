/*CONTROLADOR*/
import { Request, Response } from 'express';
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
