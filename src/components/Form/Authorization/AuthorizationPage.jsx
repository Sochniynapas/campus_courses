import { useState } from "react";
import { Button, Container, FormControl, FormLabel, Nav } from "react-bootstrap";
import { useAuthorizeUserMutation } from "../../../api/userApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setLogin, setToken } from "../../../store/slice/authSlice";


function Authorization() {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [authFields, setAuthFields] = useState({
        email: '',
        password: ''
    })
    const [fail, setFail] = useState(false)

    const [userAuth] = useAuthorizeUserMutation()

    const handleChangeFields = (fieldName, value) => {
        setAuthFields(prevFields => ({
            ...prevFields,
            [fieldName]: value
        }))
    }

    const handleAuthorization = async () => {
        try {
            const response = await userAuth(authFields)
            if(response.data){
                console.log(response)
                dispatch(setToken(response.data.token))
                dispatch(setLogin(authFields.email))
                navigate('/')
            }
            else{
                setFail(true)
                throw new Error(response.error.status)
            }
        }
        catch(error) {
            console.log(error)
        }
    }

    return (
        <Container className="pt-5">
            <Nav className="pb-2">
                <h1 className="fw-bold display-5 ">Авторизация</h1>
            </Nav>
            <Nav className="pb-2">
                <FormLabel>Email</FormLabel>
                <FormControl
                    type="text"
                    value={authFields.email}
                    onChange={(e) => handleChangeFields('email', e.target.value)}
                />
            </Nav>

            <Nav className="pb-2">
                <FormLabel>Пароль</FormLabel>
                <FormControl
                    type='password'
                    value={authFields.password}
                    onChange={(e) => handleChangeFields('password', e.target.value)}
                />
                
            </Nav>
            {fail ? (
                <Nav className="d-flex justify-content-center">
                    <FormLabel className="text-danger ">Вы указали неверный логин или пароль</FormLabel>
                </Nav>
            ):(
                null
            )}
            <Button onClick={handleAuthorization}>
                Войти
            </Button>

        </Container>
    )
}

export default Authorization