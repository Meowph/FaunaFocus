import { useEffect, useState } from "react";
import { getUnApprovedPosts, approvedPosts } from "../../services/AdminPostService.jsx";
import { Post } from "./Post.jsx";

export const AdminPostList = ({ isAdmin }) => { 
    const [allPosts, setAllPosts] = useState([]);

    //Fetching & filtering posts on whether or not they have been approved or unapproved (No decision yet? will appear here)
    const getAllPosts = () => {
        getUnApprovedPosts().then(postList => {

            //Retrieving posts from backend
            const approvedPostIds = JSON.parse(localStorage.getItem('approvedPosts')) || []

            //Filtering through posts to exclude the ones that are in the approvedPostIds array
            const filteredPosts = postList

            setAllPosts(filteredPosts)
        })
    };

    useEffect(() => {
        getAllPosts(); 
    }, []);


    const handleApproval = (post) => {
        const approvedPost = {
            id: post.id, 
            title: post.title,  
            content: post.content,
            imageLocation: post.imageLocation,
            createDateTime: post.createDateTime,
            publishDateTime: post.publishDateTime,
            categoryId: post.categoryId,
            userProfileId: post.userProfileId, 
            isApproved: 1
        }
    
        approvedPosts(post.id) 
        .then(() => {
            //retrieves array AFTER post is approved
            const approvedPostIds = JSON.parse(localStorage.getItem('approvedPosts')) || []

            //Creates a Set from the approvedPostIds array, ensuring that no duplicate IDs exist
            const updatedPostIds = new Set(approvedPostIds)

            //Adds newly approved post (post.id) to the Set of approved post IDs
        updatedPostIds.add(post.id)

        //Converts Set back into an array and then stores the updated list
        localStorage.setItem('approvedPosts', JSON.stringify(Array.from(updatedPostIds)));

            // Post being removed from state, effectively removing the newly approved post the Admin Post Management list
            setAllPosts(allPosts.filter(p => p.id !== post.id)); 
        })
    };

    return (
        <div className="container">
            <h2>Admin Post Management</h2>
            <div className="row justify-content-center">
                <div className="cards-column">
                    {allPosts.length > 0 ? (
                        allPosts.map((post) => ( 
                            <div key={post.id} className="post-item">
                                <Post post={post} />  
                                {isAdmin && (
                                     <div>
                                     {/* Approval Button */}
                                     <button 
                                         className="btn btn-success" 
                                         onClick={() => handleApproval(post)}
                                     >
                                         Approve
                                     </button>
                                 </div>
                                )}
                                <hr />
                            </div>
                        ))
                    ) : (
                        <p>No posts available</p>
                    )}
                </div>
            </div>
        </div>
    );
};
