import { setLogin, setToken } from "../../../store/slice/authSlice"

const handleAuthorization = async (dispatch, setFail, navigate, userAuth, authFields) => {
    const response = await userAuth(authFields)
    if (response.data) {
        dispatch(setToken(response.data.token))
        dispatch(setLogin(authFields.email))
        SwalsForAuthorization(200, navigate, setFail)
    }
    else {
        if (response.error) {
            SwalsForAuthorization(response.error.status, navigate, setFail)
        }

    }
}
const handleChangeFields = (fieldName, value, setAuthFields) => {
    setAuthFields(prevFields => ({
        ...prevFields,
        [fieldName]: value
    }))
}


function SwalsForAuthorization(statusCode, navigate, setFail) {
    switch (statusCode) {
        case 200:

            navigate('/')
            swal({
                title: "Успешно!",
                text: "Вы авторизовались!",
                icon: "success",
                button: "Продолжить",
            });
            setFail(false)

            break
        case 400:
            swal({
                title: "Ошибка",
                text: "Вы ввели неверный логин или пароль",
                icon: "error",
                button: "Продолжить",
            });
            setFail(true)
            break
        default:

            swal({
                title: "Ошибка",
                text: "Произошла непредвиденная ошибка",
                icon: "error",
                button: "Продолжить",
            });
            break
    }
}

export { handleAuthorization, handleChangeFields }

