import { Container, Nav, Navbar, NavbarBrand, NavbarText } from 'react-bootstrap'
import Header from './components/Form/Header/HeaderForm.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { clearToken, selectLogin, selectRoles, selectToken, setRoles } from './store/slice/authSlice.js';
import { useGetUserRolesQuery, useLogoutUserMutation } from './api/userApi.js';
import { useEffect } from 'react';


function MainPage(prop) {

  const token = useSelector(selectToken)
  const login = useSelector(selectLogin)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [userLogout, requestData] = useLogoutUserMutation()
  const { data: userRoles } = useGetUserRolesQuery(token)

  const handleLogout = async () => {
    try {
      const response = await userLogout(token)
      if (response && requestData.isError === false) {
        dispatch(clearToken())
        navigate('/')
        swal({
          title: "Успешно!",
          text: "Вы вышли из аккаунта!",
          icon: "success",
          button: "Продолжить",
        });
      }
      else {
        if(response.error.status === 401){
          dispatch(clearToken())
          navigate('/')
        }
        throw new Error(response.error.status)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (token && userRoles) {
      dispatch(setRoles(userRoles))
    }
  }, [token, userRoles]);

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