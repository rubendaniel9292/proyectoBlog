import PropTypes from 'prop-types';
const ListAricles = ({ articles, setArticles }) => {
    return (
        <>
            {articles.map(item => {
                return (
                    <article key={item._id} className="article-item">
                        <div className="mask">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/250px-Angular_full_color_logo.svg.png"></img>
                        </div>
                        <div className="data">
                            <h3 className="title">{item.title}</h3>
                            <p className="description">{item.content}</p>
                            <button className="edit">Editar</button>
                            <button className="delete">Borrar</button>
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

export default ListAricles