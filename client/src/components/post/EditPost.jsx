import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { getAllCategories } from "../../services/CategoryService.jsx"
import { submitUpdatePost } from "../../services/PostService.jsx"

export const EditPost = () => {
    const [postCategories, setPostCategories] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [post, setPost] = useState({})

    const { state } = useLocation()
    const navigate = useNavigate()

    const updatePost = async (e) => {
        e.preventDefault()
        await submitUpdatePost(post)
        navigate(`/post/${post.id}`)
    }

    useEffect(() => {
        setTitle(state.post.title)
        setDescription(state.post.description)
        setImgUrl(state.post.imgUrl)
    }, [state])

    useEffect(() => {
        let postCopy = {}
        postCopy.id = state.post.id
        postCopy.title = title
        postCopy.description = description
        postCopy.imgUrl = imgUrl
        postCopy.categoryId = state.post.categoryId
        postCopy.IsApproved = true

        setPost(postCopy)
    }, [title, description, imgUrl])

    useEffect(() => {
        getAllCategories().then(categoryArr => setPostCategories(categoryArr))
    }, [])

    const isValidImageUrl = (url) => {
        return /\.(jpeg|jpg|gif|png|svg)$/.test(url); // Basic regex for image file extensions
      }

  return (
      <>
      <div className="container">
          <div className="row justify-content-center">
              <div className="cards-column">
                <label for="addPostTitle">Edit Title</label>
                <input id="addPostTitle" 
                  onChange={(e) => {
                  setTitle(e.target.value)
                  }} value={title}></input><br />

                  <label for="addPostDescription">Description</label>
                  <input id="addPostDescription" 
                       onChange={(e) => {
                        setDescription(e.target.value)
                  }}value={description}></input><br/>
                  
                  <label for="addPostImgUrl">Image Url</label>
                  <input 
                    id="addPostImgUrl"
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
                   }}
                 /><br/>

                  <select name="categories" id="createPostCategories" onChange={(e) => {
                              let copy = {...post}
                              copy.categoryId = parseInt(e.target.value)
                              setPost(copy)
                          }}>
                          <option>Select Post Category:</option>
                      {postCategories.map(category => {
                          if (state.post.categoryId === category.id) {
                              return <option value={`${category.id}`} selected>{category.name}</option>
                          } else {
                              return <option value={`${category.id}`} >{category.name}</option>
                          }
                      })}
                  </select><br />

                  <button id="submitNewPost" type="submit" onClick={(e) => updatePost(e)}>Edit Post!</button><br/>
                  <Link to={`/post/${post.id}`}>Back to post details!</Link>
              </div>
          </div>
      </div>
  </>
  )
}