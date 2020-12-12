import styled from 'styled-components';
import React, { useState } from 'react';
import ModalReviewListEntry from './ModalReviewListEntry';
import Searchbar from './Searchbar';

const ReviewList = ({ data }) => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [doneLoading, setDoneLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  // const [scrollTop, setScrollTop] = useState(0);

  if (data.length > 0 && !doneLoading) {
    setDoneLoading(true);
    setReviews(data);
  }

  const conditionalData = filteredReviews.length > 0 ? filteredReviews : reviews;

  const ReviewContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    margin-left: 7%;
    padding-right: 8px;
    min-height: 1px;
    position: relative;
  `;

  const ReviewsListContainer = styled.div`
    margin-top: 0px;
  `;

  return (
    <ReviewContainer>
      <Searchbar
        data={data}
        filteredReviews={filteredReviews}
        setFilteredReviews={setFilteredReviews}
        setSearchTerm={setSearchTerm}
      />
      <ReviewsListContainer>
        {conditionalData.map((singleReview) => (
          <ModalReviewListEntry
            avatar={singleReview.avatar_url}
            name={singleReview.name}
            text={singleReview.text}
            date={singleReview.date}
            searchTerm={searchTerm}
          />
        ))}
      </ReviewsListContainer>
    </ReviewContainer>
  );
};

export default ReviewList;
