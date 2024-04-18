import { useEffect, useState } from "react"
import { Button, Container, Form, FormControl, FormGroup, FormLabel, Nav } from "react-bootstrap"
import { useRegisterUserMutation } from "../../../api/userApi"
import { useDispatch } from "react-redux";
import { selectToken } from "../../../store/slice/authSlice";
import { ProfileValidation } from "../../../validation/userValidation";
import { useNavigate } from "react-router-dom";
import { handleFieldChange, handleRegistration } from "./RegistrationFunctions/FunctionsForRegistration";


function Registration() {


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [fields, setFields] = useState({
        fullName: '',
        birthDate: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [busy, setBusy] = useState(false)

    const [userRegister] = useRegisterUserMutation()

    ///useEffect(()=>{
    ///    if(dispatch(selectToken()) !== null){
    ///        navigate('/')
    ///    }
    ///}, [])

    return (
        <Container className="pt-5">
            <Form>
                <FormLabel className="pb-2">
                    <h1 className="fw-bold display-5 ">Регистрация нового пользователя</h1>
                </FormLabel>
                <FormGroup className="pb-2">
                    <FormLabel>Фио</FormLabel>
                    <FormControl
                        type="text"
                        value={fields.fullName}
                        onChange={(e) => handleFieldChange('fullName', e.target.value, setFields)}
                    />
                    <ProfileValidation type={"name"} input={fields.fullName} />
                </FormGroup>
                <FormGroup className="pb-2">
                    <FormLabel>День рождения</FormLabel>
                    <FormControl
                        type="date"
                        value={fields.birthDate}
                        onChange={(e) => handleFieldChange('birthDate', e.target.value, setFields)}
                    />
                    <ProfileValidation type={"date"} input={fields.birthDate} />
                </FormGroup>
                <FormGroup className="pb-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        type="email"
                        value={fields.email}
                        onChange={(e) => handleFieldChange('email', e.target.value, setFields)}
                    /> 
                    {busy ? (
                        <FormLabel className="text-danger">Почта уже занята</FormLabel>
                    ):(
                        <ProfileValidation type={"email"} input={fields.email} />  
                    )}
                </FormGroup>
                <FormGroup className="pb-2">
                    <FormLabel>Пароль</FormLabel>
                    <FormControl
                        type="password"
                        value={fields.password}
                        onChange={(e) => handleFieldChange('password', e.target.value, setFields)}
                    />
                    <ProfileValidation type={"password"} input={fields.password} />
                </FormGroup>
                <FormGroup className="pb-2">
                    <FormLabel>Повторите пароль</FormLabel>
                    <FormControl
                        type="password"
                        value={fields.confirmPassword}
                        onChange={(e) => handleFieldChange('confirmPassword', e.target.value, setFields)}
                    />
                    {fields.confirmPassword !== fields.password ? (
                        <FormLabel className="text-danger">
                            Пароли не совпадают
                        </FormLabel>
                    ) : (
                        null
                    )}
                </FormGroup>

                <Button className="pb-2" onClick={()=>handleRegistration(userRegister, dispatch, navigate, fields, setBusy)}>
                    Зарегистрироваться
                </Button>
            </Form>
        </Container>
    );
}

export default Registration;