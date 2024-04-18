import { SwalsForEditProfile } from "./ProfileSwals"

const handleEdit = async (profileFields, editUserProfile, dispatch, navigate, token) => {
    const body = { fullName: profileFields.name, birthDate: profileFields.bDate }
    const response = await editUserProfile({ body: body, token: token })
    if (response.data) {
        SwalsForEditProfile(200, dispatch, navigate)
    }
    else {
        if (response.error) {
            SwalsForEditProfile(response.error.status, dispatch, navigate)
        }
    }
}
const handleFieldChange = (fieldName, value, setProfileFields) => {
    setProfileFields(prevFields => ({
        ...prevFields,
        [fieldName]: value
    }));
}

export {handleEdit, handleFieldChange}