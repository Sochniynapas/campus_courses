import { Container, Nav, Navbar, NavbarBrand } from 'react-bootstrap'
import Header from './components/Form/Header/HeaderForm.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectLogin } from './store/slice/authSlice.js';
import { useLogoutUserMutation } from './api/userApi.js';
import swal from 'sweetalert'


function MainPage(prop) {

  const token = localStorage.getItem("token")
  const login = useSelector(selectLogin)
  const navigate = useNavigate()


  const [userLogout] = useLogoutUserMutation()
  

  const handleLogout = async () => {

    const response = await userLogout(token)
    if (response.data) {
      localStorage.clear()
      navigate('/')
      swal({
        title: "Успешно!",
        text: "Вы вышли из аккаунта!",
        icon: "success",
        button: "Продолжить",
      });
    }
    else {
      if (response.error.status === 401) {
        localStorage.clear()
        navigate('/')
      }
    }


  }

  

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
                  <Header />
                  <Nav className='ms-auto'><Link className='nav-link text-white ' to='/profile'>{login}</Link></Nav>
                  <Nav><Link className='nav-link text-white ' to='/' onClick={handleLogout}>Выход</Link></Nav>
                </>
              ) : (
                <>
                  <Nav className='ms-auto'><Link className='nav-link text-white ' to='/registration'>Регистрация</Link></Nav>
                  <Nav><Link className='nav-link text-white ' to='/login'>Вход</Link></Nav>
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