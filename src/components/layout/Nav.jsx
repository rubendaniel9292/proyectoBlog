import { NavLink } from "react-router-dom"
const Nav = () => {
  return (
    <>
      <nav className="nav">
        <ul>
           <li><NavLink to={'/inicio'}>Inicio</NavLink></li>
           <li><NavLink to={'/articulos'}>Artículos</NavLink></li>
           <li><NavLink to={'/crear-articulos'}>Crear Artículos</NavLink></li>
          
        </ul>
      </nav>
    </>
  )
}

export default Nav
