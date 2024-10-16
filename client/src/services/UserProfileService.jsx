const apiUrl = "https://localhost:5001/api/userProfile";

export const login = (userObject) => {
  return fetch(`${apiUrl}/GetByEmail?email=${userObject.email}`)
  .then((r) => r.json())
    .then((userProfile) => {
      if(userProfile.id){
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        console.log(userProfile);

        return userProfile
      }
      else{
        return undefined
      }
    });
};


export const logout = () => {
      localStorage.clear()
};

export const register = (userObject) => {
  return  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  })
  .then((response) => response.json())
    .then((savedUserProfile) => {
      localStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
    });
};

export const getAllUsers = () => {
  return fetch(`${apiUrl}/api/UserProfile`)
          .then((res) => res.json())
};

export const getUserById = async (id) => {
  return fetch(`${apiUrl}/api/UserProfile/${id}`)
          .then((res) => res.json())
};

export const updateUser = (user) => {
  return fetch(`${apiUrl}/api/UserProfile/${user.id}`, {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user),
  })
} 
