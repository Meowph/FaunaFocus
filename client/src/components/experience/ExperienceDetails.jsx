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
    < div style={{marginLeft:'43rem', marginBottom:'5rem'
    }}>
      <Card className="m-4" style={{ width: '500px', border:'double, #6cd871', padding:'0.5rem' }}>
        <p style={{textDecoration:'underline'}} className="text-left px2">{experienceDetails.title}</p>
        <p className="text-left px2">Published On: {experienceDate}</p>
        <p className="text-left px2">
          Experienced By: {experienceDetails.userProfile.displayName}
        </p>
        {/* <AddNewSubscription currentUser={currentUser} /> */}
        <p className="text-left px2">Description: {experienceDetails.description}</p>
        {(currentUser.id === experienceDetails.userProfileId) && (
            <Button
            style={{backgroundColor:'#FFB6C1', marginBottom:'5px', border:'none', marginLeft:'3px', marginRight:'3px'}}
              onClick={() =>
                navigate(`/experiences/edit/${id}`, { state: { experience: experienceDetails } })
              }
            >
              Edit Story
            </Button>
            )}

        {((currentUser.id === experienceDetails.userProfileId) || (currentUser.userTypeId === 1)) && (
          <>
            <Button
               style={{backgroundColor:'#778899', marginBottom:'5px', border:'none', marginLeft:'3px', marginRight:'3px'}}
              onClick={() =>
                navigate(`/experiences/delete/${id}`, {
                  state: { experience: experienceDetails },
                })
              }
            >
              Delete Story
            </Button>
            </>
            )}
        <Link style={{color:'#2E8B57', marginBottom:'5px'}} to={"/myexperiences"}>My Stories</Link>
        <Link style={{color:'#2E8B57'}} to={"/experiences"}>All Stories</Link>

        {/* Show the "Unapprove" button if the experience is approved */}
         {/* {isAdmin && experienceDetails.isApproved ? 
  <Button className="btn btn-warning" onClick={handleUnApproval}>
    Unapprove
  </Button> : " "
} */}
      </Card>
    </div>
  );
};
