const Part = ({ part }) => {
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  );
};

const Course = ({ course }) => {
  const totalExercises = course.parts.reduce((total, part) => {
    return (total += part.exercises);
  }, 0);

  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}
      <p>total of {totalExercises} exercises</p>
    </div>
  );
};

export { Course }