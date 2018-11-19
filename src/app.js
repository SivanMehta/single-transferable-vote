import React, { Component, Fragment } from 'react';
import { portionsFromBallots } from './calculations';

class App extends Component {
  constructor() {
    super();
    this.state = {
      round: 0,
      activeCandidates: [ ...candidates ],
      inactiveCandidates: []
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

  renderBallots() {
    return (
      <table className='table'>
        <tbody>
          { this.renderBallotRows() }
        </tbody>
      </table>
    );
  }

  renderActiveVotes() {
    const { ballots } = this.props;
    const proportions = portionsFromBallots(ballots, this.state.activeCandidates);
    console.log(proportions)
    return candidates.map(candidate => {
      const total = proportions[candidate] || 0;
      const color = total > (ballots.length / 2) ? 'success' : 'primary';
      const width = (total / ballots.length) * 100;

      return (
        <Fragment>
          { candidate }
          <div className='progress'>
            <div className={ `progress-bar bg-${ color }`} style={{ width: `${ width }%` }} />
          </div>
        </Fragment>
      );
    });
  }

  next() {
    const { activeCandidates, round, inactiveCandidates } = this.state;
    const roundVotes = portionsFromBallots(this.props.ballots, activeCandidates);

    let lowest = '';
    let lowestCount = Infinity;
    activeCandidates.forEach(name => {
      if(roundVotes[name] < lowestCount) {
        lowest = name;
        lowestCount = roundVotes[name];
      }
    });

    this.setState({
      activeCandidates: activeCandidates.filter(name => name != lowest),
      round: round + 1,
      inactiveCandidates: inactiveCandidates.concat(lowest)
    });
  }

  prev() {
    const { activeCandidates, inactiveCandidates, round } = this.state;

    this.setState({
      activeCandidates: activeCandidates.concat(inactiveCandidates.pop()),
      inactiveCandidates,
      round: round - 1
    })
  }

  renderButtons() {
    const { round } = this.state;
    const next = (
      <button
          className="btn btn-success"
          onClick={ this.next.bind(this) }
          disabled={ round > candidates.length - 2 }>
        Next Round
      </button>
    );
    const previous = (
      <button
          className="btn btn-danger"
          onClick={ this.prev.bind(this) }
          disabled={ round < 1 }>
        Previous Round
      </button>
    );

    return (
      <Fragment>
        { next }
        { previous }
      </Fragment>
    );
  }

  render() {
    return (
      <div className='container'>
        <h2>Portion of active votes</h2>
        { this.renderActiveVotes() }
        <br />
        { this.renderButtons() }
        <h2>Active choices in round { this.state.round + 1 }</h2>
        { this.renderBallots() }
      </div>
    );
  }
}

const candidates = [
  'Superman',
  'Batman',
  'Spiderman',
  'Hulk',
  'Thor',
  'Wonder Woman',
  'Flash',
  'Hawkgirl',
  'Green Lantern',
  'Iron Man',
  'Cyborg',
  'Martian Manhunter'
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
  return Array(1000).fill(0).map(() => randomBallot());
}

export default function withBallots () {
  return (
    <App ballots={ generateBallots() }/>
  )
};
