import { Link } from "react-router-dom";
const Inicio = () => {
  return (
    <>
      <div className="jumbo">
        <h2>Bivendios a mi blog</h2>
        <p>Blog desarrollado con el el MENR Stack(MongoDB, Express, Node.js, React)</p>
        <Link to='/articulos' className="button">Ver los artículos</Link>
      </div>
    </>
  )
}

export default Inicio;
