import { useState } from "react";
import { Button, Card, FormControl, FormLabel, Modal, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

function CardType(prop) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState(prop.groupName)

    const [putNewName] = handleSetNewValue()

    const handleSetNewValue = (value)=>{
        setName(prev =>({
            ...prev,
            name: value
        }))
    }
    const handleChangeNameOfGroup = async()=>{
        const response = putNewName()
    }

    return (
        <Card key={prop.id} className="p-3">
            <Nav className="d-flex justify-content-between  ">
                {!prop.isAdmin ? (
                    <>
                        <Link className="col-2 d-flex align-items-center justify-content-start">{prop.groupName}</Link>
                        <Nav className="col-6 d-flex justify-content-end  ">
                            <Button className="me-3 border-0 bg-warning text-black " onClick={handleShow}>
                                Редактировать
                            </Button>
                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                                key={prop.id}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Редактирование группы</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <FormLabel>Название группы</FormLabel>
                                    <FormControl type='text' value={name} onChange={(e)=>handleSetNewValue(e.target.value)} />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Отмена
                                    </Button>
                                    <Button variant="primary" onClick={handleLog}>Сохранить</Button>
                                </Modal.Footer>
                            </Modal>
                            <Button className="bg-danger border-0">
                                Удалить
                            </Button>
                        </Nav>
                    </>
                ) : (
                    <Link className="nav-link text-black p-1 d-flex align-items-center justify-content-start">{prop.groupName}</Link>
                )}
            </Nav>
        </Card>
    )
}
export default CardType