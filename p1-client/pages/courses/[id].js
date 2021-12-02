import Seo from '../../components/Seo'
import BasicLayout from '../../layouts/BasicLayout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { findCourse, updateCourse } from '../../api/course'
import { map } from 'lodash'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import 'react-datepicker/dist/react-datepicker.css'
import { createGroup } from '../../api/group'
import { Form } from 'semantic-ui-react'

import { Link } from '@mui/material'
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from '@mui/material'

export default function Curso() {
  const router = useRouter()
  const [groupName, setGroupName] = useState('')
  const [course, setACourse] = useState()
  const { logout } = useAuth()

  useEffect(() => {
    ;(async () => {
      if (router.query.id) {
        const response = await findCourse(router.query.id)
        setACourse(response)
      }
    })()
  }, [router.query.id])

  const handleSubmit = async () => {
    console.log('Creating group')
    const new_group = {
      nombre: groupName,
    }
    console.log('Traying to create group ', new_group)
    const response = await createGroup(new_group, logout)
    if (response?._id) {
      toast.success('Grupo creado')
      course.grupos.push(response._id)
      const new_curso = {
        _id: course._id,
        grupos: course.grupos,
      }
      const response2 = await updateCourse(new_curso, logout)
      if (response2?._id) {
        toast.success('Grupo asignado a curso')
      } else {
        toast.error('Error al asignar el grupo al curso')
      }
    } else {
      toast.error('Ha ocurrido un error al crear el grupo')
    }
  }

  const handleChange = (e, { name, value }) => {
    setGroupName(value)
  }

  return (
    <BasicLayout>
      <Seo title="Aula virtual" description="Detalles de un aula virtual" />
      {course && (
        <div className="course">
          <div className="course__info">
            <div className="container">
              <div className="main-body">
                <div className="row gutters-sm">
                  <div className="col-md-4 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center">
                          <div className="mt-3">
                            <h2>{course.nombre}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="alumnos">
        <div className="main-body">
          <div className="card">
            <h3> Lista de grupos </h3>
          </div>
          <div className="main-body">
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Input
                  placeholder="Group Name"
                  name="nombre"
                  onChange={handleChange}
                  value={groupName}
                  width={14}
                />
                <Button type="submit">Create Group</Button>
              </Form.Group>
            </Form>
            {course != undefined &&
              course.grupos !== [] &&
              map(course.grupos, (x) => {
                return <Group key={x.id} nombre={x.nombre} id={x.id} />
              })}
          </div>
        </div>
      </div>
    </BasicLayout>
  )
}

function Group(props) {
  const { nombre, id } = props

  async function handleDeleteGroup() {
    const response = await deleteGroup(id)

    if (response?.data?.id) {
      // RECARGAR LA PÄINA!!
    }
  }

  return (
    <Card sx={{ display: 'inline-block', margin: '20px' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {nombre}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/groups/${id}`}>
          <Button size="small" color="primary">
            Editar grupo
          </Button>
        </Link>
        {sessionStorage.getItem('user_role').toLowerCase() === 'secretario' && (
          <Button onClick={handleDeleteGroup} size="small" color="error">
            Eliminar
          </Button>
        )}
      </CardActions>
    </Card>
  )
}
