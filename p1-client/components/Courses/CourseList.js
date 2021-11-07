import React, { useState, useEffect } from "react";
import { getCourses } from "../../api/course";

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
    <div style={{margin: "10%"}}>
      {courses !== undefined &&
        courses.map((x) => (
          <p>
            <a href={x.id}>{x.idioma + " " + x.nivel}</a>
          </p>
        ))}
    </div>
  );
};
export default CourseList;
