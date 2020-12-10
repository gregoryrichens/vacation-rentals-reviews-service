import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReviewsList from './ReviewsList';
import Ratings from './Ratings';
import ShowAllBtn from './ShowAllBtn';
import Modal from './Modal';
import useModal from '../useModal';

const ReviewApp = () => {
  const [reviewData, setReviewData] = useState([]);
  const [doneLoading, setDoneLoading] = useState(false);
  const { isShowing, toggle } = useModal();
  const id = window.location.pathname.split('/')[1];
  const listingID = Number(id) || 21;

  // const dateSort = (d) => d.slice()
  //   .sort((a, b) => new Date(b.review.date) - new Date(a.review.date));

  if (!doneLoading) {
    axios.get(`/api/listings/${listingID}/reviews`)
      .then((res) => {
        console.log(res.data);
        setReviewData(res.data.rows);
      })
      .catch((err) => console.log(err));
    setDoneLoading(true);
  }

  const ReviewAppContainer = styled.div`
    font-family: 'Montserrat', sans-serif;
    width: 1128px;
    padding-right: -35px;
    overflow-x: hidden;
    margin: 0 auto;
  `;

  const ButtonContainer = styled.div`
    padding-bottom: 48px;
  `;

  const DividerLine = styled.div`
    height: 1px;
    background: rgb(207, 207, 207);
    width: 1128px;
  `;

  const TopLineContainer = styled.div`
    padding-bottom: 48px;
  `;

  // eslint-disable-next-line no-unused-expressions
  isShowing ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = 'scroll';

  document.body.style.overflowX = 'hidden';

  return (
    <div>
      <ReviewAppContainer showing={isShowing}>
        <TopLineContainer>
          <DividerLine />
        </TopLineContainer>
        <Ratings data={reviewData} />
        <ReviewsList data={reviewData} />
        <ButtonContainer>
          <ShowAllBtn data={reviewData} toggle={toggle} />
        </ButtonContainer>
        <Modal
          data={reviewData}
          isShowing={isShowing}
          hide={toggle}
        />
        <DividerLine />
      </ReviewAppContainer>
    </div>
  );
};

export default ReviewApp;
