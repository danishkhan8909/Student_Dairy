import { useState } from "react";
import { addStudent } from "../services/api";

const StudentForm = ({ refresh }) => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    course: "",
    email: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStudent(form);
    refresh();
    setForm({ name: "", age: "", course: "", email: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="age" placeholder="Age" onChange={handleChange} />
      <input name="course" placeholder="Course" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <button>Add Student</button>
    </form>
  );
};

export default StudentForm;
