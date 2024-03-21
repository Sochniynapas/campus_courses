import { Container, FormControl, FormLabel, Nav, Navbar, Row } from "react-bootstrap"
import { selectLogin } from "../../../store/slice/authSlice"
import { useSelector } from "react-redux"



function Profile() {
    const email = useSelector(selectLogin)

    return (
        <Container className="pt-5">
            <Nav className="pb-2">
                <h1 className="fw-bold display-5 ">Профиль</h1>
            </Nav>
            <Navbar className="d-flex justify-content-between ">
                <FormLabel className="mb-0 col-2 h5" >ФИО</FormLabel>
                <FormControl type="text" className="w-75 col-10"></FormControl>
            </Navbar>
            <Navbar className="d-flex justify-content-between ">
                <FormLabel className="mb-0 col-2 h5" >Email</FormLabel>
                <FormLabel className="w-75 col-10">{email}</FormLabel>
            </Navbar>
            <Navbar className="d-flex justify-content-between ">
                <FormLabel className="mb-0 col-2 h5" >Дата рождения</FormLabel>
                <FormControl type="date" className="w-75 col-10"></FormControl>
            </Navbar>
        </Container>
    )
}

export default Profile