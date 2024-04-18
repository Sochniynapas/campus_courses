import { Button, Card, Container, Form, FormControl, FormGroup, FormLabel, Modal, Nav, } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCreateGroupMutation, useGetGroupsQuery } from "../../../api/groupApi";
import { useDispatch, useSelector } from "react-redux";
import { selectRoles } from "../../../store/slice/authSlice";
import { useEffect, useState } from "react";
import CardType from "./CardTypes";
import handleCreateNewGroup from "./CourseGroupsFunctions/CourseGroupsPageFunctions";


function CourseGroups() {
    const token = localStorage.getItem("token")
    const roles = useSelector(selectRoles)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isRequired, setIsRequired] = useState('false')
    const [name, setName] = useState('')

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        setIsRequired(false)
    };

    const handleShow = () => setShow(true);
    const [createGroup] = useCreateGroupMutation()
    const { data: groups, isError } = useGetGroupsQuery(token)

    const handleSetNewValue = (value) => {
        setName(value);
    }



    useEffect(() => {
        if (groups) {
            console.log(groups)
        }
        else {
            if (isError) {
                localStorage.clear()
                navigate('/')
            }
        }
    }, [groups, isError])

    return (
        <Container>
            <FormGroup className="">
                <FormLabel className="pb-2">
                    <h1 className="fw-bold display-5 ">Группы кампусных курсов</h1>
                </FormLabel>
                {roles.isAdmin && (
                    <FormGroup>
                        <Button className="mb-3" onClick={handleShow}>
                            Создать
                        </Button>
                    </FormGroup>
                )}
                {groups && groups.map(group => (
                    <CardType key={group.id} groupName={group.name} id={group.id} isAdmin={roles.isAdmin} />
                ))}
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Создание группы</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormLabel>Название группы</FormLabel>
                        <FormControl type='text' value={name} onChange={(e) => handleSetNewValue(e.target.value)} />
                        {isRequired === true && (
                            <FormLabel className="text-danger ">Название группы не должно быть пустым</FormLabel>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Отмена
                        </Button>
                        <Button variant="primary" onClick={() => handleCreateNewGroup(createGroup, dispatch, navigate, name, token, handleClose, setIsRequired, setName)}>
                            Сохранить
                        </Button>
                    </Modal.Footer>
                </Modal>
            </FormGroup>
        </Container>

    )

}
export default CourseGroups