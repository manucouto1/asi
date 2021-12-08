import Seo from '../../components/Seo'
import BasicLayout from '../../layouts/BasicLayout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { findGroup, updateGroup } from '../../api/group'
import ProfileSection from '../../components/profile/profileSection'
import {
  getStudents,
  easyUpdateStudent,
  getStudentByAsistencia,
} from '../../api/student'
import { map, filter } from 'lodash'
import Select from 'react-select'
import { Button } from 'semantic-ui-react'
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
import { Grid, Tab } from 'semantic-ui-react'
import { getMeApi } from '../../api/user'
import { getRole } from '../../api/roles'
import SchedulerV4 from '../../components/MySchedulerV4/MySchedulerV4'
import MyScheduler from '../../components/MySchedulerV3'

export default function Curso() {
  const router = useRouter()
  const [group, setGroup] = useState()
  const [all_teachers, setAll_teachers] = useState()
  const [teacher, setTeacher] = useState()
  const [all_students, setAll_students] = useState(undefined)
  const [actual_students, setActual_students] = useState(undefined)
  const { logout } = useAuth()
  const [role, setRole] = useState(false)
  const [events, setEvents] = useState([])
  const [asistentes, setAsistentes] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(undefined)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    ;(async () => {
      const result1 = await getMeApi(logout)
      const result2 = await getRole(result1.tipo_rol)
      setRole(result2.nombre)
    })()
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
                  asistencias: x.asistencias,
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
                asistencias: x.asistencias,
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

  async function updateAsistentesCallback(event) {
    event.preventDefault()
    map(asistentes, async (x) => {
      const new_asistencias = new Set(
        map(
          filter(x.asistencias, (xx) => xx?._id),
          (xxx) => xxx._id,
        ),
      )

      if (!new_asistencias.has(selectedEvent)) {
        new_asistencias.add(selectedEvent)
        console.log('new_asistencias', new_asistencias)
        const new_alumno = {
          _id: x.value,
          asistencias: filter(Array.from(new_asistencias), (xxx) => xxx),
        }

        const response = await easyUpdateStudent(x.value, new_alumno)
        if (response?._id) {
          x.asistencias = response.asistencias
          toast.success('Curso actualizado')
        } else {
          toast.error('Ha ocurrido un error, durante la actualización')
        }
      } else {
        toast.info('Nothing new to update')
      }
    })
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
      <div className="main-body">
        <Grid>
          {role === 'Secretario' ? (
            <Grid.Row>
              <Grid.Column width={6}>
                <div className="card">
                  <h3> Profesor </h3>
                </div>
              </Grid.Column>
              <Grid.Column width={10}>
                <div className="card">
                  <h3> Alumnos </h3>
                </div>
              </Grid.Column>
            </Grid.Row>
          ) : (
            <Grid.Row>
              <Grid.Column width={4}>
                <div className="card">
                  <h3> Profesor </h3>
                </div>
              </Grid.Column>
              <Grid.Column width={12}>
                <div className="card">
                  <h3> Alumnos </h3>
                </div>
              </Grid.Column>
            </Grid.Row>
          )}
          {role === 'Secretario' && (
            <Grid.Row>
              <Grid.Column width={6}>
                {all_students !== undefined && actual_students !== undefined && (
                  <form onSubmit={updateCallback}>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={11}>
                          <Select
                            label="teachers"
                            options={all_teachers}
                            defaultValue={teacher}
                            onChange={(e) => setTeacher(e)}
                          />
                        </Grid.Column>
                        <Grid.Column className="row_no_ml" width={3}>
                          <Button color="blue" type="submit">
                            Submit
                          </Button>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </form>
                )}
              </Grid.Column>
              <Grid.Column width={10}>
                {all_students !== undefined && actual_students !== undefined && (
                  <form onSubmit={updateCallback}>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={13}>
                          <Select
                            label="alumnos"
                            isMulti
                            options={all_students}
                            defaultValue={actual_students}
                            onChange={(e) => setActual_students(e)}
                          />
                        </Grid.Column>
                        <Grid.Column className="row_no_ml" width={3}>
                          <Button color="blue" type="submit">
                            Submit
                          </Button>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </form>
                )}
              </Grid.Column>
            </Grid.Row>
          )}
          {role === 'Secretario' ? (
            <Grid.Row>
              <Grid.Column width={6}>
                {teacher && <ProfileSection user={teacher} />}
              </Grid.Column>
              <Grid.Column width={10}>
                {actual_students !== undefined && (
                  <TablaAlumnos alumnos={actual_students} />
                )}
              </Grid.Column>
            </Grid.Row>
          ) : (
            <Grid.Row>
              <Grid.Column width={4}>
                {teacher && <ProfileSection user={teacher} />}
              </Grid.Column>
              <Grid.Column width={12}>
                {actual_students !== undefined && (
                  <TablaAlumnos alumnos={actual_students} />
                )}
              </Grid.Column>
            </Grid.Row>
          )}
        </Grid>
      </div>
      {group && role == 'Secretario' && (
        <div className="profesor">
          <div className="main-body">
            <div className="card">
              <h3> Programar clases </h3>
            </div>
            <div className="main-body">
              <MyScheduler id={router.query.id} old_eventos={group.eventos} />
            </div>
          </div>
        </div>
      )}
      {group && role == 'Profesor' && (
        <div className="profesor">
          <div className="main-body">
            <div className="card">
              <h3> Horarios </h3>
            </div>
            <div className="main-body">
              <SchedulerV4
                id={router.query.id}
                events={events}
                setEvents={setEvents}
                setActiveIndex={setActiveIndex}
                setSelectedEvent={setSelectedEvent}
                setAsistentes={setAsistentes}
              />
            </div>
          </div>
          <div className="main-body">
            <div className="card">
              <h3> Asistencia </h3>
            </div>
            <div className="main-body">
              <Tab
                activeIndex={activeIndex}
                onTabChange={async (e, data) => {
                  const eventId = data.panes[data.activeIndex].eventId
                  const response = await getStudentByAsistencia(eventId)

                  setAsistentes(
                    map(response, (x) => {
                      return {
                        value: x._id,
                        label: `${x.nombre} ${x.apellido1} ${x.apellido2}`,
                        nombre: `${x.nombre} ${x.apellido1} ${x.apellido2}`,
                        edad: x.edad,
                        email: x.email,
                        asistencias: x.asistencias,
                      }
                    }),
                  )
                  setActiveIndex(data.activeIndex)
                  setSelectedEvent(eventId)
                }}
                renderActiveOnly={true}
                menu={{ fluid: true, vertical: true, tabular: true }}
                panes={map(events, (x) => {
                  const start = new Date(x.start)
                  const end = new Date(x.end)
                  return {
                    eventId: x._id,
                    menuItem: `week ${x.week} | ${
                      x.dayOfWeek
                    } ${start.getHours()}:${start.getMinutes()} - ${end.getHours()}:${end.getMinutes()}`,
                    render: () => {
                      return (
                        <Tab.Pane key={x._id}>
                          {all_students !== undefined &&
                            actual_students !== undefined && (
                              <form onSubmit={updateAsistentesCallback}>
                                <Grid>
                                  <Grid.Row>
                                    <h1>
                                      Asistentes clase semana {x.week} horario:{' '}
                                      {start.getHours()}:{start.getMinutes()}h -{' '}
                                      {end.getHours()}:{end.getMinutes()}h
                                    </h1>
                                  </Grid.Row>
                                  <Grid.Row>
                                    <Grid.Column width={13}>
                                      <Select
                                        label="alumnos"
                                        isMulti
                                        options={all_students}
                                        defaultValue={asistentes}
                                        onChange={(e) => {
                                          setAsistentes(e)
                                        }}
                                      />
                                    </Grid.Column>
                                    <Grid.Column
                                      className="row_no_ml"
                                      width={3}
                                    >
                                      <Button color="blue" type="submit">
                                        Submit
                                      </Button>
                                    </Grid.Column>
                                  </Grid.Row>
                                  <Grid.Row>
                                    <TablaAlumnos alumnos={asistentes} />
                                  </Grid.Row>
                                </Grid>
                              </form>
                            )}
                        </Tab.Pane>
                      )
                    },
                  }
                })}
              />
            </div>
          </div>
        </div>
      )}
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
