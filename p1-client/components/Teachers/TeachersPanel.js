import { Tab } from 'semantic-ui-react'
import StudentList from '../../components/Students/StudentList'
import GroupList from '../../components/Group/GroupList'
import { getTeacherByUserId } from '../../api/teacher'
import { getGroupsByUserId } from '../../api/group'
import { useState, useEffect } from 'react'

export default function TeachersPanel(props) {
  const { id } = props
  const [students, setStudents] = useState()
  const [groups, setGroups] = useState()

  useEffect(() => {
    ;(async () => {
      const response = await getTeacherByUserId(id)
      if (response[0]?._id) {
        const response2 = await getGroupsByUserId(response[0]._id)
        setGroups(response2)

        var al_ids = []
        var alumnos = []

        response2.forEach((grupo) => {
          grupo.alumnos.forEach((alumno) => {
            if (!al_ids.includes(alumno._id)) {
              alumnos.push(alumno)
              al_ids.push(alumno._id)
            }
          })
        })

        setStudents(alumnos)
      }
    })()
  }, [])

  const panes = [
    {
      menuItem: 'Grupos',
      render: () => (
        <Tab.Pane attached={false}>
          <GroupList groups={groups} />
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
      key="teachersPanel"
      className="secretaria__tab"
      manu={{ secondary: true, pointing: true }}
      panes={panes}
    />
  )
}
