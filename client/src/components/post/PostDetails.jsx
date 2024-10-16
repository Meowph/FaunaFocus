import { useEffect, useState } from "react";
import { getPostById } from "../../services/PostService.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "reactstrap";
// import AddNewSubscription from "../Subscriptions/AddSubscription.js";

export const PostDetails = ({ isAdmin }) => {
  const [postDetails, setPostDetails] = useState({});
  const [postDate, setPostDate] = useState("");
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
    getPostById(id).then((postObj) => 
        setPostDetails(postObj)); 
}, [id]);

  useEffect(() => {
    const dateString = createDate(postDetails?.publishDateTime);
    setPostDate(dateString);
  }, [postDetails]);

  useEffect(() => {
    const user = localStorage.getItem("userProfile");
    const parsedUser = JSON.parse(user);
    setCurrentUser(parsedUser);
  }, []);

  if (!postDetails.id) {
    return <div>No details yet</div>;
  }


  return (
    <>
      <Card className="m-4">
        <p className="text-left px2">{postDetails.title}</p>
        <img
          src={`${postDetails.imgUrl}`}
          alt={`Image for ${postDetails.title}`}
        />
        <p className="text-left px2">Location: {postDetails.location}</p>
        <p className="text-left px2">Published On: {postDate}</p>
        <p className="text-left px2">
          Posted By: {postDetails.userProfile.displayName}
        </p>
        {/* <AddNewSubscription currentUser={currentUser} /> */}
        <p className="text-left px2">Description: {postDetails.description}</p>
        {(currentUser.id === postDetails.userProfileId) && (
            <Button
              color="warning"
              onClick={() =>
                navigate(`/posts/edit/${id}`, { state: { post: postDetails } })
              }
            >
              Edit Post
            </Button>
            )}

        {((currentUser.id === postDetails.userProfileId) || (currentUser.userTypeId === 1)) && (
          <>
            <Button
              color="danger"
              onClick={() =>
                navigate(`/posts/delete/${id}`, {
                  state: { post: postDetails },
                })
              }
            >
              Delete Post
            </Button>
            </>
            )}
        {/* <Link to={"/myposts"}>My Posts</Link> */}
        <Link to={"/posts"}>All Posts</Link>

        {/* Show the "Unapprove" button if the post is approved */}
         {/* {isAdmin && postDetails.isApproved ? 
  <Button className="btn btn-warning" onClick={handleUnApproval}>
    Unapprove
  </Button> : " "
} */}
      </Card>
    </>
  );
};
