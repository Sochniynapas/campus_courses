import { clearToken } from "../../../store/slice/authSlice";


export function SwalContent(statusCode, handleClose, dispatch, navigate) {
    switch (statusCode) {
        case 200:
            swal({
                title: "Успешно!",
                text: "Вы зарегистрировали новую группу!",
                icon: "success",
                button: "Продолжить"
            })
            handleClose()
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
            handleClose()
            dispatch(clearToken())
            navigate("/")
            swal({
                title: "Ошибка",
                text: "Вам следует авторизоваться",
                icon: "error",
                button: "Продолжить",
            });
            break
        case 403:
            handleClose()
            navigate("/")
            swal({
                title: "Ошибка",
                text: "У вас нет прав на создание курсов",
                icon: "error",
                button: "Продолжить",
            });
            break
        default:
            handleClose()
            swal({
                title: "Ошибка",
                text: "Произошла непредвиденная ошибка",
                icon: "error",
                button: "Продолжить",
            });
            break
    }
}