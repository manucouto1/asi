import React, { useState, useEffect } from 'react'
import { getCourses } from '../../api/course'
import { map } from 'lodash'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from '@mui/material'

export default function CourseList() {
  const [courses, setCourses] = useState()

  useEffect(() => {
    ;(async () => {
      const response = await getCourses()
      setCourses(response)
    })()
  }, [])

  return (
    <div className="courseList">
      {courses !== undefined && (
        <div>
          {map(courses, (x) => {
            return<a href={`/courses/${x.id}`}><Course key={x._id} curso={x} /></a>
          })}
        </div>
      )}
      <Button color="primary">
        <a href="/courses/crear_curso">
          <p>Añadir nuevo curso</p>
        </a>
      </Button>
    </div>
  )
}

function Course(props) {
  const { curso } = props
  const { id, nombre, idioma, nivel } = curso
  const next_url = `/courses/${id}`
  return (
    <Card sx={{ display: 'inline-block', margin: '20px' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {idioma !== undefined && idioma.nombre}
          {console.log(nivel)}
          {bull}
          {nivel !== undefined && nivel.codigo}
        </Typography>
        <Typography variant="h5" component="div">
          {nombre}
        </Typography>
      </CardContent>
      <CardActions>
        <Button href={next_url} size="small" color="primary">
          {' '}
          Ver curso
        </Button>
      </CardActions>
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
