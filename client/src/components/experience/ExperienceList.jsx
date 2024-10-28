import { useEffect, useState } from "react";
import { getAllApprovedExperiences, getAllApprovedExperiencesByCategoryId, getAllApprovedExperiencesByUserId } from "../../services/ExperienceService.jsx";
import { getAllUsers } from "../../services/UserProfileService.jsx";
import { getAllCategories } from "../../services/CategoryService.jsx";
import { Experience } from "./Experience.jsx";
import { Button, Col, Row } from "reactstrap"; // Import Row from reactstrap
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
            <div style={{ marginLeft: '5px', position: 'fixed', top: '5rem', left: '0', right: '0',  padding: '10px' }}>
                {/* Filter by Category */}
                <select style={{ marginRight: "5px" }} name="categories" onChange={(e) => setCategorySelection(parseInt(e.target.value))}>
                    <option value="">Filter By Category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>

                {/* Filter by User */}
                <select style={{ marginRight: "5px" }} name="users" onChange={(e) => setUserSelection(parseInt(e.target.value))}>
                    <option value="">Filter By User</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.displayName}</option>
                    ))}
                </select>

                {/* View All Experiences */}
                <Button style={{ marginRight: "5px", backgroundColor: '#778899', border: 'none'}} onClick={getAllExperiences}>View All Stories</Button>
                <Link to="/newexperience">
                    <Button style={{ backgroundColor: '#FFB6C1', border: 'none', padding: '7px' }} className="create-experience-button">Create Story</Button>
                </Link>
            </div>

            <div className="container" style={{ marginTop: '8rem', marginLeft: '18rem' }}> {/* Adjust margin to prevent overlap */}
                <Row className="justify-content-center g-2"> {/* Use Row from reactstrap */}
                    {experiences.length > 0 ? (
                        experiences.map((experience) => (
                            experience.isApproved ? (
                                <Col xs="12" sm="6" md="4" key={experience.id} className="mb-4 d-flex justify-content-center"> {/* Added d-flex and justify-content-center */}
                                    <Experience experience={experience} />
                                </Col>
                            ) : null
                        ))
                    ) : (
                        <p style={{ marginLeft: '75rem'}}>No experiences available.</p>
                    )}
                </Row>
            </div>
        </>
    );
};
