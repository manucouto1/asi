import React, { useState, useEffect } from 'react'
import { deleteCourse, getCourses } from '../../api/course'
import { map } from 'lodash'
import Link from 'next/link'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from '@mui/material'

export default function CourseList(props) {
  const { courses, setCourses } = props

  return (
    <div className="courseList">
      {courses !== undefined && (
        <div>
          {map(courses, (x) => {
            return <Course key={x._id} curso={x} setCurso={setCourses} />
          })}
        </div>
      )}
      <Button color="primary">
        <Link href="/courses/crear_curso">
          <p>Añadir nuevo curso</p>
        </Link>
      </Button>
    </div>
  )
}

function Course(props) {
  const { curso, setCurso } = props
  const { id, nombre, idioma, nivel } = curso

  async function handleDeleteCourse() {
    const response = await deleteCourse(id)

    if (response.data.id) {
      const courseResponse = await getCourses()
      setCurso(courseResponse)
    }
  }

  return (
    <Card sx={{ display: 'inline-block', margin: '20px' }}>
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
        <Link href={`/courses/${id}`}>
          <Button size="small" color="primary">
            Ver curso
          </Button>
        </Link>
        {sessionStorage.getItem('user_role').toLowerCase() === 'secretario' && (
          <Button onClick={handleDeleteCourse} size="small" color="error">
            Eliminar
          </Button>
        )}
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
