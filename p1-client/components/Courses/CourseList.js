import React, { useState, useEffect } from "react";
import { getCourses } from "../../api/course";
import {map} from "lodash";
import { Button } from "semantic-ui-react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { display } from "@mui/system";

export default function CourseList() {
  const [courses, setCourses] = useState();

  useEffect(() => {
    (async () => {
      const response = await getCourses();
      setCourses(response);
    })()
  }, []);

  return (
    <div className="courseList">
      {courses !== undefined && 
        <div>
          {map(courses, (x) => {
            return (<Course nombre={x.nombre} idioma={x.idioma.nombre} nivel={x.nivel.nombre} />)
          })}          
        </div>
      }
      <Button>
        <a href="/courses/crear_curso">
          <p>Añadir nuevo curso</p>
        </a>
      </Button>
    </div>
  );
};

function Course(props){
  const {nombre, idioma, nivel} = props
  return (
    <Card sx={{display: 'inline-block', margin: '20px'}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {idioma}{bull}{nivel}
        </Typography>
        <Typography variant="h5" component="div">
          {nombre}
        </Typography>
      </CardContent>
    </Card>
  );
}

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);