import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getAllEvents } from '../../api/horarios'
import { groupDetails } from '../../components/Group/GroupDetails'
import { findGroup, getGroups } from '../../api/group'
import ReactDOMServer from 'react-dom/server'
import { Grid } from 'semantic-ui-react'

export default function SchedulerV4(props) {
  const { id } = props
  const router = useRouter()
  const [resources, setResources] = useState([])
  const [events, setEvents] = useState([])
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
      setEvents(eventos)
    })()
  }, [])

  if (
    typeof window !== 'undefined' &&
    typeof window.navigator !== 'undefined'
  ) {
    const { DayPilot } = require('daypilot-pro-react')
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

      onEventClicked: (args) => {
        router.push(`/events/${id}/${args.e.data.id}`)
      },

      onBeforeCellRender: (args) => {
        const { cell } = args
        if (cell.isParent) {
          cell.cssClass = 'parent-cell'
        }
      },

      eventHoverHandling: 'Bubble',
      bubble: new DayPilot.Bubble({
        onLoad: (args) => {
          args.async = true
          ;(async () => {
            const response = await findGroup(args.source.data.id)
            args.html =
              response != undefined && response != null
                ? printClassInfo(response)
                : '<h1> Loading... </h1>'
            args.loaded()
          })()
        },
      }),
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
