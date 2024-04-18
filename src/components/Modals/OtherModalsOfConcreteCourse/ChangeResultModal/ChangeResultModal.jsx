import { useState } from "react"
import { Button, FormCheck, FormLabel, Modal } from "react-bootstrap"
import { useEditStudentMarkMutation } from "../../../../api/coursesApi"
import { useNavigate, useParams } from "react-router-dom"
import { hanadleEditMark, handleChooseMark, handleDefaultChecked } from "./ChangeResultModalFucntions"
import { useDispatch, useSelector } from "react-redux"


const ChangeResult = ({ show, handleClose, type, name, studentId }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const { id } = useParams()

    const [editMark] = useEditStudentMarkMutation()
    const [isRequired, setIsRequired] = useState(false)
    const [markData, setMarkData] = useState({
        markType: "",
        mark: ""
    })


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
                            defaultChecked={handleDefaultChecked("Passed", markData)}
                            onChange={() => {
                                handleChooseMark("Passed", type, setMarkData)
                            }}

                        />
                        <FormCheck
                            inline
                            label="Зафейлено"
                            name="group1"
                            type={'radio'}
                            id={`inline-${'radio'}-2`}
                            defaultChecked={handleDefaultChecked("Failed", markData)}
                            onChange={() => {
                                handleChooseMark("Failed", type, setMarkData)
                            }}
                        />
                    </div>
                    {isRequired &&
                        <FormLabel className="text-danger ">Вы должны выбрать вариант</FormLabel>
                    }
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
                    <Button variant="primary" onClick={() => hanadleEditMark(
                        token,
                        markData,
                        editMark,
                        id,
                        studentId,
                        setIsRequired,
                        handleClose,
                        dispatch,
                        navigate,
                        setMarkData
                    )}>Сохранить</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ChangeResult