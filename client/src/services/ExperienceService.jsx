const apiUrl = 'https://localhost:5001/api/experiences';

export const getAllApprovedExperiences = () => {
    return fetch(`${apiUrl}`).then(res => res.json());
}

export const getAllApprovedUserExperiences = (id) => {
    return fetch(`${apiUrl}/getallbyuserid/${id}`).then(res => res.json())
}

export const getExperienceById = (id) => {
    return fetch(`${apiUrl}/${id}`).then(res => res.json())
}

export const addExperience = (experience) => {
    return fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(experience)
    }).then(res => res.json()).then(data => {return data.id})
};

export const deleteExperience = (experienceId) => {
    return fetch(`${apiUrl}/${experienceId}`, {
        method: "DELETE"
    })
}

export const submitUpdateExperience = (experience) => {
    return fetch(`${apiUrl}/${experience.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(experience)
    })
}

export const getAllApprovedExperiencesByCategoryId = (categoryId) => {
    return fetch(`${apiUrl}/getallapprovedexperiencesbycategoryid/${categoryId}`).then(res => res.json())
}

export const getAllApprovedExperiencesByUserId = (userId) => {
    return fetch(`${apiUrl}/getallapprovedexperiencesbyuserid/${userId}`).then(res => res.json())
}