import React, { useState, useEffect } from "react";
import { getTeacher } from "../../api/teacher";

const TeacherDetails = ({ id }) => {
  const [teacher, setTeacher] = useState();

  useEffect(() => {
    async function fetchMyAPI() {
      if (id !== undefined) {
        const response = await getTeacher(id);
        setTeacher(response);
      }
    }
    fetchMyAPI();
  }, [id]);

  return (
    <div style={{ padding: "2%" }}>
      <h3>Detalles de un profesor</h3>
      <div>
        <p>Nombre: {teacher !== undefined && teacher.nombre}</p>
        <p>Login: {teacher !== undefined && teacher.login}</p>
      </div>
    </div>
  );
};

export default TeacherDetails;
