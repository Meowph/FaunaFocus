import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button, Card } from "reactstrap"
import { deleteExperience } from "../../services/ExperienceService.jsx"

export const DeleteExperience = () => {

    const { state } = useLocation()
    const navigate = useNavigate()

    const confirmDeleteExperience = (id) => {
        deleteExperience(id).then(navigate("/myexperiences"))
    } 

    return (
        <>
        <Card className="container">
            <p className="text-left px2">Are you sure you want to delete {state.experience.title}?</p>
            <Button color="danger" onClick={() => confirmDeleteExperience(state.experience.id)}>Confirm Delete</Button>
            <Link to={`/experience/${state.experience.id}`}>No! Return To Experience Details</Link>
        </Card>
        </>
    )
}