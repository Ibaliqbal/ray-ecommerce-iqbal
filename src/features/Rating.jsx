import { IoIosStar } from "react-icons/io";
const Rating = ({ rating }) => {
  const starElements = [];

  for (let i = 1; i <= Math.round(rating / 2); i++) {
    starElements.push(<IoIosStar key={i} className="text-yellow-400" />);
  }
  return (
    <span className="text-lg inline-flex items-center gap-1">{starElements} {rating}</span>
  );
};

export default Rating;
