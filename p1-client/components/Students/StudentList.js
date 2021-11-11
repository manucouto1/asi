import React, { useState, useEffect } from "react";
import { getStudents } from "../../api/student";
import { Button } from "semantic-ui-react";
import {map} from 'lodash';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function StudentList() {
  const [students, setStudents] = useState();

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getStudents();
      console.log(response)
      setStudents(response);
    }
    fetchMyAPI();
  }, []);

  return (
    <div style={{ margin: "10%" }}>
      {students !== undefined && 
        <div>
          {
            map(students, (x) => {
              return (
              <Student 
                nombre={x.nombre} 
                apellido1={x.apellido1} 
                apellido2={x.apellido2} 
                edad={x.edad}
                email={x.email}
              />)
            })
          }
        </div>
      }
      <div>
        <Button class="ui primary button">
          <a href="/students/registro_alumnos">
            <p>Añadir nuevo alumno</p>
          </a>
        </Button>
      </div>
    </div>
  );
};


function Student(props){
  const {nombre, apellido1, apellido2, email, edad} = props
  return (
    <Card sx={{display: 'inline-block', margin: '20px'}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {email}
        </Typography>
        <Typography variant="h5" component="div">
          {nombre} {apellido1} {apellido2} {bull} {edad} años
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