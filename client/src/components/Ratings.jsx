import React from 'react';
import styled from 'styled-components';
import Cleanliness from './allRatings/Cleanliness';
import Communication from './allRatings/Communication';
import CheckIn from './allRatings/CheckIn';
import Accuracy from './allRatings/Accuracy';
import Location from './allRatings/Location';
import Value from './allRatings/Value';

const Ratings = (props) => {
  // function for total average reviews per listing
  const listingTotal = (reviews) => {
    const sum = reviews.reduce((total, current) => {
      const cr = current;
      const ratingsTotal = cr.cleanliness
        + cr.communication + cr.check_in
        + cr.accuracy + cr.location
        + cr.value;

      return total + (ratingsTotal / 6);
    }, 0);
    return sum;
  };

  // function for each child to calc. metric average
  const metricAverage = (reviews, metric) => {
    const sum = reviews.reduce((total, current) => {
      const cr = current;
      return total + cr[metric];
    }, 0);
    return sum / reviews.length;
  };

  const { data } = props;
  const reviewNums = data.length;

  const listingAverage = () => (
    listingTotal(data) / (reviewNums)
  );

  const preciseRating = listingAverage().toPrecision(3);

  const RatingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 2rem;
  `;

  const Header = styled.h2`
    display: flex;
    align-items: center;
    font-size: 22px;
    margin-top: 0px;
    margin-bottom: 0px;
    padding-bottom: 24px;
  `;

  const svgStyle = {
    height: '17px',
    width: '17px',
    fill: '#FF385C',
    'margin-right': '8px',
    'margin-top': '-2',
  };

  return (
    <div>
      <div>
        <Header>
          <svg
            viewBox="0 0 1000 1000"
            role="presentation"
            aria-hidden="true"
            focusable="false"
            style={svgStyle}
          >
            <path d="M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z" />
          </svg>
          {`${preciseRating} (${reviewNums} ratings)`}
        </Header>
      </div>
      <RatingsGrid>
        <Cleanliness
          data={data}
          average={metricAverage}
        />
        <Accuracy
          data={data}
          average={metricAverage}
        />
        <Communication
          data={data}
          average={metricAverage}
        />
        <Location
          data={data}
          average={metricAverage}
        />
        <CheckIn
          data={data}
          average={metricAverage}
        />
        <Value
          data={data}
          average={metricAverage}
        />
      </RatingsGrid>
    </div>
  );
};

export default Ratings;
