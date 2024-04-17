import { useState } from "react"
import { Button, FormCheck, FormLabel, Modal } from "react-bootstrap"
import { useCreateNotificationMutation } from "../../../../api/coursesApi"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectToken } from "../../../../store/slice/authSlice"
import { handleChangeData, handleChangeImportant, handleCreateNotification } from "./CreateNotificationModalFunctions"


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
    const { id } = useParams()


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
                <textarea className="w-100" defaultValue={notificationData.text} onBlur={(content) => handleChangeData("text", content.target.value, setNotificationData)}></textarea>
                {isRequired &&
                    <FormLabel className="text-danger">Поле уведомления не должно быть пустым</FormLabel>
                }
                <FormCheck
                    type="switch"
                    id="custom-switch"
                    label="Важное"
                    className="pt-3"
                    defaultChecked={notificationData.isImportant}
                    onClick={() => handleChangeData("isImportant", handleChangeImportant(notificationData), setNotificationData)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant="secondary">
                    Отмена
                </Button>
                <Button variant="primary" onClick={() => handleCreateNotification(
                    createNotification,
                    token,
                    notificationData,
                    id,
                    setIsRequired,
                    handleClose,
                    dispatch,
                    navigate,
                    setNotificationData
                )}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default CreateNotification