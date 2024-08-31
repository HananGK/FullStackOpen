const Header = ({ course }) => <h2>{course.name}</h2>

const Part = ({ id, name, exercises }) => <p key={id}>{name} {exercises}</p>

const Content = ({ course }) => {
  const parts = course.parts
  return (
    <div>
      {parts.map((part) => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Total = ({ course }) => {
  const parts = course.parts
  const total = parts.reduce((accumulator, current) => accumulator + current.exercises, 0)
  return (
    <h3>total of {total} exercises</h3>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => <Course key={course.id} course={course} />)}
    </div>
  )
}

export default Courses