/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Global } from "../../helper/Global";
import { Ajax } from "../../helper/Ajax.jsx";
import ListAricles from "./ListAricles";
import { useParams } from "react-router-dom";

const Search = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  useEffect(() => {

    //conseguir articulos cada vez que se carge el componente
    getArticles();
  }, []);

  useEffect(() => {
    //conseguir articulos cada vez que el parametro se modifique
   
    getArticles();
  }, [params])

  const getArticles = async () => {
    //peticion ajax y que espere hasta obeter el array completo

    const { datas } = await Ajax(Global.url + 'buscar/' + params.busqueda, 'GET')

    if (datas.status === 'success') {
      setArticles(datas.Articles);

    }else setArticles([]);
    setLoading(false);
  }

  return (
    <>
      {loading ? 'Cargando...' : (
        //recorres el array de objetos
        articles.length >= 1 ? (
          <ListAricles articles={articles} setArticles={setArticles}></ListAricles>
        ) : (<h3>No existen coincidencias</h3>)
      )}
    </>
  )
}

export default Search;
