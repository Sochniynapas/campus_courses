

import swal from 'sweetalert'
export default function SwalsForCoursesLoading(statusCode, dispatch, navigate) {

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
        case 404:

            navigate('/')
            swal({
                title: "Ошибка",
                text: "Данной группы не существует",
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