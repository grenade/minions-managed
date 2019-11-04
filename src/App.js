import React, { Component } from 'react'
import WorkerPools from './components/workerPools';
import './App.css';

const IndexApi = 'https://index.taskcluster.net/v1';
const QueueApi = 'https://queue.taskcluster.net/v1';
const ArtifactApi = 'https://taskcluster-artifacts.net';
const RootNamespace = 'project.releng.a2ff8966607583fbc1944fccc256a80c';
const versionregex = {
  'windows-version': /(\d+\.\d+\.\d+)/gm,
  'python2-version': /(\d+\.\d+\.\d+)/gm,
  'python3-version': /(\d+\.\d+\.\d+)/gm,
  'python2-platform-release': /(.*)/gm,
  'python3-platform-release': /(.*)/gm,
  'wget-version': /(\d+\.\d+\.\d+)/gm,
  'hg-version': /(\d+\.\d+\.\d+)/gm,
  'generic-worker-version': /(\d+\.\d+\.\d+)/gm,
  'servicepack-major-version': /\d/g,
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      workerPools: []
    };
  }
  componentDidMount () {
    fetch(IndexApi + '/namespaces/' + RootNamespace)
    .then(response => response.json())
    .then((containerPrimary) => {
      containerPrimary.namespaces.map((ns1) => (
        fetch(IndexApi + '/namespaces/' + ns1.namespace)
        .then(response => response.json())
        .then((containerSecondary) => {
          containerSecondary.namespaces.forEach(async (ns2) => {
            let taskId = await fetch(IndexApi + '/task/' + ns2.namespace + '.collect-software-versions').then(responseTask => responseTask.json()).then(containerTask => containerTask.taskId).catch(console.log);
            let task = await fetch(QueueApi + '/task/' + taskId).then(responseTask => responseTask.json()).catch(console.log);
            task.id = taskId;
            let workerPool = {
              name: ns1.name + '/' + ns2.name,
              namespace: ns2.namespace,
              task: task,
              observations: []
            };
            task.payload.artifacts.forEach(async artifact => {
              workerPool.observations.push({
                name: artifact.name.split('/').pop().replace('.txt', ''),
                value: (await fetch(ArtifactApi + '/' + taskId + '/0/' + artifact.path).then(responseTask => responseTask.text()).catch(console.log)).match(versionregex[artifact.name.split('/').pop().replace('.txt', '')])
              });
            });
            this.setState(currentState => ({
              workerPools: [...currentState.workerPools, workerPool]
            }));
          });

        })
        .catch(console.log)
      ));
    })
    .catch(console.log);
  };
  render() {
    return (
      <WorkerPools workerPools={this.state.workerPools} />
    );
  }
}

export default App;
