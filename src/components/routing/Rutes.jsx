import { Route, Routes, Navigate, HashRouter } from 'react-router-dom';
import Inicio from '../pages/Inicio';
import Articles from '../pages/Articles';
import CreateArticles from '../pages/CreateArticles';
import Header from '../layout/Header';
import Nav from '../layout/Nav';
import Sidebar from '../layout/Sidebar';
import Footer from '../layout/Footer';
import Search from '../pages/Search';
import Article from '../pages/Article';
import Edit from '../pages/Edit';

const Rutes = () => {
    return (
        <>
            <HashRouter>
                <Header></Header>
                <Nav></Nav>
                <section id='content' className='content'>
                    <Routes>
                        <Route path='/' element={<Navigate to='/inicio' />} />
                        <Route path='/inicio' element={<Inicio></Inicio>} />
                        <Route path='/articulos' element={<Articles></Articles>} />
                        <Route path='/crear-articulos' element={<CreateArticles></CreateArticles>} />
                        <Route path='/buscar/:busqueda' element={<Search></Search>} />
                        <Route path='/articulo/:id' element={<Article></Article>} />
                        <Route path='/editar/:id' element={<Edit></Edit>} />
                        <Route path='*' element={
                            <div className='jumbo'>
                                <h2>ERROR 404: NO EXISTE EL ARTÍCULO</h2>
                            </div>
                        } />
                    </Routes>
                </section>
                <Sidebar></Sidebar>
                <Footer></Footer>
            </HashRouter>
        </>
    )
};

export default Rutes
