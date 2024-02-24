import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const BlogCard = ({ heading, content }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {heading}
        </Typography>
        <Typography variant="body2" component="p">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogCard;