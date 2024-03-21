import { Container, Nav, Navbar, NavbarBrand, NavbarText } from 'react-bootstrap'
import Header from './components/Form/Header/HeaderForm.jsx'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectToken } from './store/slice/authSlice.js';
import Hello from './components/Form/UnAuth/HelloPage.jsx';

function MainPage(prop) {

  const token = useSelector(selectToken)

  return (
    <div>

      <>
        <Navbar expand="lg" className='bg-secondary'>
          <Container fluid>
            <NavbarBrand className='text-white'>Кампусные курсы</NavbarBrand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              {token ? (
                <>
                  <Header num={4} />
                  <Nav className='ms-auto'><Link className='nav-link text-white ' to='/ab'>handie228228@mail.ru</Link></Nav>
                  <Nav><Link className='nav-link text-white ' to='/ab'>Выход</Link></Nav>
                </>
              ) : (
                <>
                  <Nav className='ms-auto'><Link className='nav-link text-white ' to='registration'>Регистрация</Link></Nav>
                  <Nav><Link className='nav-link text-white ' to='/ab'>Вход</Link></Nav>
                </>
              )}

            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className='w-100 d-flex justify-content-center'>
          <prop.children />
        </div>
      </>

    </div>

  );
}

export default MainPage;