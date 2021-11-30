import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { createEvent } from '../../api/horarios'
import { groupDetails } from '../GroupDetails/GroupDetails'
import ReactDOMServer from 'react-dom/server'
import useAuth from '../../hooks/useAuth'

function barBackColor(i) {
  var colors = ['#a4c2f4', '#b6d7a8', '#ffe599', '#ea9999']
  return colors[i % 4]
}

export default function Scheduler(props) {
  const { id } = props
  const [resources, setResources] = useState([])
  const [events, setEvents] = useState([])
  const { logout } = useAuth()

  console.log('course id > ', id)

  useEffect(() => {
    setResources([
      {
        name: 'Lunes',
        id: 'lun',
        expanded: true,
      },
      {
        name: 'Martes',
        id: 'mar',
        expanded: true,
      },
      {
        name: 'Miercoles',
        id: 'mier',
        expanded: true,
      },
      {
        name: 'Jueves',
        id: 'jue',
        expanded: true,
      },
      {
        name: 'Viernes',
        id: 'vie',
        expanded: true,
      },
      {
        name: 'Sábado',
        id: 'sab',
        expanded: true,
      },
    ])
  }, [])

  if (
    typeof window !== 'undefined' &&
    typeof window.navigator !== 'undefined'
  ) {
    const { DayPilot } = require('daypilot-pro-react')
    const { DayPilotScheduler } = require('daypilot-pro-react')
    const lunes = DayPilot.Date.today().firstDayOfWeek().addDays(1)

    const config = {
      startDate: lunes.toString(),
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

      onTimeRangeSelected: (args) => {
        const dp = args.control
        DayPilot.Modal.prompt('New event name', 'Event').then((modal) => {
          if (!modal.result) {
            dp.clearSelection()
            return
          }

          const startDate = lunes.addTime(args.start.getTimePart()).toString()
          const endDate = lunes.addTime(args.end.getTimePart()).toString()

          console.log({
            id: DayPilot.guid(),
            text: modal.result,
            start: startDate,
            end: endDate,
            resource: args.resource,
          })
          const data = {
            id: DayPilot.guid(),
            text: modal.result,
            start: startDate,
            end: endDate,
            resource: args.resource,
          }

          dp.clearSelection()
          dp.events.add(data)
        })
      },

      treeEnabled: true,
    }

    return (
      <div>
        <DayPilotScheduler {...config} />
      </div>
    )
  }

  return <div></div>
}
