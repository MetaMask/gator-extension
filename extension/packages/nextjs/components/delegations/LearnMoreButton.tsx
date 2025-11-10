const LearnMoreButton = ({ href }: { href: string }) => {
  return (
    <div className="mb-4">
      <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
        📚 Learn More in Documentation
      </a>
    </div>
  );
};

export default LearnMoreButton;
