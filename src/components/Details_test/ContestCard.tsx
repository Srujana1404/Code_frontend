import './ContestCard.css';

type ContestCardProps = {
  title: string;
  description: string;
  status: string;
  onStart: () => void;
};

export default function ContestCard({
  title,
  description,
  status,
  onStart,
}: ContestCardProps) {
  return (
    <div className="contest-card">
      <h2 className="contest-title">{title}</h2>
      <p className="contest-description">{description}</p>
      <button
        disabled={status === "inactive"}
        onClick={onStart}
      >
        Start Contest
      </button>
    </div>
  );
}

