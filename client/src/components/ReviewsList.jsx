import styled from 'styled-components';
import React, { useState } from 'react';
import ReviewListEntry from './ReviewListEntry';

const ReviewList = ({ data }) => {
  const [reviews, setReviews] = useState([]);
  const [doneLoading, setDoneLoading] = useState(false);

  if (data.length > 0 && !doneLoading) {
    setDoneLoading(true);
    setReviews(data);
  }

  const ReviewGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
  `;

  return (
    <ReviewGrid>
      {reviews.slice(0, 6).map((singleReview) => (
        <ReviewListEntry
          avatar={singleReview.avatar_url}
          name={singleReview.name}
          text={singleReview.text}
          date={singleReview.date}
        />
      ))}
    </ReviewGrid>
  );
};

export default ReviewList;
