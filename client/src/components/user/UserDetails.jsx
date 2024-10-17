import { useEffect, useState } from "react"
import { getUserById } from "../../services/UserProfileService.jsx";
import { Card, CardImg, CardText, CardTitle, Container } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";

export const UserDetails = () => {

    const [user, setUser] = useState({});
    const [date, setDate] = useState("");

    const { userId } = useParams();

    const navigate = useNavigate();

    const getUser = () => {
       getUserById(userId).then(usersObj => setUser(usersObj));
    };

    const getFormattedDate = (dateTime) =>
    {
        const date = new Date(dateTime);

        const newDate = date.toLocaleDateString();

        return newDate;
    };

    useEffect(() => {
        getUser();
    }, [userId]);

    useEffect(() => {
        const dateString = getFormattedDate(user.createDateTime);
        setDate(dateString);
    }, [userId, user.createDateTime]);

    return(
        <Container>
            <Card>
                <CardTitle
                 key={user.id}
                >
                    <h5>User Profile Details</h5>
                    <CardText
                    >
                       <strong>Full Name: </strong> 
                        {user.fullName}
                    </CardText>
                    <CardText
                    >
                        <strong>Display Name:</strong> 
                        {user.displayName}
                    </CardText>
                    {user.imageLocation ? (
                        <CardImg 
                        style={{
                            width: '100px'
                        }}
                        src={user.imageLocation} />
                    ) : (
                        <CardImg 
                        style={{
                            width: '100px'
                        }}
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Font_Awesome_5_regular_user-circle.svg" />
                    )}
                    <CardText>
                        <strong>Email: </strong>
                         {user.email}
                    </CardText>
                    <CardText>
                        <strong>Creation Date: </strong> 
                        {user.createDateTime ? date : '...'}
                    </CardText>
                    <CardText>
                        <strong>User Type: </strong> 
                        {user.userType ? user.userType.name : '...'}
                    </CardText>
                </CardTitle>
            </Card>
        </Container>
    )
}