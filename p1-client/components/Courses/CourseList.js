import React, { useState, useEffect } from "react";
import { deleteCourse, getCourses } from "../../api/course";
import { map } from "lodash";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";

export default function CourseList() {
  const [courses, setCourses] = useState();

  useEffect(() => {
    (async () => {
      const response = await getCourses();
      setCourses(response);
    })();
  }, []);

  return (
    <div className="courseList">
      {courses !== undefined && (
        <div>
          {map(courses, (x) => {
            return <Course key={x._id} curso={x} setCourses={setCourses} />;
          })}
        </div>
      )}
      <Button color="primary">
        <a href="/courses/crear_curso">
          <p>Añadir nuevo curso</p>
        </a>
      </Button>
    </div>
  );
}

function Course(props) {
  const { curso, setCourses } = props;
  const { id, nombre, idioma, nivel } = curso;

  async function handleDeleteCourse() {
    const response = await deleteCourse(id);

    if (response.data.id) {
      const courseResponse = await getCourses();
      setCourses(courseResponse);
    }
  }

  return (
    <Card sx={{ display: "inline-block", margin: "20px" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {idioma !== undefined && idioma.nombre}
          {bull}
          {nivel !== undefined && nivel.codigo}
        </Typography>
        <Typography variant="h5" component="div">
          {nombre}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Ver curso
        </Button>
        {sessionStorage.get("user_role").toLowerCase() === "secretario" && (
          <Button onClick={handleDeleteCourse} size="small" color="error">
            Eliminar
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
