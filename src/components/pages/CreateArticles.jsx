import { useState } from "react";
import { useForm } from '../hooks/useForm';
import { Ajax } from "../../helper/Ajax";
import { Global } from "../../helper/Global";
const CreateArticles = () => {
  //metodo para recoger datos del formulario
  const { form, toChange, send } = useForm({});
  const [result, setResult] = useState('No guardado');

  //metodo para gurardar el articulo que se reciben del formulario
  const savedArticle = async (e) => {
    e.preventDefault();
    //recoger datos
    let newArticle = form;//valor que devuelve el usefrom
    //guardar aticulo en el backen mediante peticion ajax
    const { datas } = await Ajax(Global.url + 'crear', 'POST', newArticle);
    if(datas.status === 'success'){
      setResult('Guardado');
    }else setResult('Error');
    
    //1:conseguir el file input
    const fileInput = document.querySelector('#file');
    //compobabo el resulatdo de la peficion ajax
    if (datas.status === 'success' && fileInput.files[0]) {
      setResult('Guardado');
      //subi imagen
      const formData = new FormData();
      formData.append('file', fileInput.files[0]);
      const upLoadImg = await Ajax(Global.url + 'subir-img/' + datas.article._id, 'POST', formData, true);

      if (upLoadImg.datas.status === 'success') {
        setResult('Guardado');
      } else setResult('Error');
      console.log(upLoadImg.datas);
    } 

  }

  return (
    <>
      <div className="jumbo">

        <h3>Formulario para crear un artículo</h3>
        <strong>{result === 'Guardado' ? 'Articulo guardado con exito.' : ''}</strong>
        <strong>{result === 'Error' ? 'Los proporcionados son incorrectos o imcompletos' : ''}</strong>
        <form className="form" onSubmit={savedArticle}>

          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input type="text" placeholder="Titulo" id="title" name="title" onChange={toChange}></input>
          </div>

          <div className="form-group">
            <label htmlFor="content">Contenido</label>
            <textarea placeholder="Contenido" id="content" name="content" onChange={toChange}></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="file">Imagen</label>
            <input type="file" placeholder="Titulo" id="file" name="file" ></input>
          </div>


          <input className="btn bnt-success" type="submit" name="" value="Guardar" id="save"></input>

        </form>

      </div>
    </>
  )
}
export default CreateArticles;