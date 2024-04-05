
import { clearToken } from "../../../../../store/slice/authSlice";

export default function SwalGetCourseDataContent(statusCode, dispatch, navigate) {

    switch (statusCode) {
        case 401:

            dispatch(clearToken())
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