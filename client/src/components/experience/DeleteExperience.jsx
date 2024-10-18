import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button, Card } from "reactstrap"
import { deleteExperience } from "../../services/ExperienceService.jsx"

export const DeleteExperience = () => {

    const { state } = useLocation()
    const navigate = useNavigate()

    const confirmDeleteExperience = (id) => {
        deleteExperience(id).then(navigate("/experiences"))
    } 

    return (
        <>
        <Card style={{marginLeft:'25rem', width:'25rem'}} className="container">
            <p className="text-left px2">Are you sure you want to delete {state.experience.title}?</p>
            <Button style={{marginBottom:'10px'}}color="danger" onClick={() => confirmDeleteExperience(state.experience.id)}>Confirm Delete</Button>
            <Link style={{color:'#2E8B57'}} to={`/experiences/${state.experience.id}`}>No! Return To Experience Details</Link>
        </Card>
        </>
    )
}