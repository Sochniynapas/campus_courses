import { useState } from "react"
import { Button, Modal } from "react-bootstrap"


const CreateNotification = ({ show, handleClose }) => {
    const [notification, setNotification] = useState('')
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
                <textarea className="w-100" onBlur={(content)=>setNotification(content)}></textarea>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant="secondary">
                    Отмена
                </Button>
                <Button variant="primary">Сохранить</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default CreateNotification