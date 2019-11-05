import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const columns = [
  {
    dataField: 'workerPool',
    text: 'worker pool'
  },
  {
    dataField: 'taskId',
    text: 'task'
  },
  {
    dataField: 'observed',
    text: 'last observed'
  },
  {
    dataField: '',
    text: 'observations'
  }
];


const WorkerPools = ({ workerPools }) => {
  let data = workerPools.map(x => ({
    workerPool: x.name,
    taskId: x.task.id,
    observed: x.task.created,
    observations: x.observations
  }));
  return (
    <div>
      <BootstrapTable keyField='name' data={ data } columns={ columns } bootstrap4 />
      <ul>
        {
          workerPools.map((workerPool) => (
            <li key={workerPool.namespace}>
              {workerPool.name} (observations from task <a href={'https://tools.taskcluster.net/groups/' + workerPool.task.taskGroupId + '/tasks/' + workerPool.task.id + '/details'}>{workerPool.task.id}</a>):
              <ul>
                {
                  workerPool.observations.map((observation) => (
                    <li key={observation.name}>
                      {observation.name}: {observation.value}
                    </li>
                  ))
                }
              </ul>
            </li>
          ))
        }
      </ul>
    </div>
  )
};

export default WorkerPools