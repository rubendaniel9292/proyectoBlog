import PropTypes from 'prop-types';

import { Global } from "../../helper/Global";
import { Ajax } from "../../helper/Ajax.jsx";
import { Link } from 'react-router-dom';
import { alertDelete } from '../../helper/Alerts.jsx';

const ListAricles = ({ articles, setArticles }) => {
    const deleted = async (id) => {
        let { datas } = await Ajax(Global.url + 'articulo/' + id, 'DELETE');
        console.log(datas);
        //setear al componente padre un nuevo listado de articulo
        if (datas.status === 'success') {
            //filtrar articulos con id deferente al que le estoy pasando por id
            let articlesUpdate = articles.filter(article => article._id !== id);
            alertDelete();
            setArticles(articlesUpdate);
        }
    }
    return (
        <>
            {articles.map(item => {
                return (
                    <article key={item._id} className="article-item">
                        <div className="mask">
                            {item.image !== 'default.png' && <img src={Global.url + 'imagen/' + item.image}></img>}
                            {item.image === 'default.png' && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/250px-Angular_full_color_logo.svg.png"></img>}
                        </div>
                        <div className="data">
                            <h3 className="title"><Link to={'/articulo/' + item._id}>{item.title}</Link></h3>
                            <p className="description">{item.content}</p>
                            <Link to={'/editar/'+item._id} className="edit">Editar</Link>
                            <button className="delete" onClick={() => {
                                deleted(item._id);
                            }}>Borrar</button>
                        </div>
                    </article>
                );
            })
            }
        </>
    )
}
ListAricles.propTypes = {
    articles: PropTypes.array.isRequired,
    setArticles: PropTypes.func.isRequired,
};

export default ListAricles;