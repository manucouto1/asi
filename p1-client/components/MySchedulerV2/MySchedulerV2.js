import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAllEvents, getAllHorarios, createEvent } from "../../api/horarios";
import {groupDetails} from "../../components/GroupDetails/GroupDetails";
import { getGroup } from "../../api/group";
import ReactDOMServer from "react-dom/server";
import { getIdiomas } from '../../api/idiomas';
import { getNiveles } from '../../api/niveles';
import { getTeachers } from '../../api/teacher';
import { map } from 'lodash'
import useAuth from "../../hooks/useAuth";


function barBackColor(i) {
  var colors = ["#a4c2f4", "#b6d7a8", "#ffe599", "#ea9999"];
  return colors[i % 4];
}

export default function Scheduler(){
    const router = useRouter();
    const [resources, setResources] = useState([]);
    const [events, setEvents] = useState([]);
    const [reload, setReload] = useState(true);
    const { logout } = useAuth();


    useEffect(() => {
      (async () => {
        const horarios = await getAllHorarios();
        setResources(
          map(horarios, (x) => {
            return {
              value: x._id,
              label: `${x.DiaSemana}`,
              name:  `${x.DiaSemana}`,
              orden: x.Orden
            }
          }).sort(
            (a,b) => {
              return a.orden - b.orden
            }
          ),
        )
        const eventos = await getAllEvents();
        setEvents(
          map(eventos, (x) => {
            return {
              id: x._id,
              label: `${x.Nombre}`,
              name: `${x.Nombre}`,
              start: x.inicio_evento,
              end: x.fin_evento
            }
          })
        );
        setReload(false);
      })();
      
    }, [reload])

    if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
        const {DayPilot} = require('daypilot-pro-react')
        const{ DayPilotScheduler} = require('daypilot-pro-react')
        const lunes = "1969-12-29T10:00:00"

        // Get monday of the current week
       /*  const lunes = DayPilot.Date.today().firstDayOfWeek().addDays(-1).toString();
        const sabado = DayPilot.Date.today().addDays(5).toString();
        console.log(lunes)
        console.log(sabado) */

        const config = {
            resources: resources,
            events: events,
            locale: "es-es",
            timeHeaders: [{"groupBy":"Hour"}, {"groupBy": "Cell", "format": "mm"}],
            scale: "CellDuration",
            cellDuration: 30,
            businessBeginsHour: 8,
            businessEndsHour: 21,
            showNonBusiness: false,
            cellWidthSpec: "Auto",            
            // rowMinHeight: 50,
            days: 1,
            heightSpec: "Max",
            startDate: lunes,
            // days: DayPilot.Date.today().daysInMonth(),
            timeRangeSelectedHandling: "Enabled",
            treePreventParentUsage: true,
            onTimeRangeSelected: selectTimeRange,
            eventMoveHandling: "Update",
            eventClickHandling: "Enabled",
            onEventClicked: (args) => {
                router.push('/groups/'+args.e.data.id)
            },

            onBeforeTimeHeaderRender: (args) => {
              // args.header['backColor'] = "#e0e0e0"
              // args.header['style'] = "box-sizing: border-box; border-right: 1px solid #ccc; display: flex; align-items: center; justify-content: center;"
            },

            onBeforeCellRender: (args) => {
              const { cell } = args
              if (cell.isParent) {
                cell.cssClass = "parent-cell"
              }
            },

            eventHoverHandling: "Bubble",
            bubble: new DayPilot.Bubble({
                onLoad: (args) => {
                  args.async = true;
                  (async () => {
                    const response = await getGroup(args.source.data.id);
                    args.html = (response != undefined && response != null) ? printClassInfo(response) : "<h1> Loading... </h1>";
                    args.loaded();
                  })();
                  debugger
                  // args.html= "<h1> Test </h1>"
                }
            }),
            treeEnabled: true,
        };

        return (
          <div>
              <DayPilotScheduler {...config}/>
          </div>
        );
    }

    return (<div></div>);
  }

function printClassInfo(group){
  return (ReactDOMServer.renderToStaticMarkup(groupDetails(group))).toString()
}


async function handleEventCreation( 
  nombreEvento,
  inicioEvento,
  finEvento,
  descripcionEvento,
  logout
) {
  const response = await createEvent(
    nombreEvento,
    inicioEvento,
    finEvento,
    descripcionEvento,
    logout
  );
}

async function selectTimeRange(args) {
  const {DayPilot} = require('daypilot-pro-react')
  const dp = args.control;

  var idiomas = map(await getIdiomas(), (x) => {
    return {
      id: x._id,
      name: `${x.nombre} (${x.siglas})`,
    }
  })

  var niveles = map(await getNiveles(), (x) => {
    return {
      id: x._id,
      name: `${x.codigo}`,
    }
  })

  var profesores = map(await getTeachers(), (x) => {
    return {
      id: x._id,
      name: `${x.nombre} ${x.apellido1}`,
    }
  })

  var form = [
    {name: "Nombre", id: "nombre"},
    {name: "Idioma", id: "idioma", options: idiomas},
    {name: "Nivel", id: "nivel", options: niveles},
    {name: "Profesor", id: "profesor", options: profesores}
  ];

  var data = {
    start: args.start,
    end: args.end,
    id: DayPilot.guid(),
    resource: args.resource,
  };
  
  await DayPilot.Modal.form(form, data).then(function(modal) {
    dp.clearSelection();
    if (modal.canceled) { return; }
    data.text = modal.result.nombre
    dp.events.add(data);
    handleEventCreation(data.text, data.start, data.end, "");
  });
  
}
