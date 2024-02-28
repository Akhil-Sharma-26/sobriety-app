import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const BlogCard = ({ heading, content, author }) => {
  return (
    <Card className="bg-white shadow-md rounded-md p-4">
      <CardContent>
        <Typography variant="h5" component="h2" className="text-xl font-bold mb-2">
          {heading}
        </Typography>
        <Typography variant="caption" component="p" className="text-gray-500 mt-2">
          Uploaded by: {author}
        </Typography>
        <Typography variant="body2" component="h3" className="text-gray-600">
          {content}
        </Typography>
        
      </CardContent>
    </Card>
  );
};

export default BlogCard;