import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const naviGator = useNavigate();
  const funSearch = (e) => {
    e.preventDefault();
    let mySearch = e.target.search_field.value;
    naviGator('/buscar/' + mySearch, { replace: true });

  }

  return (
    <>

      <aside className="lateral">
        <div className="search">
          <h3 className="title">Buscador</h3>
          <form onSubmit={funSearch}>
            <input type="text" id="search_field" name="search_field" />
            <input type="submit" id="search" value='Buscar'></input>
          </form>
        </div>

      </aside>
    </>
  )
}

export default Sidebar;
