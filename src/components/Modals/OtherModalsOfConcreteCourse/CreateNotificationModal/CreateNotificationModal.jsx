import { useState } from "react"
import { Button, FormCheck, FormLabel, Modal } from "react-bootstrap"
import { useCreateNotificationMutation } from "../../../../api/coursesApi"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectToken } from "../../../../store/slice/authSlice"
import SwalCreateNotificationContent from "./CreateNotificationModalFunctions"


const CreateNotification = ({ show, handleClose }) => {
    const [createNotification] = useCreateNotificationMutation()
    const [isRequired, setIsRequired] = useState(false)
    const [notificationData, setNotificationData] = useState({
        text: "",
        isImportant: false
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector(selectToken)
    const {id} = useParams()

    const handleCreateNotification = async() => {
        const response = await createNotification({token: token, body: {text: notificationData.text, isImportant: notificationData.isImportant}, id: id})
        console.log(notificationData)
        if(response.error){
            if(response.error.status === 400){
                setIsRequired(true)
            }
            SwalCreateNotificationContent(response.error.status, handleClose, dispatch, navigate)
        }
        else{
            SwalCreateNotificationContent(200, handleClose, dispatch, navigate)
            setNotificationData({})
            setIsRequired(false)
        }
    }

    const handleChangeData = (type, value) =>{
        setNotificationData((prevFields)=>({
            ...prevFields,
            [type]: value
        }))
    }

    const handleChangeImportant = () =>{
        if(notificationData.isImportant){
            return false
        }
        else{
            return true
        }
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="xl"
            enforceFocus={false}
        >
            <Modal.Header>
                <Modal.Title>Создание уведомления</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <textarea className="w-100" defaultValue={notificationData.text} onBlur={(content)=>handleChangeData("text", content.target.value)}></textarea>
                {isRequired &&
                    <FormLabel className="text-danger">Поле уведомления не должно быть пустым</FormLabel>
                }
                <FormCheck
                    type = "switch"
                    id = "custom-switch"
                    label = "Важное"
                    className="pt-3"
                    defaultChecked = {notificationData.isImportant}
                    onClick={() => handleChangeData("isImportant", handleChangeImportant())}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant="secondary">
                    Отмена
                </Button>
                <Button variant="primary" onClick={handleCreateNotification}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default CreateNotification