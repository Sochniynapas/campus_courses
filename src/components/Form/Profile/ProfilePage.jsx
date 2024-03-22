import { Button, Container, FormControl, FormLabel, Nav, Navbar, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useEditUserProfileMutation, useGetUserProfileQuery} from "../../../api/userApi"
import { clearToken, selectRoles, selectToken, setRoles } from "../../../store/slice/authSlice"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useDateFormatter from '../../../hooks/formattedDate'
import formatedDate from "../../../hooks/formattedDate"
import { ProfileValidation } from "../../../validation/userValidation"


function Profile() {
    const token = useSelector(selectToken)
    const roles = useSelector(selectRoles)
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
            dispatch(clearToken)
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
        }
        else {
            if (userError && userError.status === 401) {
                dispatch(clearToken)
                navigate('/')
            }
        }


    }, [userProfile, userError])

    return (
        <Container className="pt-5">
            <Nav className="pb-2">
                <h1 className="fw-bold display-5 ">Профиль</h1>
            </Nav>
            {!isLoading && (
                <>
                    <Navbar className="flex-column flex-sm-row justify-content-between ">
                        <FormLabel className="mb-0 col-2 h5" >ФИО</FormLabel>
                        <FormControl
                            type="text"
                            value={profileFields.name}
                            onChange={(e) => (handleFieldChange("name", e.target.value))}
                            className="w-75 col-10"
                        />
                    </Navbar>
                    <Nav className="d-flex justify-content-evenly ">
                        <ProfileValidation type={"name"} input={profileFields.name} />
                    </Nav>
                    <Navbar className="flex-column flex-sm-row justify-content-between ">
                        <FormLabel className="mb-0 col-2 h5" >Email</FormLabel>
                        <FormLabel className="w-75 col-10 text-">{profileFields.email}</FormLabel>
                    </Navbar>
                    <Navbar className="flex-column flex-sm-row justify-content-between ">
                        <FormLabel className="mb-0 col-2 h5" >Дата рождения</FormLabel>
                        <FormControl
                            type="date"
                            value={profileFields.bDate}
                            onChange={(e) => (handleFieldChange("bDate", e.target.value))}
                            className="w-75 col-10"
                        />
                    </Navbar>
                    <Nav className="d-flex justify-content-evenly ">
                        <ProfileValidation type={"date"} input={profileFields.bDate} />
                    </Nav>

                    <Nav className="d-flex justify-content-end ">
                        <Button className="mt-3" onClick={handleEdit}>
                            Изменить
                        </Button>
                    </Nav>
                </>
            )}
        </Container>
    )
}

export default Profile