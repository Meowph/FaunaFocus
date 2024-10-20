import { useEffect } from "react";
import { useState } from "react"
import { getAllApprovedPosts, getAllApprovedPostsByCategoryId, getAllApprovedPostsByUserId } from "../../services/PostService.jsx";
import { getAllUsers } from "../../services/UserProfileService.jsx";
import { Post } from "./Post.jsx";
import { Button } from "reactstrap";
import { getAllCategories } from "../../services/CategoryService.jsx";
import { Link } from 'react-router-dom';

export const PostList = () => {
    const [posts, setPosts] = useState();
    const [categories, setCategories] = useState([])
    const [categorySelection, setCategorySelection] = useState([])
    const [users, setUsers] = useState([])
    const [userSelection, setUserSelection] = useState([])

    const getAllPosts = () => {
        getAllApprovedPosts().then(postArr => setPosts(postArr));
    }

    // console.log("Fetched users:", userSelection)

    useEffect(() => {
        getAllPosts()
    }, [])

    useEffect(() => {
        getAllCategories().then(categoryArr => setCategories(categoryArr))
    }, [])

    useEffect(() => {
        getAllUsers().then(userArr =>  setUsers(userArr))
    }, [])

    useEffect(() => {
        getAllApprovedPostsByCategoryId(categorySelection).then(postArr => setPosts(postArr))
    }, [categorySelection])

    useEffect(() => {
        getAllApprovedPostsByUserId(userSelection).then(postArr => {
            console.log("Fetched users:", postArr)
            setPosts(postArr)})
    }, [userSelection])
    

    return (
        <>
        {/* Filter by Category */}
            <select style={{marginRight:"5px"}} name="categories" onChange={(e) => setCategorySelection(e.target.value)}>
                <option selected>Filter By Category</option>
                {categories.map(category => {
                    return <option value={category.id}>{category.name}</option>
                })}
            </select>

            {/* Filter by User */}
            <select style={{marginRight:"5px"}} name="users" onChange={(e) => setUserSelection(e.target.value)}>
                <option selected >Filter By User</option>
                {users.map(user => {
                    return <option value={user.id}>{user.displayName}</option>
                })}
            </select>
            
            {/* View All Posts */}
            <Button style={{marginRight:"5px"}} onClick={() => getAllPosts()}>View All Posts</Button>
            
            <Link to="/newpost">
  <Button className="create-post-button">Create Post</Button>
</Link>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards-column">
                        {posts?.length > 0 ? posts.map((post) => (
                            // Check using a ternary operator to display only approved posts
                            post.isApproved ? 
                            <Post key={post.id} post={post} /> : null
                        )) : ""}
                    </div>
                </div>
            </div>
        </>
    )
}