const apiUrl = 'https://localhost:5001/api/posts';

export const getAllApprovedPosts = () => {
    return fetch(`${apiUrl}`).then(res => res.json());
}

export const getAllApprovedUserPosts = (id) => {
    return fetch(`${apiUrl}/post/getallbyuserid/${id}`).then(res => res.json())
}

export const getPostById = (id) => {
    return fetch(`${apiUrl}/${id}`).then(res => res.json())
}

export const addPost = (post) => {
    return fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post)
    }).then(res => res.json()).then(data => {return data.id})
};

export const deletePost = (postId) => {
    return fetch(`${apiUrl}/${postId}`, {
        method: "DELETE"
    })
}

export const submitUpdatePost = (post) => {
    return fetch(`${apiUrl}/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
}

export const getAllApprovedPostsByCategoryId = (categoryId) => {
    return fetch(`${apiUrl}/getallapprovedpostsbycategoryid/${categoryId}`).then(res => res.json())
}

export const getAllApprovedPostsByUserId = (userId) => {
    return fetch(`${apiUrl}/getallapprovedpostsbyuserid/${userId}`).then(res => res.json())
}

// export const getAllPostsBySubscriberId = (userId) => {
//     return fetch(`${apiUrl}/Post/GetPostsBySubscriberId/${userId}`).then(res => res.json())
// }