import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addPost } from "../../services/PostService.jsx"
import { getAllCategories } from "../../services/CategoryService.jsx"

export const CreatePost = () => {
    const [postCategories, setPostCategories] = useState([])
    const [post, setPost] = useState({})

    const navigate = useNavigate()
    
    const createPostObj = () => {
        let user = localStorage.getItem("userProfile")
        const parsedUser = JSON.parse(user)
        
        let postCopy = {...post}
        postCopy.UserProfileId = parsedUser.id
        postCopy.IsApproved = true

        addPost(postCopy).then(postId => navigate(`/post/${postId}`))
    }

    useEffect(() => {
        getAllCategories().then(categoryArr => setPostCategories(categoryArr))
    }, [])

    if (!postCategories.length > 0) {
        return <div>No Data Yet!</div>
    }
    const isValidImageUrl = (url) => {
      return /\.(jpeg|jpg|gif|png|svg)$/.test(url); // Basic regex for image file extensions
    }

return (
  <>
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          <label for="addPostTitle">Title</label>
            <input id="addPostTitle" onChange={(e) => {
                let postObj = {...post}
                postObj.Title = e.target.value
                setPost(postObj)
              }}></input><br />
            <label for="addPostDescription">Description</label>
            <input id="addPostDescription" onChange={(e) => {
                  let postObj = {...post}
                  postObj.Description = e.target.value
                  setPost(postObj)
                }}></input><br/>
            <label for="addPostImgUrl">Image Url</label>
            <input id="addPostImgUrl" 
                  type="text"
                   placeholder="Enter Image URL"
                   onChange={(e) => {
                    const url = e.target.value;
                    if (isValidImageUrl(url)) {
                      let postObj = { ...post };
                      postObj.ImgUrl = url; // Save the URL directly
                      setPost(postObj);
                    } else {
                      console.error("Invalid image URL");
                      // Optionally show an error message to the user
                    }
                  }}></input><br/>
            <select name="categories" 
                    id="createPostCategories" 
                    onChange= {(e) => {
                          let copy = {...post}
                          copy.categoryId = e.target.value
                          setPost(copy)
                      }}>
                      <option selected>Select Post Category:</option>
                  {postCategories.map(category => {
                      return <option value={`${category.id}`} >{category.name}</option>
                  })}
              </select><br />

              <button id="submitNewPost" type="submit" onClick={() => createPostObj()}>Add Post!</button>
         </div>
      </div>
    </div>
  </>
)
}
