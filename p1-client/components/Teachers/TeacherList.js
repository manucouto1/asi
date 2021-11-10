import React, { useState, useEffect } from "react";
import { getTeachers } from "../../api/teacher";
import { Button } from "semantic-ui-react";

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
    <div style={{ margin: "10%" }}>
      {teachers !== undefined &&
        teachers.map((x) => (
          <p>
            <a href={x.id}>{x.nombre}</a>
            <Button
              class="ui negative basic button"
              style={{ marginLeft: "1em" }}
            >
              Eliminar
            </Button>
          </p>
        ))}
      <div style={{ textAlign: "right" }}>
        <Button class="ui primary button">
          <a href="/teachers/registro_profesores">
            <p>Añadir nuevo profesor</p>
          </a>
        </Button>
      </div>
    </div>
  );
};
export default TeacherList;
