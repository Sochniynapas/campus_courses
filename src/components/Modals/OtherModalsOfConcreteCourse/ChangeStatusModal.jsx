import { Button, FormCheck, Modal } from "react-bootstrap"


const ChangeStatus = ({show, handleClose}) => {

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
                <Modal.Title>Изменение статуса курса</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-lg-row flex-column">
                    <FormCheck
                        inline
                        label="Открыт для записи"
                        name="group1"
                        type={'radio'}
                        id={`inline-${'radio'}-1`}
                        onChange={() => {
                        }}

                    />
                    <FormCheck
                        inline
                        label="В процессе"
                        name="group1"
                        type={'radio'}
                        id={`inline-${'radio'}-2`}
                        onChange={() => {
                        }}
                    />
                    <FormCheck
                        inline
                        label="Завершён"
                        name="group1"
                        type={'radio'}
                        id={`inline-${'radio'}-2`}
                        onChange={() => {
                        }}
                    />
                </div>
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
export default ChangeStatus