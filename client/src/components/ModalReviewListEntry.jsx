import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ReviewListEntry = (props) => {
  // props definitions
  const {
    avatar,
    name,
    text,
    date,
    searchTerm,
  } = props;

  const ReviewListContainer = styled.div`
    padding-left: 8px;
    padding-right: 8px;
    margin-right: 10px;
  `;

  const SingleReview = styled.div`
    margin-bottom: 40px;
  `;

  const ReviewTop = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  `;

  const Avatar = styled.div`
    height: 56px;
    width: 56px;
  `;

  const AvatarPic = styled.img`
    height: 56px;
    width: 56px;
    border-radius: 50%;

  `;

  const NameAndDate = styled.div`
    margin-left: 12px;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
  `;

  const StyledDate = styled.div`
    color: rgb(113, 113, 113);
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  `;

  const ReviewText = styled.div`
    color: rgb(34, 34, 34);
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  `;

  // eslint-disable-next-line consistent-return
  const highlight = (reviewText) => {
    if (searchTerm.length > 0) {
      const newReviews = [];
      const split = reviewText.split(/[ ]/g);
      let tempString = '';
      for (let i = 0; i < split.length; i += 1) {
        const query = split[i].replace('.', '');
        if (query.toLowerCase() !== searchTerm.toLowerCase()) {
          // eslint-disable-next-line prefer-template
          tempString += split[i] + ' ';
        } else {
          newReviews.push(tempString);
          newReviews.push(<mark>{split[i]}</mark>);
          tempString = ' ';
        }
      }
      newReviews.push(tempString);
      return newReviews;
    }
  };

  return (
    <ReviewListContainer>
      <SingleReview>
        <ReviewTop>
          <Avatar>
            <AvatarPic src={avatar} alt="user avatar" />
          </Avatar>
          <NameAndDate>
            <div className="name">
              {name}
            </div>
            <StyledDate>
              {`${date}`}
            </StyledDate>
          </NameAndDate>
        </ReviewTop>
        <ReviewText>
          {highlight(text) || text}
        </ReviewText>
      </SingleReview>
    </ReviewListContainer>
  );
};

ReviewListEntry.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
  searchTerm: PropTypes.string,
};

ReviewListEntry.defaultProps = {
  avatar: '',
  name: '',
  text: '',
  date: '',
  searchTerm: '',
};

export default ReviewListEntry;
