
import swal from 'sweetalert'
export default function SwalGetCourseDataContent(statusCode, dispatch, navigate) {

    switch (statusCode) {
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