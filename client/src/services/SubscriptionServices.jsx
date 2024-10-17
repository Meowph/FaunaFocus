const apiUrl = "https://localhost:5001/api/Subscription";

export const getAllSubscriptionsByUserId = (userId) => {
  return fetch(`${apiUrl}/GetByUserId/${userId}`).then((res) => res.json());
};

export const addSubscription = (subscription) => {
  return fetch(`${apiUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  })
    .then((res) => res.json())
    .then((data) => {
      return data.id;
    });
};

export const updateSubscription = (subscription) => {
  return fetch(`${apiUrl}/${subscription.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });
};
