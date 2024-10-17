import { useEffect, useState } from "react";
import { getAllApprovedExperiences, getAllApprovedExperiencesByCategoryId, getAllApprovedExperiencesByUserId } from "../../services/ExperienceService.jsx";
import { getAllUsers } from "../../services/UserProfileService.jsx";
import { getAllCategories } from "../../services/CategoryService.jsx";
import { Experience } from "./Experience.jsx";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

export const ExperienceList = () => {
    const [experiences, setExperiences] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categorySelection, setCategorySelection] = useState(""); 
    const [users, setUsers] = useState([]);
    const [userSelection, setUserSelection] = useState(""); 

    const getAllExperiences = () => {
        getAllApprovedExperiences().then(setExperiences);
    };

    useEffect(() => {
        getAllExperiences();
        getAllCategories().then(setCategories);
        getAllUsers().then(setUsers);
    }, []);

    useEffect(() => {
        if (categorySelection) {
            getAllApprovedExperiencesByCategoryId(categorySelection).then(setExperiences);
        }
    }, [categorySelection]);

    useEffect(() => {
        if (userSelection) {
            getAllApprovedExperiencesByUserId(userSelection).then(setExperiences);
        }
    }, [userSelection]);

    return (
        <>
            {/* Filter by Category */}
            <select style={{marginRight:"5px"}} name="categories" onChange={(e) => setCategorySelection(parseInt(e.target.value))}>
                <option value="">Filter By Category</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>

            {/* Filter by User */}
            <select style={{marginRight:"5px"}} name="users" onChange={(e) => setUserSelection(parseInt(e.target.value))}>
                <option value="">Filter By User</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.displayName}</option>
                ))}
            </select>

            {/* View All Experiences */}
            <Button style={{marginRight:"5px"}} onClick={getAllExperiences}>View All Experiences</Button>
            <Link to="/newexperience">
                <Button className="create-experience-button">Create Experience</Button>
            </Link>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards-column">
                    {experiences?.length > 0 ? experiences.map((experience) => (
                            // Check using a ternary operator to display only approved experiences
                            experience.isApproved ? 
                            <Experience key={experiences.id} experience={experience} /> : null
                        )) : ""}
                    </div>
                </div>
            </div>
        </>
    );
};
