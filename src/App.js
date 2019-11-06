import React, { Component } from 'react'
import Observations from './components/observations';
import './App.css';

const IndexApi = 'https://index.taskcluster.net/v1';
//const QueueApi = 'https://queue.taskcluster.net/v1';
const ArtifactApi = 'https://taskcluster-artifacts.net';
const RootNamespace = 'project.releng.a2ff8966607583fbc1944fccc256a80c';
/*
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
*/

class App extends Component {
  constructor() {
    super();
    this.state = {
      observations: {}
    };
  }
  componentDidMount () {
    fetch(IndexApi + '/task/' + RootNamespace + '.decision')
    .then(namespaceResponse => namespaceResponse.json())
    .then(namespaceContainer => {
      fetch(ArtifactApi + '/' + namespaceContainer.taskId + '/0/public/results.json')
      .then(observationsResponse => observationsResponse.json())
      .then(observations => {
        this.setState({ observations: observations });
      })
      .catch(console.log)})
    .catch(console.log)
  };
  render() {
    return (
      <Observations observations={this.state.observations} />
    );
  }
}

export default App;
