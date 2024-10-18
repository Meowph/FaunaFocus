import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { addPost } from "../../services/PostService.jsx"
import { getAllCategories } from "../../services/CategoryService.jsx"
import { Card } from "reactstrap"
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
  <Card style={{marginLeft:'50rem'}}>
    <div style={{margin:'1rem'}} className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          <label style={{marginBottom:'10px'}} for="addPostTitle">Title</label>
            <input id="addPostTitle" onChange={(e) => {
                let postObj = {...post}
                postObj.Title = e.target.value
                setPost(postObj)
              }}></input><br />
            <label style={{marginBottom:'10px'}} for="addPostDescription">Description</label>
            <input id="addPostDescription" onChange={(e) => {
                  let postObj = {...post}
                  postObj.Description = e.target.value
                  setPost(postObj)
                }}></input><br/>
                <label style={{marginBottom:'10px'}} for="addPostLocation">Location</label>
            <input id="addPostLocation" onChange={(e) => {
                  let postObj = {...post}
                  postObj.Location = e.target.value
                  setPost(postObj)
                }}></input><br/>
            <label  style={{marginBottom:'10px'}} for="addPostImgUrl">Image Url</label>
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
                    style={{marginBottom:'10px'}}
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

              <button style={{backgroundColor:'#2E8B57', border:'none', borderRadius:'5px', marginTop:'5px', marginBottom:'10px'}}id="submitNewPost" type="submit" onClick={() => createPostObj()}>Add Post!</button>
              <br></br>
              <Link style={{color:'#2E8B57', marginBottom:'5px'}} to={"/post"}>Go back To Post List</Link>
         </div>
      </div>
    </div>
  </Card>
)
}
