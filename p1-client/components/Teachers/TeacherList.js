import React, { useState, useEffect } from "react";
import { getTeachers } from "../../api/teacher";
import { Button } from "semantic-ui-react";
import {map} from 'lodash';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Image, Item } from 'semantic-ui-react'

export default function TeacherList () {
  const [teachers, setTeachers] = useState();

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getTeachers();
      setTeachers(response);
    }
    fetchMyAPI();
  }, []);

  return (
    <div className="teacherList">
      {teachers !== undefined &&
          <div>
            {
              map(teachers, (x) => {
                return (
                <Teacher 
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
          <a href="/teachers/registro_profesores">
            <p>Añadir nuevo profesor</p>
          </a>
        </Button>
      </div>
    </div>
  );
};

function Teacher(props){
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
