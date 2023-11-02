import { Route, Routes, Navigate, HashRouter } from 'react-router-dom';
import Inicio from '../pages/Inicio';
import Articles from '../pages/Articles';
import CreateArticles from '../pages/CreateArticles';
import Header from '../layout/Header';
import Nav from '../layout/Nav';
import Sidebar from '../layout/Sidebar';
import Footer from '../layout/Footer';

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
                        <Route path='/*' element={<Navigate to='/inicio' />} />
                    </Routes>
                </section>
                <Sidebar></Sidebar>
                <Footer></Footer>
            </HashRouter>
        </>
    )
};

export default Rutes
