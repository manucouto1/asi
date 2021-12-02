import React, { useState, useEffect } from 'react'
import { getStudents } from '../../api/student'
import { Button } from 'semantic-ui-react'
import { map } from 'lodash'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { SECRETAIO_ROL } from '../../utils/constants'

export default function StudentList(props) {
  const { students } = props

  return (
    <div className="alumnosList">
      {students !== undefined && (
        <div>
          {map(students, (x) => {
            return (
              <a key={x._id} href={`/students/${x.id}`}>
                <Student
                  nombre={x.nombre}
                  apellido1={x.apellido1}
                  apellido2={x.apellido2}
                  edad={x.edad}
                  email={x.email}
                />
              </a>
            )
          })}
        </div>
      )}
      {sessionStorage.getItem('user_role') === SECRETAIO_ROL && (
        <div>
          <Button className="ui button">
            <a href="/students/registro_alumnos">
              <p>Añadir nuevo alumno</p>
            </a>
          </Button>
        </div>
      )}
    </div>
  )
}

function Student(props) {
  const { nombre, apellido1, apellido2, email, edad } = props
  return (
    <Card sx={{ display: 'inline-block', margin: '20px' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {email}
        </Typography>
        <Typography variant="h5" component="div">
          {nombre} {apellido1} {apellido2} {bull} {edad} años
        </Typography>
      </CardContent>
    </Card>
  )
}

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
)
