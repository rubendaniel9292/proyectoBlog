import { useState, useEffect } from "react";
import { Global } from "../../helper/Global";
import { Ajax } from "../../helper/Ajax.jsx";
import { useParams } from "react-router-dom";


const Article = () => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  }

  return (
    <>
      <div className="jumbo">
        {loading ? 'Cargando...' :
          //recorrer el array de objetos

          <>
            <div className="mask">
              {article.image !== 'default.png' && <img src={Global.url + 'imagen/' + article.image}></img>}
              {article.image === 'default.png' && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/250px-Angular_full_color_logo.svg.png"></img>}
            </div>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
            <span>{article.date}</span>
          </>

        }
      </div>
    </>
  )
}
export default Article;
