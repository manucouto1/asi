import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getAllEvents } from '../../api/horarios'
import { groupDetails } from '../../components/Group/GroupDetails'
import { findGroup, getGroups } from '../../api/group'
import { getStudentByAsistencia } from '../../api/student'
import ReactDOMServer from 'react-dom/server'
import { Grid } from 'semantic-ui-react'
import { map } from 'lodash'

export default function SchedulerV4(props) {
  const {
    id,
    events,
    setEvents,
    setActiveIndex,
    setSelectedEvent,
    setAsistentes,
  } = props
  const router = useRouter()
  const [resources, setResources] = useState([])
  const [lunes, setLunes] = useState()

  const setNewLunes = (args) => {
    const n_lunes = args.start.firstDayOfWeek().addDays(2)
    setLunes(n_lunes)
  }

  useEffect(() => {
    ;(async () => {
      const { DayPilot } = require('daypilot-pro-react')
      const lunes = DayPilot.Date.today().firstDayOfWeek().addDays(2)
      setLunes(lunes)
      setResources([
        {
          name: 'Lunes',
          id: `lun_${id}`,
          expanded: true,
        },
        {
          name: 'Martes',
          id: `mar_${id}`,
          expanded: true,
        },
        {
          name: 'Miercoles',
          id: `mie_${id}`,
          expanded: true,
        },
        {
          name: 'Jueves',
          id: `jue_${id}`,
          expanded: true,
        },
        {
          name: 'Viernes',
          id: `vie_${id}`,
          expanded: true,
        },
        {
          name: 'Sábado',
          id: `sab_${id}`,
          expanded: true,
        },
      ])
      const eventos = await getAllEvents()
      var count = 0
      setEvents(
        map(eventos, (evento) => {
          evento['order'] = count
          count += 1
          return evento
        }),
      )
      setActiveIndex(1)
      setSelectedEvent(eventos[1])
    })()
  }, [])

  if (
    typeof window !== 'undefined' &&
    typeof window.navigator !== 'undefined'
  ) {
    const {
      DayPilotScheduler,
      DayPilotNavigator,
    } = require('daypilot-pro-react')

    const config = {
      resources: resources,
      events: events,
      locale: 'es-es',
      timeHeaders: [{ groupBy: 'Hour' }, { groupBy: 'Cell', format: 'mm' }],
      scale: 'CellDuration',
      cellDuration: 30,
      businessBeginsHour: 8,
      businessEndsHour: 21,
      showNonBusiness: false,
      cellWidthSpec: 'Auto',
      eventClickHandling: 'Enabled',

      onEventClicked: async (x) => {
        const response = await getStudentByAsistencia(x.e.data._id)

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
        setActiveIndex(x.e.data.order)
        setSelectedEvent(x.e.data._id)
      },

      onBeforeCellRender: (args) => {
        const { cell } = args
        if (cell.isParent) {
          cell.cssClass = 'parent-cell'
        }
      },

      treeEnabled: true,
    }

    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <DayPilotNavigator onTimeRangeSelect={setNewLunes} />
            </Grid.Column>
            <Grid.Column width={12}>
              <DayPilotScheduler startDate={lunes} {...config} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }

  return <div></div>
}

function printClassInfo(group) {
  return ReactDOMServer.renderToStaticMarkup(groupDetails(group)).toString()
}
