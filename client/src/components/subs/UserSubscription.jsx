import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  addSubscription,
  getAllSubscriptionsByUserId,
  updateSubscription,
} from "../../services/SubscriptionServices.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../../services/PostService.jsx";

function AddNewSubscription({ args, currentUser }) {
  const [modal, setModal] = useState(false);
  const [postDetails, setPostDetails] = useState({});
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const toggle = () => setModal(!modal);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(id).then((postObj) => setPostDetails(postObj));
  }, [id]);

  useEffect(() => {
    getAllSubscriptionsByUserId(currentUser.id).then((subscriptionArr) =>
      setSubscriptions(subscriptionArr)
    );
    console.log(currentUser)
  }, [currentUser.id]);

  const isSubscribed = subscriptions.some(
    (sub) => sub.providerUserProfileId === postDetails.userProfileId
  );

  useEffect(() => {
    if (isSubscribed) {
      const existingSubscription = subscriptions.find(
        (sub) => sub.providerUserProfileId === postDetails.userProfileId
      );
      setSubscription(existingSubscription);
    }
  }, [subscriptions, postDetails.userProfileId]);

  const handleSave = (event) => {
    event.preventDefault();
    const subscriptionObj = {
      subscriberUserProfileId: currentUser.id,
      providerUserProfileId: postDetails?.userProfileId,
    };

    addSubscription(subscriptionObj).then(() => {
      navigate("/");
    });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const editedSubscriptionObj = {
      id: subscription.id,
      subscriberUserProfileId: currentUser.id,
      providerUserProfileId: postDetails?.userProfileId,
      beginDateTime: subscription.beginDateTime,
      endDateTime: new Date(),
    };

    updateSubscription(editedSubscriptionObj).then(() => {
      navigate("/");
    });
  };

  if (currentUser.id === postDetails.userProfileId) {
    return null;
  }

  return (
    <div>
      {isSubscribed ? (
        <>
          <Button color="info" onClick={toggle}>
            Unsubscribe
          </Button>
          <Modal isOpen={modal} toggle={toggle} {...args}>
            <ModalHeader toggle={toggle}>Confirm Unsubscribe</ModalHeader>
            <ModalBody>
              <p>Are you sure you want to unsubscribe from this user?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleUpdate}>
                Confirm
              </Button>{" "}
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </>
      ) : (
        <>
          <Button color="info" onClick={toggle}>
            Subscribe
          </Button>
          <Modal isOpen={modal} toggle={toggle} {...args}>
            <ModalHeader toggle={toggle}>Confirm Subscribe</ModalHeader>
            <ModalBody>
              <p>Are you sure you want to subscribe to this user?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleSave}>
                Confirm
              </Button>{" "}
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </>
      )}
    </div>
  );
}

export default AddNewSubscription;
