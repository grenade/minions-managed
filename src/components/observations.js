import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const Observations = ({ observations }) => {
  var versionColumns = [
    {
      dataField: 'time',
      text: 'last observed',
      sort: true
    },
    {
      dataField: 'worker',
      text: 'observed on',
      sort: true
    },
    {
      dataField: 'workerType',
      text: 'worker type',
      sort: true
    }
  ];
  let versionData = Object.keys(observations).map(workerType => {
    let blob = {
      workerType: workerType,
      time: observations[workerType]['collect-software-versions']['iteration-1'].task.runs[0].resolved,
      worker: observations[workerType]['collect-software-versions']['iteration-1'].task.runs[0].workerId
    };
    Object.keys(observations[workerType]['collect-software-versions']['iteration-1']).forEach(key => {
      if (key.includes('-version')) {
        blob[key] = observations[workerType]['collect-software-versions']['iteration-1'][key];
        if (!(versionColumns.some(column => column.dataField === key))) {
          versionColumns.push({
            dataField: key,
            text: key.replace('-version', '').replace('-major', '').replace('-', ' '),
            sort: true
          });
        }
      }
    });
    return blob;
  });
  var configColumns = [
    {
      dataField: 'time',
      text: 'last observed',
      sort: true
    },
    {
      dataField: 'worker',
      text: 'observed on',
      sort: true
    },
    {
      dataField: 'workerType',
      text: 'worker type',
      sort: true
    }
  ];
  let configData = Object.keys(observations).map(workerType => {
    let taskname = observations[workerType].hasOwnProperty('collect-ronin-config')
      ? 'collect-ronin-config'
      : observations[workerType].hasOwnProperty('collect-occ-config')
        ? 'collect-occ-config'
        : 'undefined';
    let blob = {};
    if (taskname !== 'undefined') {
      blob = {
        workerType: workerType,
        time: observations[workerType][taskname]['iteration-1'].task.runs[0].resolved,
        worker: observations[workerType][taskname]['iteration-1'].task.runs[0].workerId
      };
      Object.keys(observations[workerType][taskname]['iteration-1']).forEach(key => {
        if (key.includes('-source-')) {
          blob[key.replace('occ-', ' ').replace('ronin-', ' ')] = observations[workerType][taskname]['iteration-1'][key];
          if (!(configColumns.some(column => column.dataField === key.replace('occ-', ' ').replace('ronin-', ' ')))) {
            configColumns.push({
              dataField: key.replace('occ-', ' ').replace('ronin-', ' '),
              text: key.replace('occ-', ' ').replace('ronin-', ' ').replace('-', ' '),
              sort: true
            });
          }
        }
      });
    } else {
      blob = {
        workerType: workerType
      };
    }
    return blob;
  });
  return (
    <div>
      <h2>software version observations</h2>
      <BootstrapTable keyField='workerType' data={ versionData } columns={ versionColumns } bootstrap4 />

      <h2>bootstrap config observations</h2>
      <BootstrapTable keyField='workerType' data={ configData } columns={ configColumns } bootstrap4 />
    </div>
  )
};

export default Observations