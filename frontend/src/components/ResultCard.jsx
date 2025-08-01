const ResultCard = ({ result }) => {
  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <h3 className="text-lg font-semibold">Roll No: {result.rollNumber}</h3>
      <p>Quiz: {result.quizTitle}</p>
      <p>Marks: {result.marks} / {result.totalMarks}</p>
      <p>Time Taken: {result.timeTaken} mins</p>
      <p>Status: {result.status}</p>
    </div>
  );
};

export default ResultCard;
