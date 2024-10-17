const apiUrl = "https://localhost:5001/api";


export const getApprovedPosts = () => {
    return fetch(`${apiUrl}/post`)
        .then(response => response.json()).then(posts => posts.filter(post => post.isApproved))
};


export const approvedPosts = (postId) => {
    return fetch(`${apiUrl}/post/${postId}`, {
        method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({id: postId})
    })
};

export const deniedPosts = (postId) => {
    return fetch(`${apiUrl}/post/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isApproved: 0 // This explicitly marks the post as unapproved
      })
    });
  };


export const getUnApprovedPosts = () => {
    return fetch(`${apiUrl}/post`)
        .then(response => response.json()).then(posts => posts.filter(post => !post.isApproved))
};
