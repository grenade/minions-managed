import React from 'react'


const WorkerPools = ({ workerPools }) => {
  return (
    <div>
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