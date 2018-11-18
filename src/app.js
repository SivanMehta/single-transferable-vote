import React, { Component, Fragment } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      round: 0
    };
  }

  renderBallotRows() {
    return this.props.ballots.map(ballot => (
      <tr>
        { ballot.map(name => <td>{ name }</td>) }
      </tr>
    ));
  }

  renderBallotHeaders() {
    return candidates.map((_, i) => (
      <th scope="col">{ i + 1 }</th>
    ));
  }

  renderBallots() {
    return (
      <table className='table'>
        <thead>
          <tr>
            { this.renderBallotHeaders() }
          </tr>
        </thead>
        <tbody>
          { this.renderBallotRows() }
        </tbody>
      </table>

    )
  }

  renderActiveVotes() {
    return candidates.map(candidate => (
      <Fragment>
        { candidate }
        <div className="progress">
          <div className="progress-bar w-75"></div>
        </div>
      </Fragment>
    ));
  }

  advance() {

  }

  render() {
    return (
      <div className='container'>
        <h1>Portion of active votes in round { this.state.round }</h1>
        { this.renderActiveVotes() }

        <br />

        <button className="btn btn-success btn-lg" onClick={ this.advance }>
          Next Round
        </button>

        <button className="btn btn-warning btn-lg">
          Reset
        </button>

        <br />

        <h1>Ballots</h1>
        { this.renderBallots() }
      </div>
    );
  }
}

const candidates = [
  'Snap',
  'Crackle',
  'Pop',
  'George',
  'Paul',
  'John',
  'Ringo'
];

function randomBallot() {
  let ballot = [ ...candidates ];
  for (let i = ballot.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ballot[i], ballot[j]] = [ballot[j], ballot[i]];
  }
  return ballot;
}

function generateBallots() {
  return Array(100).fill(0).map(() => randomBallot());
}

export default function withBallots () {
  return (
    <App ballots={ generateBallots() }/>
  )
};
