import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button, Card } from "reactstrap"
import { deletePost } from "../../services/PostService.jsx"

export const DeletePost = () => {

    const { state } = useLocation()
    const navigate = useNavigate()

    const confirmDeletePost = (id) => {
        deletePost(id).then(navigate("/myposts"))
    } 

    return (
        <>
        <Card className="m-4">
            <p className="text-left px2">Are you sure you want to delete {state.post.title}?</p>
            <Button color="danger" onClick={() => confirmDeletePost(state.post.id)}>Confirm Delete</Button>
            <Link to={`/post/${state.post.id}`}>No! Return To Post Details</Link>
        </Card>
        </>
    )
}