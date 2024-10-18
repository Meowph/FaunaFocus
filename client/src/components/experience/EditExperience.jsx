import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { getAllCategories } from "../../services/CategoryService.jsx"
import { submitUpdateExperience } from "../../services/ExperienceService.jsx"

export const EditExperience = () => {
    const [experienceCategories, setExperienceCategories] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [experience, setExperience] = useState({ PublishDateTime: new Date((new Date().setHours(new Date().getHours() - 4))).toISOString() // Initialize with the current date minus 4 hours in ISO format 
        })

    const { state } = useLocation()
    const navigate = useNavigate()

    const updateExperience = async (e) => {
        e.preventDefault()
        await submitUpdateExperience(experience)
        navigate(`/experiences/${experience.id}`)
    }

    useEffect(() => {
        setTitle(state.experience.title)
        setDescription(state.experience.description)
        setImgUrl(state.experience.imgUrl)
    }, [state])

    useEffect(() => {
        let experienceCopy = {}
        experienceCopy.id = state.experience.id
        experienceCopy.title = title
        experienceCopy.description = description
        experienceCopy.categoryId = state.experience.categoryId
        experienceCopy.IsApproved = true

        if (!experienceCopy.PublishDateTime || new Date(experienceCopy.PublishDateTime) < new Date(1753, 0, 1)) {
            experienceCopy.PublishDateTime = new Date(new Date().setHours(new Date().getHours() - 4)).toISOString(); // Default to current date minus 4 hours if invalid in ISO format
        }

        setExperience(experienceCopy)
    }, [title, description, imgUrl])

    useEffect(() => {
        getAllCategories().then(categoryArr => setExperienceCategories(categoryArr))
    }, [])

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards-column">
                        <label for="addExperienceTitle">Edit Title</label>
                        <input id="addExperienceTitle" onChange={(e) => {
                                                                setTitle(e.target.value)
                        }} value={title}></input><br />
                        <label for="addExperienceDescription">Description</label>
                        <input id="addExperienceDescription" onChange={(e) => {
                                                                    setDescription(e.target.value)
                        }}value={description}></input><br/>
                        <select name="categories" id="createExperienceCategories" onChange={(e) => {
                                    let copy = {...experience}
                                    copy.categoryId = parseInt(e.target.value)
                                    setExperience(copy)
                                }}>
                                <option>Select Experience Category:</option>
                            {experienceCategories.map(category => {
                                if (state.experience.categoryId === category.id) {
                                    return <option value={`${category.id}`} selected>{category.name}</option>
                                } else {
                                    return <option value={`${category.id}`} >{category.name}</option>
                                }
                            })}
                        </select><br />

                        <button id="submitNewExperience" type="submit" onClick={(e) => updateExperience(e)}>Edit Experience!</button><br/>
                        <Link to={`/experiences/${experience.id}`}>Back to experience details!</Link>
                    </div>
                </div>
            </div>
        </>
    )
}