
import swal from 'sweetalert'
export default function SwalChangeStudentStatusContent(statusCode, type, dispatch, navigate) {

    switch (statusCode) {
        case 200:
            swal({
                title: "Успешно!",
                text: `Вы успешно ${type} заявку`,
                icon: "success",
                button: "Продолжить"
            })
            break
        case 400:
            swal({
                title: "Ошибка",
                text: "На данном курсе больше нет свободных мест",
                icon: "error",
                button: "Продолжить",
            });
            break
        case 401:

            localStorage.clear()
            navigate("/")
            swal({
                title: "Ошибка",
                text: "Вам следует авторизоваться",
                icon: "error",
                button: "Продолжить",
            });
            break
        case 404:

            navigate("/")
            swal({
                title: "Ошибка",
                text: "Не удалось ничего найти по данному запросу",
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