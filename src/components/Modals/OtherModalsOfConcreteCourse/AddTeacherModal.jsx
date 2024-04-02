import { useState } from "react"
import { Button, FormLabel, Modal } from "react-bootstrap"
import Select from "react-select"
import { useGetTransformedUsers } from "../../../hooks/useGetTransformedUsers"



const AddTeacher = ({ show, handleClose }) => {

    const transformedUsers = useGetTransformedUsers()
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
                <Modal.Title>Добавление преподавателя</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormLabel>Выберите преподавателя</FormLabel>
                <Select options={transformedUsers}></Select>
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
export default AddTeacher