import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'reactstrap';

//Double-check paths (aka: experiences vs experience)... use https://localhst:blah blah/api/experiences or experience/what you are trying to call)
//Keep trying until info shows, then plug in what works 

//~~~ Keep in mind for de-bugging! ~~~

export const Experience = ({ experience }) => {
  return (
    <Card className="m-4">
      {experience?.id && (
        <Link to={`/experiences/${experience.id}`}>
          <p className="text-left px-2">{experience.title}</p>
        </Link>
      )}
      {experience?.userProfile?.displayName && (
        <p className="text-left px-2">Posted By: {experience.userProfile.displayName}</p>
      )}
      {experience?.category?.name && (
        <p className="text-left px-2">Category: {experience.category.name}</p>
      )}
    </Card>
  );
};
