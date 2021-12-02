import { Tab } from 'semantic-ui-react'
import CourseList from '../../components/Courses/CourseList'
import TeacherList from '../../components/Teachers/TeacherList'
import StudentList from '../../components/Students/StudentList'
import { getTeachers } from '../../api/teacher'
import { getStudents } from '../../api/student'
import { getCourses } from '../../api/course'
import React, { useState, useEffect } from 'react'

export default function SecretariaPanel() {
  const [students, setStudents] = useState()
  const [teachers, setTeachers] = useState()
  const [courses, setCourses] = useState()

  useEffect(() => {
    ;(async () => {
      const response = await getStudents()
      setStudents(response)
    })()
    ;(async () => {
      const response = await getTeachers()
      setTeachers(response)
    })()
    ;(async () => {
      const response = await getCourses()
      setCourses(response)
    })()
  }, [])

  const panes = [
    {
      menuItem: 'Cursos',
      render: () => (
        <Tab.Pane attached={false}>
          <CourseList courses={courses} setCourses={setCourses} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Profesores',
      render: () => (
        <Tab.Pane attached={false}>
          <TeacherList teachers={teachers} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Alumnos',
      render: () => (
        <Tab.Pane attached={false}>
          <StudentList students={students} />
        </Tab.Pane>
      ),
    },
  ]
  return (
    <Tab
      key="secretariaPanel"
      className="secretaria__tab"
      menu={{ secondary: true, pointing: true }}
      panes={panes}
    />
  )
}
