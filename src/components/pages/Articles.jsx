import { useState, useEffect } from "react";
import { Global } from "../../helper/Global";
import { Ajax } from "../../helper/Ajax.jsx";
import ListAricles from "./ListAricles";
const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    //conseguir articulos cada vez que se carge el componene
    getArticles();
  }, [])

  const getArticles = async () => {
    //peticion ajax y que espere hasta obeter el array completo

    const { datas } = await Ajax(Global.url + 'articulos', 'GET')

    if (datas.status === 'success') {
      setArticles(datas.Articles);

    }
    setLoading(false);
  }

  return (
    <>
      {loading ? 'Cargando...' : (
        //recorres el array de objetos
        articles.length >= 1 ? (
          <ListAricles articles={articles} setArticles={setArticles}></ListAricles>
        ) : (<h3>No hay artículos</h3>)
      )}
    </>
  )
}

export default Articles;