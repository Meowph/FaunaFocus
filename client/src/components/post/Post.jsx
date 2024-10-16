import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'reactstrap';

export const Post = ({ post }) => {
  return (

    <Card className="m-4">
      {post?.id && (
        <Link to={`/post/${post.id}`}>
          <p className="text-left px-2">{post.title}</p>
        </Link>
      )}
      {post?.userProfile?.displayName && (
        <p className="text-left px-2">Posted By: {post.userProfile.displayName}</p>
      )}
      {post?.category?.name && (
        <p className="text-left px-2">Category: {post.category.name}</p>
      )}
    </Card>
  );
};
