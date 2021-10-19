import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAllEvents, getAllHorarios } from "../../api/horarios";
import {groupDetails} from "../../components/GroupDetails/GroupDetails";
import { getGroup } from "../../api/group";
import ReactDOMServer from "react-dom/server";

function barBackColor(i) {
  var colors = ["#a4c2f4", "#b6d7a8", "#ffe599", "#ea9999"];
  return colors[i % 4];
}

export default function Scheduler(){
    const router = useRouter();
    const [resources, setResources] = useState([]);
    const [events, setEvents] = useState([]);
    const [reload, setReload] = useState(true);

    useEffect(() => {
      (async () => {
        const horarios = await getAllHorarios();
        setResources(horarios || []);
        const aventos = await getAllEvents();
        setEvents(aventos || []);
        setReload(false);
      })();
    }, [reload])

    if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
        const {DayPilot} = require('daypilot-pro-react')
        const{ DayPilotScheduler} = require('daypilot-pro-react')
        const lunes = "1969-12-29T10:00:00"

        console.log(events)
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
            // startDate: DayPilot.Date.today().firstDayOfMonth(),
            timeRangeSelectedHandling: "Enabled",
            treePreventParentUsage: true,
            onTimeRangeSelected: selectTimeRange,
            eventMoveHandling: "Update",
            onEventMoved: (args) => {
                args.control.message("Event moved: " + args.e.text());
            },
            eventResizeHandling: "Update",
            onEventResized: (args) => {
                args.control.message("Event resized: " + args.e.text());
            },
            eventDeleteHandling: "Update",
            onEventDeleted: (args) => {
                args.control.message("Event deleted: " + args.e.text());
            },
            eventClickHandling: "Enabled",
            onEventClicked: (args) => {
              console.log(args)
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

async function selectTimeRange(args) {
  const {DayPilot} = require('daypilot-pro-react')
  const dp = args.control;
 
  var idiomas = [
    {name: "Aleman", id: "DE"}
  ];

  var niveles = [
    {name: "A1", id: "a1"},
    {name: "A2", id: "a2"},
    {name: "B1", id: "b1"},
    {name: "B2", id: "b2"},
    {name: "C1", id: "c1"},
    {name: "C2", id: "c2"},
  ];

  var profesores = [
    {name: "Antonio Pérez", id: "1"}
  ];

  var form = [
    {name: "Nombre", id: "nombre"},
    {name: "idioma", id: "idioma", options: idiomas},
    {name: "nivel", id: "nivel", options: niveles},
    {name: "profesor", id: "profesor", options: profesores}
  ];

  var data = {
    start: args.start,
    end: args.end,
    id: DayPilot.guid(),
    resource: args.resource,
  };

  await DayPilot.Modal.form(form, data).then( function(modal) {
    dp.clearSelection();
    if (modal.canceled) { return; }
    data.text = modal.result.nombre
    dp.events.add(data);
  });
  
}

