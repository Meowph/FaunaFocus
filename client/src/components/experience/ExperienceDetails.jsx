import { useEffect, useState } from "react";
import { getExperienceById } from "../../services/ExperienceService.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "reactstrap";
// import AddNewSubscription from "../Subscriptions/AddSubscription.js";

export const ExperienceDetails = ({ isAdmin }) => {
  const [experienceDetails, setExperienceDetails] = useState({});
  const [experienceDate, setExperienceDate] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  const { id } = useParams();

  const createDate = (dateTime) => {
    const date = new Date(dateTime);
    let temp = { day: "numeric", month: "numeric", year: "numeric" };
    let dateFormat = date.toLocaleDateString(undefined, temp);
    let [month, day, year] = dateFormat.split("/");

    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    getExperienceById(id).then((experienceObj) => 
        setExperienceDetails(experienceObj)); 
}, [id]);

  useEffect(() => {
    const dateString = createDate(experienceDetails?.publishDateTime);
    setExperienceDate(dateString);
  }, [experienceDetails]);

  useEffect(() => {
    const user = localStorage.getItem("userProfile");
    const parsedUser = JSON.parse(user);
    setCurrentUser(parsedUser);
  }, []);

  if (!experienceDetails.id) {
    return <div>No details yet</div>;
  }

  return (
    <>
      <Card className="m-4">
        <p className="text-left px2">{experienceDetails.title}</p>
        <p className="text-left px2">Published On: {experienceDate}</p>
        <p className="text-left px2">
          Experienced By: {experienceDetails.userProfile.displayName}
        </p>
        {/* <AddNewSubscription currentUser={currentUser} /> */}
        <p className="text-left px2">Description: {experienceDetails.description}</p>
        {(currentUser.id === experienceDetails.userProfileId) && (
            <Button
              color="warning"
              onClick={() =>
                navigate(`/experiences/edit/${id}`, { state: { experience: experienceDetails } })
              }
            >
              Edit Experience
            </Button>
            )}

        {((currentUser.id === experienceDetails.userProfileId) || (currentUser.userTypeId === 1)) && (
          <>
            <Button
              color="danger"
              onClick={() =>
                navigate(`/experiences/delete/${id}`, {
                  state: { experience: experienceDetails },
                })
              }
            >
              Delete Experience
            </Button>
            </>
            )}
        <Link to={"/myexperiences"}>My Experiences</Link>
        {/* <Link to={"/experiences"}>All Experiences</Link> */}

        {/* Show the "Unapprove" button if the experience is approved */}
         {/* {isAdmin && experienceDetails.isApproved ? 
  <Button className="btn btn-warning" onClick={handleUnApproval}>
    Unapprove
  </Button> : " "
} */}
      </Card>
    </>
  );
};
