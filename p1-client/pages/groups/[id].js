import Seo from '../../components/Seo'
import BasicLayout from '../../layouts/BasicLayout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { findGroup, updateGroup } from '../../api/group'
import ProfileSection from '../../components/profile/profileSection'
import { getStudents } from '../../api/student'
import { map } from 'lodash'
import Select from 'react-select'
import { Button } from 'semantic-ui-react'
import { Box, Card, CardContent, Typography, Grid } from '@mui/material'
import { getTeachers } from '../../api/teacher'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import 'react-datepicker/dist/react-datepicker.css'
import MyScheduler from '../../components/MySchedulerV3'

export default function Curso() {
  const router = useRouter()
  const [group, setGroup] = useState()
  const [all_teachers, setAll_teachers] = useState()
  const [teacher, setTeacher] = useState()
  const [all_students, setAll_students] = useState(undefined)
  const [actual_students, setActual_students] = useState(undefined)
  const { logout } = useAuth()

  useEffect(() => {
    ;(async () => {
      if (router.query.id) {
        const response = await findGroup(router.query.id)
        if (response) {
          setGroup(response)
          if (response.profesor !== undefined) {
            setTeacher({
              value: response.profesor._id,
              label: `${response.profesor.nombre} ${response.profesor.apellido1} ${response.profesor.apellido2}`,
              nombre: `${response.profesor.nombre} ${response.profesor.apellido1} ${response.profesor.apellido2}`,
              edad: response.profesor.edad,
              email: response.profesor.email,
            })
          }

          if (response.alumnos !== undefined) {
            setActual_students(
              map(response.alumnos, (x) => {
                return {
                  value: x._id,
                  label: `${x.nombre} ${x.apellido1} ${x.apellido2}`,
                  nombre: `${x.nombre} ${x.apellido1} ${x.apellido2}`,
                  edad: x.edad,
                  email: x.email,
                }
              }),
            )
          }
        }
        const response2 = await getStudents()
        if (response2) {
          setAll_students(
            map(response2, (x) => {
              return {
                value: x._id,
                label: `${x.nombre} ${x.apellido1} ${x.apellido2}`,
                nombre: `${x.nombre} ${x.apellido1} ${x.apellido2}`,
                edad: x.edad,
                email: x.email,
              }
            }),
          )
        }
        const response3 = await getTeachers()
        setAll_teachers(
          map(response3, (x) => {
            return {
              value: x._id,
              label: `${x.nombre} ${x.apellido1} ${x.apellido2}`,
              nombre: `${x.nombre} ${x.apellido1} ${x.apellido2}`,
              edad: x.edad,
              email: x.email,
            }
          }),
        )
      }
    })()
  }, [router.query.id])

  async function updateCallback(event) {
    event.preventDefault()

    const new_curso = {
      _id: group._id,
      alumnos: map(actual_students, (x) => {
        return x.value
      }),
      profesor: teacher.value,
    }

    const response = await updateGroup(new_curso, logout)

    if (response?._id) {
      toast.success('Curso actualizado')
    } else {
      toast.error('Ha ocurrido un error, durante la actualización')
    }
  }

  return (
    <BasicLayout>
      <Seo title="Aula virtual" description="Detalles de un aula virtual" />
      {group && (
        <div className="group">
          <div className="group__info">
            <div className="container">
              <div className="main-body">
                <div className="row gutters-sm">
                  <div className="col-md-4 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center">
                          <div className="mt-3">
                            <h2>{group.nombre}</h2>
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
      <div className="profesor">
        <div className="main-body">
          <div className="card">
            <h3> Profesor </h3>
          </div>
        </div>
        <div className="main-body">
          {all_students !== undefined && actual_students !== undefined && (
            <form onSubmit={updateCallback}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={10}>
                    <Select
                      label="alumnos"
                      options={all_teachers}
                      defaultValue={teacher}
                      onChange={(e) => setTeacher(e)}
                    />
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <Button color="blue" type="submit">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </form>
          )}
        </div>
        {teacher && <ProfileSection user={teacher} />}
      </div>
      <div className="alumnos">
        <div className="main-body">
          <div className="card">
            <h3> Alumnos </h3>
          </div>
          <div className="main-body">
            {all_students !== undefined && actual_students !== undefined && (
              <form onSubmit={updateCallback}>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={10}>
                      <Select
                        label="alumnos"
                        isMulti
                        options={all_students}
                        defaultValue={actual_students}
                        onChange={(e) => setActual_students(e)}
                      />
                    </Grid>
                    <Grid item xs={6} md={2}>
                      <Button color="blue" type="submit">
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            )}
          </div>
          {actual_students !== undefined && (
            <div>
              <TablaAlumnos alumnos={actual_students} />
            </div>
          )}
        </div>
      </div>

      <div className="profesor">
        <div className="main-body">
          <div className="card">
            <h3> Programar clases </h3>
          </div>
          <div className="main-body">
            {group && (
              <MyScheduler id={router.query.id} old_eventos={group.eventos} />
            )}
          </div>
        </div>
      </div>
    </BasicLayout>
  )
}

function TablaAlumnos(props) {
  const { alumnos } = props
  return (
    <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
      <Table className="tablaAlumnosCursos">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Edad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {map(alumnos, (row) => (
            <TableRow
              key={row.value}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.label}
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.edad}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
