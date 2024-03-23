import { Button, Card, Container, Nav, } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useGetGroupsQuery } from "../../../api/groupApi";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, selectRoles, selectToken } from "../../../store/slice/authSlice";
import { useEffect } from "react";
import CardType from "./CardTypes";


function CourseGroups() {
    const token = useSelector(selectToken)
    const roles = useSelector(selectRoles)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { data: groups, isError } = useGetGroupsQuery(token)

    useEffect(() => {
        if (groups) {
            console.log(groups)
        }
        else{
            if(isError){
                dispatch(clearToken)
                navigate('/')
            }
        }
    }, [groups, isError])

    return (
        <Container>
            <Nav className="pb-2">
                <h1 className="fw-bold display-5 ">Группы кампусных курсов</h1>
            </Nav>
            {roles.isAdmin && (
                <Button className="mb-3">
                    Создать
                </Button>
            )}
            {groups && groups.map(group => (
                <CardType groupName={group.name} id={group.id} isAdmin={roles.isAdmin} />
            ))}

        </Container>
    )

}
export default CourseGroups