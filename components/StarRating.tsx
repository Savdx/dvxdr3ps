import { StarIcon } from "./Icons";

export default function StarRating({
  rating,
  showValue = true,
}: {
  rating: number;
  showValue?: boolean;
}) {
  const v = Number(rating) || 0;
  const rounded = Math.round(v);
  return (
    <div className="flex items-center gap-[2px]">
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} filled={i <= rounded} size={12} />
      ))}
      {showValue && (
        <span className="ml-1.5 text-[12px] font-bold text-acc">
          {v.toFixed(1)}
        </span>
      )}
    </div>
  );
}
