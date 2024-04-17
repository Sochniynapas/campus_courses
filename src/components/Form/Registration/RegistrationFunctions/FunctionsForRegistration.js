import { setLogin, setToken } from "../../../../store/slice/authSlice";
import { SwalsForRegistration } from "./SwalsForRegistration";

const handleFieldChange = (fieldName, value, setFields) => {
    setFields(prevFields => ({
        ...prevFields,
        [fieldName]: value
    }));
}

const handleRegistration = async (userRegister, dispatch, navigate, fields, setBusy) => {

    const response = await userRegister(fields)
    if (response.data) {
        dispatch(setToken(response.data.token))
        dispatch(setLogin(fields.email))
        SwalsForRegistration(200, navigate, setBusy)
    }
    else {
        if(response.error){
            SwalsForRegistration(response.error.status, navigate, setBusy)
        }
    }


}
export {handleFieldChange, handleRegistration}