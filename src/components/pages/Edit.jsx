
import { useState, useEffect } from "react";
import { useForm } from '../hooks/useForm';
import { Ajax } from "../../helper/Ajax";
import { Global } from "../../helper/Global";
import { useParams } from "react-router-dom";
const Edit = () => {
  //metodo para recoger datos del formulario
  const { form, toChange } = useForm({});
  const [result, setResult] = useState('No guardado');

  const [article, setArticle] = useState([]);

  const params = useParams();


  useEffect(() => {
    //conseguir articulos cada vez que se carge el componene
    getArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getArticles = async () => {
    //peticion ajax y que espere hasta obeter el array completo

    const { datas } = await Ajax(Global.url + 'articulo/' + params.id, 'GET')

    if (datas.status === 'success') {
      setArticle(datas.article);

    }
    console.log(datas.article);

  }

  //metodo para editar el articulo seleccionado
  const editArticle = async (e) => {
    e.preventDefault();
    //recoger datos
    let newArticle = form;//valor que devuelve el usefrom
    //guardar aticulo en el backen mediante peticion ajax
    const { datas } = await Ajax(Global.url + 'articulo/' + params.id, 'PUT', newArticle);
    if (datas.status === 'success') {
      setResult('Guardado');
      
    } else setResult('Error');

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

        <h3>Formulario para Editar el artículo: {article.title}</h3>
      
        <strong>{result === 'Guardado' ? 'Articulo guardado con exito.' : ''}</strong>
        <strong>{result === 'Error' ? 'Los proporcionados son incorrectos o imcompletos' : ''}</strong>
        <form className="form" onSubmit={editArticle}>

          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input type="text" placeholder="Titulo" id="title" name="title" onChange={toChange} defaultValue={article.title}></input>
          </div>

          <div className="form-group">
            <label htmlFor="content">Contenido</label>
            <textarea placeholder="Contenido" id="content" name="content" onChange={toChange} defaultValue={article.content}></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="file">Imagen</label>
            <div className="mask">
              {article.image !== 'default.png' && <img src={Global.url + 'imagen/' + article.image}></img>}
              {article.image === 'default.png' && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/250px-Angular_full_color_logo.svg.png"></img>}
            </div>
            <input type="file" placeholder="Titulo" id="file" name="file" ></input>
          </div>


          <input className="btn bnt-success" type="submit" name="" value="Guardar" id="save"></input>

        </form>

      </div>
    </>
  )
}

export default Edit
