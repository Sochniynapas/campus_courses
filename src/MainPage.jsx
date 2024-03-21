import { Container, Nav, Navbar, NavbarBrand, NavbarText } from 'react-bootstrap'
import Header from './components/Form/Header/HeaderForm.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { clearToken, selectLogin, selectToken } from './store/slice/authSlice.js';
import { useLogoutUserMutation } from './api/userApi.js';


function MainPage(prop) {

  const token = useSelector(selectToken)
  const login = useSelector(selectLogin)
  const navigate = useNavigate()
  const dispatch = useDispatch() 

  const [userLogout] = useLogoutUserMutation()

  const handleLogout = async () => {
    try {
      const response = await userLogout(token)
      if (response.data.message === "Logged Out") {
        dispatch(clearToken())
        navigate('/')
      }
      else {
        throw new Error(response.error.status)
      }
    }
    catch (error) {
      console.log(error)
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
                  <Nav className='ms-auto'><Link className='nav-link text-white ' to='/ab'>{login}</Link></Nav>
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