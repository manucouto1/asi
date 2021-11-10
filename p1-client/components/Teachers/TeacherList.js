import React, { useState, useEffect } from "react";
import { getTeachers } from "../../api/teacher";

const TeacherList = () => {
  const [teachers, setTeachers] = useState();

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getTeachers();
      setTeachers(response);
    }
    fetchMyAPI();
  }, []);

  return (
    <div style={{margin: "10%"}}>
      {teachers !== undefined &&
        teachers.map((x) => (
          <p>
            <a href={x.id}>{x.nombre}</a>
          </p>
        ))}
    </div>
  );
};
export default TeacherList;
