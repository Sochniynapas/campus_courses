import { useState } from "react"
import { Button, Container, FormControl, FormLabel, Nav } from "react-bootstrap"
import { useRegisterUserMutation } from "../../../api/userApi"
import { useDispatch } from "react-redux";
import { setLogin, setRoles, setToken } from "../../../store/slice/authSlice";
import { ProfileValidation } from "../../../validation/userValidation"; 
import { useNavigate } from "react-router-dom";


function Registration() {

    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [busy, setBusy] = useState(false)
    const [fields, setFields] = useState({
        fullName: '',
        birthDate: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [userRegister] = useRegisterUserMutation()

    const handleFieldChange = (fieldName, value) => {
        setFields(prevFields => ({
            ...prevFields,
            [fieldName]: value
        }));
    };
    const handleRegistration = async () => {
        try {
            const response = await userRegister(fields)
            if(response.data){
                dispatch(setToken(response.data.token))
                dispatch(setLogin(fields.email))
                navigate('/')
            }
            else{
                setBusy(true)
                throw new Error(response.error.status)
            }
        }
        catch(error) {
            
        }
    }


    return (
        <Container className="pt-5">
            <Nav className="pb-2">
                <h1 className="fw-bold display-5 ">Регистрация нового пользователя</h1>
            </Nav>
            <Nav className="pb-2">
                <FormLabel>Фио</FormLabel>
                <FormControl
                    type="text"
                    value={fields.fullName}
                    onChange={(e) => handleFieldChange('fullName', e.target.value)}
                />
                <ProfileValidation  type = {"name"} input = {fields.fullName}/>
            </Nav>
            <Nav className="pb-2">
                <FormLabel>День рождения</FormLabel>
                <FormControl
                    type="date"
                    value={fields.birthDate}
                    onChange={(e) => handleFieldChange('birthDate', e.target.value)}
                />
                <ProfileValidation  type = {"date"} input = {fields.birthDate}/>
            </Nav>
            <Nav className="pb-2">
                <FormLabel>Email</FormLabel>
                <FormControl
                    type="email"
                    value={fields.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                />
                {busy ? (
                    <FormLabel className="text-danger ">Почта уже занята</FormLabel>
                ):(
                    <ProfileValidation  type = {"email"} input = {fields.email}/>
                )}
            </Nav>
            <Nav className="pb-2">
                <FormLabel>Пароль</FormLabel>
                <FormControl
                    type="password"
                    value={fields.password}
                    onChange={(e) => handleFieldChange('password', e.target.value)}
                />
                <ProfileValidation  type = {"password"} input = {fields.password}/>
            </Nav>
            <Nav className="pb-2">
                <FormLabel>Повторите пароль</FormLabel>
                <FormControl
                    type="password"
                    value={fields.confirmPassword}
                    onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
                />
                {fields.confirmPassword !== fields.password?(
                    <FormLabel className="text-danger">
                        Пароли не совпадают
                    </FormLabel>
                ):(
                    null
                )}
            </Nav>

            <Button className="pb-2" onClick={handleRegistration}>
                Зарегистрироваться
            </Button>

        </Container>
    );
}

export default Registration;