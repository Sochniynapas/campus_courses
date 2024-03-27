import { useState } from "react";
import { Button, Container, Form, FormControl, FormGroup, FormLabel, Nav } from "react-bootstrap";
import { useAuthorizeUserMutation, useGetUserRolesQuery } from "../../../api/userApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setLogin, setRoles, setToken } from "../../../store/slice/authSlice";
import swal from "sweetalert";


function Authorization() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [authFields, setAuthFields] = useState({
        email: 'handie228228@mail.ru',
        password: 'Sukanah1!'
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
            if (response.data) {
                console.log(response)
                dispatch(setToken(response.data.token))
                dispatch(setLogin(authFields.email))
                navigate('/')
                swal({
                    title: "Успешно!",
                    text: "Вы авторизовались!",
                    icon: "success",
                    button: "Продолжить",
                  });
            }
            else {
                swal({
                    title: "Ошибка",
                    text: "Вы ввели неверный логин или пароль",
                    icon: "error",
                    button: "Продолжить",
                  });
                setFail(true)
                throw new Error(response.error.status)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <Container className="pt-5">
            <Form>
                <FormLabel className="pb-2">
                    <h1 className="fw-bold display-5 ">Авторизация</h1>
                </FormLabel>
                <FormGroup className="pb-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        type="text"
                        value={authFields.email}
                        onChange={(e) => handleChangeFields('email', e.target.value)}
                    />
                </FormGroup>

                <FormGroup className="pb-2">
                    <FormLabel>Пароль</FormLabel>
                    <FormControl
                        type='password'
                        value={authFields.password}
                        onChange={(e) => handleChangeFields('password', e.target.value)}
                    />

                </FormGroup>
                {fail ? (
                    <FormGroup className="d-flex justify-content-center">
                        <FormLabel className="text-danger ">Вы указали неверный логин или пароль</FormLabel>
                    </FormGroup>
                ) : (
                    null
                )}
                <Button onClick={handleAuthorization}>
                    Войти
                </Button>
            </Form>
        </Container>
    )
}

export default Authorization