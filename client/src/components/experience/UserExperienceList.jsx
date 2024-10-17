import { useEffect } from "react";
import { useState } from "react"
import { getAllApprovedUserExperiences } from "../../services/ExperienceService.jsx";
import { Experience } from "./Experience.jsx";

export const UserExperienceList = () => {
    const [userExperiences, setUserExperiences] = useState([])

    const getUserExperiences = () => {
        const user = localStorage.getItem("userProfile")
        const parsedUser = JSON.parse(user)

        getAllApprovedUserExperiences(parsedUser.id)
        .then(experiences => setUserExperiences(experiences))
    }

    useEffect(() => {
        getUserExperiences()
    }, [ ])

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards-column">
                        {userExperiences.length ? userExperiences.map((experience) => (
                            <Experience key={experience.id} experience={experience} />
                        )) : <h1>No Experiences Yet!</h1>}
                    </div>
                </div>
            </div>
        </>
    )
}
