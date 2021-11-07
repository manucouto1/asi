import React, { useState, useEffect } from "react";
import { getStudents } from "../../api/student";

const StudentList = () => {
  const [students, setStudents] = useState();

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getStudents();
      setStudents(response);
    }
    fetchMyAPI();
  }, []);

  return (
    <div style={{margin: "10%"}}>
      {students !== undefined &&
        students.map((x) => (
          <p>
            <a href={x.id}>{x.nombre}</a>
          </p>
        ))}
    </div>
  );
};
export default StudentList;
