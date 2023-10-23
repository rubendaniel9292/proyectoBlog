/*ESQUEMA DE MODELO PARA CREAR NUEVOS ARTICULOS DE LA BD*/
import { Schema, model, now } from "mongoose";
//estructura del modelo
const articleShema = new Schema({
    //datos del ariticulo
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: now },
    image: { type: String, default: 'default.png' }
});
export default model('Artículo', articleShema, 'articles');