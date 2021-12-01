import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getAllEvents } from '../../api/horarios'
import { groupDetails } from '../../components/GroupDetails/GroupDetails'
import { findGroup, getGroups } from '../../api/group'
import ReactDOMServer from 'react-dom/server'
import { Grid } from 'semantic-ui-react'
import { map } from 'lodash'

export default function Scheduler() {
  const router = useRouter()
  const [resources, setResources] = useState([])
  const [events, setEvents] = useState([])
  const [lunes, setLunes] = useState()

  const setNewLunes = (args) => {
    console.log(args)
    const n_lunes = args.start.firstDayOfWeek().addDays(2)
    setLunes(n_lunes)
  }

  useEffect(() => {
    ;(async () => {
      const { DayPilot } = require('daypilot-pro-react')
      const lunes = DayPilot.Date.today().firstDayOfWeek().addDays(2)
      const groups = await getGroups()
      setLunes(lunes)
      setResources([
        {
          name: 'Lunes',
          id: 'lun',
          expanded: true,
          children: map(groups, (group) => {
            return {
              name: group.nombre,
              id: `lun_${group._id}`,
            }
          }),
        },
        {
          name: 'Martes',
          id: 'mar',
          expanded: true,
          children: map(groups, (group) => {
            return {
              name: group.nombre,
              id: `mar_${group._id}`,
            }
          }),
        },
        {
          name: 'Miercoles',
          id: 'mie',
          expanded: true,
          children: map(groups, (group) => {
            return {
              name: group.nombre,
              id: `mie_${group._id}`,
            }
          }),
        },
        {
          name: 'Jueves',
          id: 'jue',
          expanded: true,
          children: map(groups, (group) => {
            return {
              name: group.nombre,
              id: `jue_${group._id}`,
            }
          }),
        },
        {
          name: 'Viernes',
          id: 'vie',
          expanded: true,
          children: map(groups, (group) => {
            return {
              name: group.nombre,
              id: `vie_${group._id}`,
            }
          }),
        },
        {
          name: 'Sábado',
          id: 'sab',
          expanded: true,
          children: map(groups, (group) => {
            return {
              name: group.nombre,
              id: `sab_${group._id}`,
            }
          }),
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

    // Get monday of the current week
    /*  const lunes = DayPilot.Date.today().firstDayOfWeek().addDays(-1).toString();
        const sabado = DayPilot.Date.today().addDays(5).toString();
        console.log(lunes)
        console.log(sabado) */

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
      // rowMinHeight: 50,
      eventClickHandling: 'Enabled',

      onEventClicked: (args) => {
        router.push('/groups/' + args.e.data.id)
      },

      onBeforeTimeHeaderRender: (args) => {
        // args.header['backColor'] = "#e0e0e0"
        // args.header['style'] = "box-sizing: border-box; border-right: 1px solid #ccc; display: flex; align-items: center; justify-content: center;"
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

          // args.html= "<h1> Test </h1>"
        },
      }),
      treeEnabled: true,
    }

    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <DayPilotNavigator onTimeRangeSelect={setNewLunes} />
            </Grid.Column>
            <Grid.Column width={13}>
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
