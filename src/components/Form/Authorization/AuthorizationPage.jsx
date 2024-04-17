import { useState } from "react";
import { Button, Container, Form, FormControl, FormGroup, FormLabel, Nav } from "react-bootstrap";
import { useAuthorizeUserMutation } from "../../../api/userApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { handleAuthorization, handleChangeFields } from "./AuthorizationFunctions";


function Authorization() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [authFields, setAuthFields] = useState({
        email: 'gymboss@gachi.com',
        password: 'B0yNextD00r'
    })
    const [fail, setFail] = useState(false)

    const [userAuth] = useAuthorizeUserMutation()

    

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
                        onChange={(e) => handleChangeFields('email', e.target.value, setAuthFields)}
                    />
                </FormGroup>

                <FormGroup className="pb-2">
                    <FormLabel>Пароль</FormLabel>
                    <FormControl
                        type='password'
                        value={authFields.password}
                        onChange={(e) => handleChangeFields('password', e.target.value, setAuthFields)}
                    />

                </FormGroup>
                {fail ? (
                    <FormGroup className="d-flex justify-content-center">
                        <FormLabel className="text-danger ">Вы указали неверный логин или пароль</FormLabel>
                    </FormGroup>
                ) : (
                    null
                )}
                <Button onClick={() => handleAuthorization(dispatch, setFail, navigate, userAuth, authFields)}>
                    Войти
                </Button>
            </Form>
        </Container>
    )
}

export default Authorization