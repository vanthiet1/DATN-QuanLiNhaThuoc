import React, { useEffect, useState } from 'react';
import { getStarVotes, getAverageRating } from './api/starVote';
import StarRatingComponent from 'react-star-rating-component';

const ProductRating = ({ productId }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [votes, setVotes] = useState([]);
  const [ratingsCount, setRatingsCount] = useState({});

  useEffect(() => {
    const fetchVotes = async () => {
      const fetchedVotes = await getStarVotes(productId);
      setVotes(fetchedVotes);
      
      const counts = fetchedVotes.reduce((acc, vote) => {
        acc[vote.rating] = (acc[vote.rating] || 0) + 1;
        return acc;
      }, {});

      setRatingsCount(counts);
    };

    const fetchAverageRating = async () => {
      const average = await getAverageRating(productId);
      setAverageRating(average);
    };

    fetchVotes();
    fetchAverageRating();
  }, [productId]);

  const totalVotes = votes.length;

  return (
    <div style={{ margin: '20px 0' }}>
      <h3>Đánh giá sản phẩm này ({totalVotes} lượt đánh giá)</h3>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <StarRatingComponent
          name="productRating"
          starCount={5}
          value={averageRating}
          editing={false} 
        />
        <span style={{ marginLeft: '10px', fontSize: '1.5em' }}>{averageRating.toFixed(1)}/5.0</span>
      </div>
      <div style={{ marginTop: '10px' }}>
        <h4>Trung bình đánh giá</h4>
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} style={{ display: 'flex', alignItems: 'center' }}>
            <StarRatingComponent
              name={`star-${star}`}
              starCount={5}
              value={star}
              editing={false}
              style={{ marginRight: '10px' }}
            />
            <div style={{ width: '100%', background: '#e0e0e0', borderRadius: '5px', marginLeft: '10px' }}>
              <div
                style={{
                  width: `${(ratingsCount[star] || 0) / totalVotes * 100 || 0}%`,
                  background: '#f39c12',
                  height: '10px',
                  borderRadius: '5px'
                }}
              />
            </div>
            <span style={{ marginLeft: '10px' }}>{ratingsCount[star] || 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRating;
