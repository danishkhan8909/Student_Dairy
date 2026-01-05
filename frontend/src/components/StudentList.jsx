import { deleteStudent } from "../services/api";

const StudentList = ({ students, refresh }) => {
  return (
    <ul>
      {students.map((s) => (
        <li key={s._id}>
          {s.name} - {s.course}
          <button onClick={() => {
            deleteStudent(s._id);
            refresh();
          }}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default StudentList;
