import { clearToken } from "../../../../store/slice/authSlice";


export function SwalsForEditProfile(statusCode, dispatch, navigate) {
    switch (statusCode) {
        case 200:
            navigate('/')
            swal({
                title: "Успешно!",
                text: "Вы успешно изменили профиль!",
                icon: "success",
                button: "Продолжить",
            });

            break
        case 400:
            swal({
                title: "Ошибка",
                text: "Проверьте введённые поля",
                icon: "error",
                button: "Продолжить",
            });

            break
        case 401:
            dispatch(clearToken())
            navigate('/')
            swal({
                title: "Ошибка",
                text: "Вам следует авторизоваться",
                icon: "error",
                button: "Продолжить",
            });
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

export function SwalsForLoadingProfile(statusCode, dispatch, navigate){
    switch (statusCode) {
        case 401:
            dispatch(clearToken())
            navigate('/')
            swal({
                title: "Ошибка",
                text: "Вам следует авторизоваться",
                icon: "error",
                button: "Продолжить",
            });
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