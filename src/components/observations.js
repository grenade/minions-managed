import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const Observations = ({ observations }) => {
  var columns = [
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
  let data = Object.keys(observations).map(workerType => {
    let blob = {
      workerType: workerType,
      time: observations[workerType]['collect-software-versions']['iteration-1'].task.runs[0].resolved,
      worker: observations[workerType]['collect-software-versions']['iteration-1'].task.runs[0].workerId
    };
    Object.keys(observations[workerType]['collect-software-versions']['iteration-1']).forEach(key => {
      if (key.includes('-version')) {
        blob[key] = observations[workerType]['collect-software-versions']['iteration-1'][key];
        if (!(columns.some(column => column.dataField === key))) {
          columns.push({
            dataField: key,
            text: key.replace('-version', '').replace('-major', '').replace('-', ' '),
            sort: true
          });
        }
      }
    });
    return blob;
  });
  return (
    <div>
      <BootstrapTable keyField='workerType' data={ data } columns={ columns } bootstrap4 />
    </div>
  )
};

export default Observations