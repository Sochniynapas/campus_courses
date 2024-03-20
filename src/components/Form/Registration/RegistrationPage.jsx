import { useState } from "react"
import { Button, Container, FormControl, FormLabel, Nav } from "react-bootstrap"
import { useRegisterUserMutation } from "../../../api/userApi"
import { useDispatch, useSelector } from "react-redux";
import { selectToken, setToken } from "../../../store/slice/authSlice";



function Registration() {

    const dispatch = useDispatch()
    const token = useSelector(selectToken)

    const [fields, setFields] = useState({
        fullName: '',
        birthDate: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [userRegister, { isLoading }] = useRegisterUserMutation();

    const handleFieldChange = (fieldName, value) => {
        setFields(prevFields => ({
            ...prevFields,
            [fieldName]: value
        }));
    };
    const handleRegistration = async () => {
        try {

            const response = await userRegister(fields)
            dispatch(setToken(response.data.token))
            console.log(token)

        }
        catch {
            console.log("Ошибка")
        }
    }


    return (
        <Container className="pt-5">
            <Nav className="pb-2">
                <FormLabel>Фио</FormLabel>
                <FormControl
                    type="text"
                    value={fields.fullName}
                    onChange={(e) => handleFieldChange('fullName', e.target.value)}
                />
            </Nav>
            <Nav className="pb-2">
                <FormLabel>День рождения</FormLabel>
                <FormControl
                    type="date"
                    value={fields.birthDate}
                    onChange={(e) => handleFieldChange('birthDate', e.target.value)}
                />
            </Nav>
            <Nav className="pb-2">
                <FormLabel>Email</FormLabel>
                <FormControl
                    type="email"
                    value={fields.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                />
            </Nav>
            <Nav className="pb-2">
                <FormLabel>Пароль</FormLabel>
                <FormControl
                    type="password"
                    value={fields.password}
                    onChange={(e) => handleFieldChange('password', e.target.value)}
                />
            </Nav>
            <Nav className="pb-2">
                <FormLabel>Повторите пароль</FormLabel>
                <FormControl
                    type="password"
                    value={fields.confirmPassword}
                    onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
                />
            </Nav>

            <Button className="pb-2" onClick={handleRegistration}>
                Зарегистрироваться
            </Button>

        </Container>
    );
}

export default Registration;