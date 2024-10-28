import { useEffect, useState } from "react";
import { getAllApprovedPosts, getAllApprovedPostsByCategoryId, getAllApprovedPostsByPlacesId, getAllApprovedPostsByUserId } from "../../services/PostService.jsx";
import { getAllUsers } from "../../services/UserProfileService.jsx";
import { Post } from "./Post.jsx";
import { Button, Col, Row } from "reactstrap";
import { getAllCategories } from "../../services/CategoryService.jsx";
import { Link } from 'react-router-dom';
import { getAllPlaces } from "../../services/PlacesService.jsx";

export const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categorySelection, setCategorySelection] = useState("");
    const [users, setUsers] = useState([]);
    const [userSelection, setUserSelection] = useState("");
    const [places, setPlaces] = useState([]);
    const [placesSelection, setPlacesSelection] = useState("");

    const getAllPosts = () => {
        getAllApprovedPosts().then(postArr => setPosts(postArr));
    }

    useEffect(() => {
        getAllPosts();
        getAllCategories().then(categoryArr => setCategories(categoryArr));
        getAllUsers().then(userArr => setUsers(userArr));
        getAllPlaces().then(userArr => setPlaces(userArr));
        setCategorySelection("");
        setUserSelection("");
        setPlacesSelection("");
    }, []); // This ensures it runs once when the component mounts

    useEffect(() => {
        if (categorySelection) {
            getAllApprovedPostsByCategoryId(categorySelection).then(postArr => setPosts(postArr));
        } else {
            getAllPosts(); // If no category is selected, show all posts
        }
    }, [categorySelection]);

    useEffect(() => {
        if (userSelection) {
            getAllApprovedPostsByUserId(userSelection).then(postArr => setPosts(postArr));
        } else {
            getAllPosts(); // If no user is selected, show all posts
        }
    }, [userSelection]);

    useEffect(() => {
        if (placesSelection) {
            getAllApprovedPostsByPlacesId(placesSelection).then(postArr => setPosts(postArr));
        } else {
            getAllPosts(); // If no location is selected, show all posts
        }
    }, [placesSelection]);

    return (
        <>
            <div style={{ marginLeft: '5px', position: 'fixed', top: '4rem', left: '0', right: '0', padding: '10px' }}>
                {/* Filter by Category */}
                <select style={{ marginRight: "5px", marginTop: '1rem' }} name="categories" onChange={(e) => setCategorySelection(e.target.value)}>
                    <option value="">Filter By Category</option>
                    {categories.map(category => (
                        <option value={category.id} key={category.id}>{category.name}</option>
                    ))}
                </select>

                {/* Filter by User */}
                <select style={{ marginRight: "5px" }} name="users" onChange={(e) => setUserSelection(e.target.value)}>
                    <option value="">Filter By User</option>
                    {users.map(user => (
                        <option value={user.id} key={user.id}>{user.displayName}</option>
                    ))}
                </select>

                {/* Filter by Location */}
                {/* value={places.id} is what allows the URL to be read as /getallapprovedpostsbyplacesId/id... anything other then id after places would give back a 400 error */}
                <select style={{ marginRight: "5px", marginTop: '1rem' }} name="places" onChange={(e) => setPlacesSelection(e.target.value)}>
                    <option value="">Filter By Location</option>
                    {places.map(places => (
                        <option value={places.id} key={places.id}>{places.name}, {places.country}, {places.region}</option>
                    ))}
                </select>

                {/* View All Posts */}
                <Button style={{ marginRight: "5px", backgroundColor: '#778899', border: 'none' }} onClick={getAllPosts}>View All Posts</Button>

                <Link to="/newpost">
                    <Button style={{ backgroundColor: '#FFB6C1', border: 'none', padding: '7px' }} className="create-post-button">Create Post</Button>
                </Link>
            </div>

            <div className="container" style={{ marginLeft: '18rem' }}>
                <Row className="justify-content-center g-2">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            post.isApproved ? (
                                <Col xs="12" sm="6" md="4" key={post.id} className="d-flex justify-content-center">
                                    <Post post={post} />
                                </Col>
                            ) : null
                        ))
                    ) : (
                        <p style={{ marginLeft: '75rem' }}>No posts available.</p>
                    )}
                </Row>
            </div>
        </>
    )
}
