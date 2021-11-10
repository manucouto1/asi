import React, { useState, useEffect } from "react";
import { getCourses } from "../../api/course";
import { Button } from "semantic-ui-react";

const CourseList = () => {
  const [courses, setCourses] = useState();

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getCourses();
      setCourses(response);
    }
    fetchMyAPI();
  }, []);

  return (
    <div style={{ margin: "10%" }}>
      {courses !== undefined &&
        courses.map((x) => (
          <div style={{ marginBottom: "0.5em" }}>
            <a href={x.id}>{x.idioma + " " + x.nivel}</a>
            <Button
              class="ui negative basic button"
              style={{ marginLeft: "1em" }}
            >
              Eliminar
            </Button>
          </div>
        ))}
        <Button class="ui primary button">
          <a href="/courses/crear_curso">
            <p>Añadir nuevo curso</p>
          </a>
        </Button>
    </div>
  );
};
export default CourseList;
