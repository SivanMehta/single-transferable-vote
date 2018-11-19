import React, { Component, Fragment } from 'react';
import { portionsFromBallots } from './calculations';

class App extends Component {
  constructor() {
    super();
    this.state = {
      round: 0,
      activeCandidates: [ ...candidates ]
    };
  }

  renderBallotRow(ballot) {
    const { round, activeCandidates } = this.state;
    let found = false;
    const cells = [];
    for(let i = 0; i < ballot.length; i ++) {
      if(!found && activeCandidates.indexOf(ballot[i]) > -1) {
        found = true;
        cells.push(<td className='table-success'>{ ballot[i] }</td>);
      } else if(found) {
        cells.push(<td className='table-active'>{ ballot[i] }</td>);
      } else {
        cells.push(<td className='table-danger'>{ ballot[i] }</td>);
      }
    }

    return cells;
  }

  renderBallotRows() {
    return this.props.ballots.map(ballot => (
      <tr>
        { this.renderBallotRow(ballot) }
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
    const proportions = portionsFromBallots(this.props.ballots, this.state.activeCandidates);
    return candidates.map(candidate => {
      const total = proportions[candidate] || 0;

      return (
        <Fragment>
          { candidate }
          <div className='progress'>
            <div className={ `progress-bar bg-${ total > 50 ? 'success' : 'primary' }`} style={{ width: `${ total }%` }} />
          </div>
        </Fragment>
      );
    });
  }

  next() {
    const { activeCandidates, round } = this.state;

    this.setState({
      activeCandidates: activeCandidates.slice(0, activeCandidates.length - 1),
      round: round + 1
    });
  }

  render() {
    return (
      <div className='container'>
        <h1>Portion of active votes in round { this.state.round + 1 }</h1>
        { this.renderActiveVotes() }

        <br />

        <button className="btn btn-success btn-lg" onClick={ this.next.bind(this) }>
          Next Round
        </button>

        <br />

        <h1>Ballots</h1>
        { this.renderBallots() }
      </div>
    );
  }
}

const candidates = [
  'Earth',
  'Fire',
  'Wind',
  'Water',
  'Heart'
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
