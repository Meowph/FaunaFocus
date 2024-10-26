import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button, Card } from "reactstrap"
import { deletePost } from "../../services/PostService.jsx"

export const DeletePost = () => {

    const { state } = useLocation()
    const navigate = useNavigate()

    const confirmDeletePost = (id) => {
        deletePost(id).then(navigate("/post"))
    } 

    return (
        <>
        <Card style={{marginLeft:'50rem', width:'19rem'}} className="container">
            <p className="text-left px2">Are you sure you want to delete {state.post.title}?</p>
            <Button style={{marginBottom:'10px'}} color="danger" onClick={() => confirmDeletePost(state.post.id)}>Confirm Delete</Button>
            <Link style={{color:'#2E8B57', marginBottom:'10px'}} to={`/post/${state.post.id}`}>No! Return To Post Details</Link>
        </Card>
        </>
    )
}