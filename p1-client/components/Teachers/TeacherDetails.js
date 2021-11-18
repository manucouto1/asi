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
        <p>Nombre: {teacher !== undefined && teacher !== null && `${teacher.nombre} ${teacher.apellido1} ${teacher.apellido2}`}</p>
        <p>Edad: {teacher !== undefined && teacher !== null && teacher.edad}</p>
        <p>Dirección: {teacher !== undefined && teacher !== null && teacher.direccion}</p>
      </div>
    </div>
  );
};

export default TeacherDetails;
