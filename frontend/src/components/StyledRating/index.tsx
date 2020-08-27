import React from 'react';
import { Rating, RatingProps } from 'semantic-ui-react';
import './rating.sass';

interface IStyledRatingProps extends RatingProps {
  rating: number;
}

export const StyledRating: React.FC<IStyledRatingProps> = props => {
  const { className, rating } = props;
  return (
    <Rating
      rating={rating}
      maxRating={5}
      size="huge"
      {...props}
      className={`landing__rating_bar ${className}`}
    />
  );
};
