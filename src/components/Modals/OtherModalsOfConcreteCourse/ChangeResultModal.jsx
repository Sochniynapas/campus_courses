import { useEffect } from "react"
import { Button, FormCheck, FormLabel, Modal } from "react-bootstrap"


const ChangeResult = ({ show, handleClose, type, name }) => {


    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="xl"
                enforceFocus={false}
            >
                <Modal.Header>
                    <Modal.Title>Изменение отметки для "{type}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormLabel>Студент - {name}</FormLabel>
                    <div className="d-flex flex-lg-row flex-column">
                        <FormCheck
                            inline
                            label="Пройдено"
                            name="group1"
                            type={'radio'}
                            id={`inline-${'radio'}-1`}
                            onChange={() => {
                            }}

                        />
                        <FormCheck
                            inline
                            label="Зафейлено"
                            name="group1"
                            type={'radio'}
                            id={`inline-${'radio'}-2`}
                            onChange={() => {
                            }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        if (type === "Промежуточной аттестации") {
                            handleClose("changeMiddleResult")
                        }
                        else {
                            handleClose("changeFinalResult")
                        }
                    }} variant="secondary">
                        Отмена
                    </Button>
                    <Button variant="primary">Сохранить</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ChangeResult