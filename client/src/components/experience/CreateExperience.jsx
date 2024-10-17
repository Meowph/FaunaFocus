import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addExperience } from "../../services/ExperienceService.jsx"
import { getAllCategories } from "../../services/CategoryService.jsx"

export const CreateExperience = () => {
    const [experienceCategories, setExperienceCategories] = useState([])
    const [experience, setExperience] = useState({
    PublishDateTime: new Date((new Date().setHours(new Date().getHours() - 4))).toISOString() // Initialize with the current date minus 4 hours in ISO format
});

    const navigate = useNavigate()
    
    const createExperienceObj = () => {
        let user = localStorage.getItem("userProfile")
        const parsedUser = JSON.parse(user)
        
        let experienceCopy = {...experience}
        experienceCopy.UserProfileId = parsedUser.id
        experienceCopy.IsApproved = true

        if (!experienceCopy.PublishDateTime || new Date(experienceCopy.PublishDateTime) < new Date(1753, 0, 1)) {
            experienceCopy.PublishDateTime = new Date(new Date().setHours(new Date().getHours() - 4)).toISOString(); // Default to current date minus 4 hours if invalid in ISO format
        }

        addExperience(experienceCopy).then(experienceId => navigate(`/experiences/${experienceId}`))
    }

    useEffect(() => {
        getAllCategories().then(categoryArr => setExperienceCategories(categoryArr))
    }, [])

    if (!experienceCategories.length > 0) {
        return <div>No Data Yet!</div>
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards-column">
                        <label for="addExperienceTitle">Title</label>
                        <input id="addExperienceTitle" onChange={(e) => {
                                                                let experienceObj = {...experience}
                                                                experienceObj.Title = e.target.value
                                                                setExperience(experienceObj)
                        }}></input><br />
                        <label for="addExperienceDescription">Description</label>
                        <input id="addExperienceDescription" onChange={(e) => {
                                                                    let experienceObj = {...experience}
                                                                    experienceObj.description = e.target.value
                                                                    setExperience(experienceObj)
                        }}></input><br/>
                        <select name="categories" id="createExperienceCategories" onChange={(e) => {
                                    let copy = {...experience}
                                    copy.categoryId = e.target.value
                                    setExperience(copy)
                                }}>
                                <option selected>Select Experience Category:</option>
                            {experienceCategories.map(category => {
                                return <option value={`${category.id}`} >{category.name}</option>
                            })}
                        </select><br />

                        <button id="submitNewExperience" type="submit" onClick={() => createExperienceObj()}>Add Experience!</button>
                    </div>
                </div>
            </div>
        </>
    )
}
