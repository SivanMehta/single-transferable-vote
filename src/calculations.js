export function portionsFromBallots(ballots, activeCandidates) {
  const candidates = {};

  // for each ballot, create a new one with (round) inactive candidates removed
  const relevantBallots = ballots.map(ballot => {
    return ballot.filter(name => activeCandidates.indexOf(name) > -1);
  });

  relevantBallots.forEach(ballot => {
    const choice = ballot[0];
    const currentVotes = candidates[choice];
    candidates[choice] = currentVotes ? currentVotes + 1 : 1;
  });

  return candidates;
}
