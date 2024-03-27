import { Button, Container, Form, FormControl, FormGroup, FormLabel, Nav, Navbar, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useEditUserProfileMutation, useGetUserProfileQuery } from "../../../api/userApi"
import { clearToken, selectRoles, selectToken, setRoles } from "../../../store/slice/authSlice"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useDateFormatter from '../../../hooks/formattedDate'
import formatedDate from "../../../hooks/formattedDate"
import { ProfileValidation } from "../../../validation/userValidation"


function Profile() {
    const token = useSelector(selectToken)
    const dispatch = useDispatch()
    const { data: userProfile, error: userError, isLoading } = useGetUserProfileQuery(token)
    const [editUserProfile] = useEditUserProfileMutation()
    const navigate = useNavigate()
    const [profileFields, setProfileFields] = useState({
        name: '',
        email: '',
        bDate: '',
    })

    const handleEdit = async () => {
        const body = { fullName: profileFields.name, birthDate: profileFields.bDate }
        const response = await editUserProfile({ body: body, token: token })
        if (response.error && response.error.status === 401) {
            dispatch(clearToken())
            navigate('/')
        }
    }
    const handleFieldChange = (fieldName, value) => {
        setProfileFields(prevFields => ({
            ...prevFields,
            [fieldName]: value
        }));
    };
    useEffect(() => {

        if (userProfile) {
            setProfileFields(prevFields => (
                {
                    ...prevFields,
                    name: userProfile.fullName,
                    email: userProfile.email,
                    bDate: formatedDate(userProfile.birthDate)
                }
            )
            )
            swal({
                title: "Успешно!",
                text: "Вы изменили профиль!",
                icon: "success",
                button: "Продолжить",
              });
        }
        else {
            if (userError && userError.status === 401) {
                swal({
                    title: "Ошибка",
                    text: "Вам следует авторизоваться",
                    icon: "error",
                    button: "Продолжить",
                  });
                dispatch(clearToken())
                navigate('/')
            }
            else{
                swal({
                    title: "Ошибка",
                    text: "Проверьте введенные данные",
                    icon: "error",
                    button: "Продолжить",
                  });
            }
        }


    }, [userProfile, userError])

    return (
        <Container className="pt-5">
            <Form>
                <FormLabel className="pb-2">
                    <h1 className="fw-bold display-5 ">Профиль</h1>
                </FormLabel>
                {!isLoading && (
                    <>
                        <FormGroup className="d-flex flex-sm-row justify-content-between align-items-center mb-2">
                            <FormLabel className="mb-0 col-2 h5" >ФИО</FormLabel>
                            <FormControl
                                type="text"
                                value={profileFields.name}
                                onChange={(e) => (handleFieldChange("name", e.target.value))}
                                className="w-75 col-10"
                            />
                        </FormGroup>
                        <FormLabel className="d-flex justify-content-evenly align-items-center">
                            <ProfileValidation type={"name"} input={profileFields.name} />
                        </FormLabel>
                        <FormGroup className="d-flex flex-sm-row justify-content-between align-items-center mb-2">
                            <FormLabel className="mb-0 col-2 h5" >Email</FormLabel>
                            <FormLabel className="w-75 col-10 text-">{profileFields.email}</FormLabel>
                        </FormGroup>
                        <FormGroup className="d-flex flex-sm-row justify-content-between align-items-center">
                            <FormLabel className="mb-0 col-2 h5" >Дата рождения</FormLabel>
                            <FormControl
                                type="date"
                                value={profileFields.bDate}
                                onChange={(e) => (handleFieldChange("bDate", e.target.value))}
                                className="w-75 col-10"
                            />
                        </FormGroup>
                        <FormLabel className="d-flex justify-content-evenly ">
                            <ProfileValidation type={"date"} input={profileFields.bDate} />
                        </FormLabel>

                        <FormGroup className="d-flex justify-content-end ">
                            <Button className="mt-3" onClick={handleEdit}>
                                Изменить
                            </Button>
                        </FormGroup>
                    </>
                )}
            </Form>
        </Container>
    )
}

export default Profile