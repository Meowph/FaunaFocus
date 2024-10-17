import { useEffect, useState } from "react";
import { AdminPostList } from "./AdminPostList.jsx"; 
import { getApprovedPosts } from "../../services/AdminPostService.jsx";

export const AdminPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getApprovedPosts().then(postArr => setPosts(postArr));
    }, []);

    return (
        <div className="container">
            <h1>Admin Posts</h1>
            <AdminPostList posts={posts} setPosts={setPosts} />
        </div>
    );
};
