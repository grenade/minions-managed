import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const Observations = ({ observations }) => {
  var columns = [
    {
      dataField: 'observed',
      text: 'last observed',
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
      observed: observations[workerType]['collect-software-versions']['iteration-1'].task.runs[0].resolved
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