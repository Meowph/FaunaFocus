import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { getUserById, updateUser } from "../../services/UserProfileService.jsx";
import { Button, Container, Form, FormGroup, Input, Label, ListGroupItemHeading, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export const UserEditType = () => {
    const [modal, setModal] = useState(false)

    const toggle = () => setModal(!modal)
    
    const [user, setUser] = useState({})
    const { userId } = useParams();
    const { state } = useLocation()

    const navigate = useNavigate();

    useEffect(() => {
        getUserById(userId).then(userObj => setUser(userObj))
    }, [userId])

    const handleInputChange = (e) => {
        const copy = { ...user }
          copy[e.target.name] = e.target.value
          setUser(copy)
          }
  
  
      const handleEdit = () => {
  
          const editedUser = {
              id: user.id,
              userTypeId: user.userTypeId,
              email: user.email,
              lastName: user.lastName,
              firstName: user.firstName,
              displayName: user.displayName,
              deactivated: user.deactivated,
              demoteVotes: user.demoteVotes,
              deactivateVotes: user.deactivateVotes
          }

          if (state.adminCount === 1 && user.userType?.id === 1) {
            toggle()
          } else {
                if (user.userType.id === 1) {
                    editedUser.demoteVotes++

                    if (editedUser.demoteVotes < 2) {
                        editedUser.userTypeId = 1
                        updateUser(editedUser)
                        .then(() => {
                            navigate(`/users`)
                        })
                    } else {
                        editedUser.userTypeId = 2
                        updateUser(editedUser)
                        .then(() => {
                            navigate(`/users`)
                        })
                    }
                } else {
                    editedUser.demoteVotes = 0
                    updateUser(editedUser)
                    .then(() => {
                        navigate(`/users`)
                    })
                }
          }
      }
  

    return(
        <Container>
            <Form>
                <ListGroupItemHeading>
                    Edit User Type: {user.displayName}
                </ListGroupItemHeading>
            <FormGroup>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Admin Error</ModalHeader>
                    <ModalBody>
                        Cannot reassign last admin user to author user type. Must reassign another author user to admin user type before reassigning to author user type is allowed.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
                <Label for="userType">
                    User Type
                </Label>
                    {(user.userTypeId === 1 || user.userTypeId === "1" ) && (
                    <Input
                        name="userTypeId"
                        type="select"
                        onChange={handleInputChange}
                    >
                        <option
                    value="1"
                    selected
                    >
                     Admin    
                    </option> 
                    <option
                    value="2"
                    >
                        Author
                    </option>
                    </Input>
                    )}

                {(user.userTypeId === 2 || user.userTypeId === "2") && (
                    <Input
                        name="userTypeId"
                        type="select"
                        onChange={handleInputChange}

                    >
                        <option
                    value="1"
                    >
                     Admin    
                    </option> 
                    <option
                    value="2"
                    selected
                    >
                        Author
                    </option>
                    </Input>
                    )}
                    
            </FormGroup>
            <Button
            color="warning"
            size="sm"
            onClick={() => {navigate(`/users`)}}
            >
                Nevermind!
            </Button>
            <Button
            color="success"
            size="sm"
            onClick={handleEdit}
            >
                **Save**
            </Button>
            </Form>
        </Container>
    )
}