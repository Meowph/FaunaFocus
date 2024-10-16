import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'reactstrap';

export const Experience = ({ experience }) => {
  return (

    <Card className="m-4">
      <Link to={`/experience/${experience.id}`}> 
        <p className="text-left px-2" >{experience.Title}</p>
      </Link> 
       <p className="text-left px-2">Posted By: {experience.userProfile.displayName}</p>
      <p className="text-left px-2">Category: {experience.category.name}</p>
    </Card>
  );
};
