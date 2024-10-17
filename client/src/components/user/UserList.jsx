import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/UserProfileService.jsx";
import { Button, Container, List, ListGroup, ListGroupItem, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const UserList = () => {

    const [users, setUsers] = useState([]);
    const [activeUsers, setActiveUsers] = useState([]);
    const [adminUserCounter, setAdminUserCounter] = useState(0);

    const getUsers = () => {
        getAllUsers().then(usersObj => setUsers(usersObj))
    };

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        const active = users.filter((user) => user.deactivated === false)
        setActiveUsers(active)
    }, [users])

    useEffect(() => {
        let counter = 0
        activeUsers.forEach(user => {
            if (user.userTypeId === 1) {
                counter++
            } 
        })
        setAdminUserCounter(counter)
    }, [activeUsers])

    const navigate = useNavigate();

    return(
        <Container>
            <h2>
                All Active Users
            </h2>
            <Table>
                <thead>
                    <tr>
                        <th>Display Name</th>
                        <th>Full Name</th>
                        <th>User Type</th>
                        <th>Deactivation Votes</th>
                        <th>Demotion Votes</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                {activeUsers.map((user) => (
                    user.userType.id === 1 ? 
                    <tr> 
                        <td>{user.displayName} </td>
                        <td>{user.fullName}</td>
                        <td>{user.userType.name}</td>
                        <td>{user.deactivateVotes}</td>
                        <td>{user.demoteVotes}</td>
                        <Button
                        color="success"
                        onClick={() => {navigate(`/users/editType/${user.id}`, { state: {adminCount: adminUserCounter}})}}
                        >
                            Edit
                        </Button>
                        <Button
                        onClick={() => {navigate(`/users/${user.id}`)}}
                        >
                            View Details
                        </Button>
                        <Button
                        color="danger"
                        onClick={() => {navigate(`/users/deactivate/${user.id}`, { state: {adminCount: adminUserCounter}})}}
                        >
                            Deactivate User
                        </Button>
                    </tr>
                :
                    <tr> 
                        <td>{user.displayName} </td>
                        <td>{user.fullName}</td>
                        <td>{user.userType.name}</td>
                        <td></td>
                        <td></td>
                        <Button
                        color="success"
                        onClick={() => {navigate(`/users/editType/${user.id}`, { state: {adminCount: adminUserCounter}})}}
                        >
                            Edit
                        </Button>
                        <Button
                        onClick={() => {navigate(`/users/${user.id}`)}}
                        >
                            View Details
                        </Button>
                        <Button
                        color="danger"
                        onClick={() => {navigate(`/users/deactivate/${user.id}`, { state: {adminCount: adminUserCounter}})}}
                        >
                            Deactivate User
                        </Button>
                    </tr>
                ))}
                <ListGroup>
                    <ListGroupItem>
                        <Button
                        color="warning"
                        onClick={() => {navigate(`/users/deactivated`)}}
                        >
                            Deactivated Users
                        </Button>
                    </ListGroupItem>
                </ListGroup>
            </Table>
        </Container>
    )
}