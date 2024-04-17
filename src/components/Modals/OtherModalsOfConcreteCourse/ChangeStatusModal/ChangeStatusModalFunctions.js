
import { clearToken } from "../../../../store/slice/authSlice";

export default function SwalStatusContent(statusCode, handleClose, dispatch, navigate) {

    switch (statusCode) {
        case 200:
            handleClose()
            swal({
                title: "Успешно!",
                text: "Вы успешно изменили статус курса!",
                icon: "success",
                button: "Продолжить"
            })
            break
        case 400:
            swal({
                title: "Ошибка",
                text: "Проверьте, корректен ли ваш выбор",
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
        case 404:
            handleClose()
            navigate("/")
            swal({
                title: "Ошибка",
                text: "Не удалось ничего найти по данному запросу",
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