import type { WalkingSpot } from "../types";

interface Props {
  spot: WalkingSpot;
}

const StarRating = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="star-rating">
      {Array.from({ length: 5 }, (_, i) => {
        if (i < full) return <span key={i}>★</span>;
        if (i === full && half) return <span key={i} style={{ opacity: 0.5 }}>★</span>;
        return <span key={i} style={{ opacity: 0.2 }}>★</span>;
      })}
      <span className="rating-number">{rating}</span>
    </span>
  );
};

export default function SpotCard({ spot }: Props) {
  return (
    <div className="spot-card">
      <img src={spot.image_url} alt={spot.name} className="spot-image" />
      <div className="spot-body">
        <h3 className="spot-name">{spot.name}</h3>
        <StarRating rating={spot.rating} />
        <p className="spot-address">📍 {spot.address}</p>
        <p className="spot-desc">{spot.description}</p>
        <div className="spot-tags">
          {spot.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
