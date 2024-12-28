import React, { useState } from 'react';

const Form = () => {
  const [studentName, setStudentName] = useState('');
  const [votes, setVotes] = useState({
    Suresh: { count: 0, voters: [] },
    Deepank: { count: 0, voters: [] },
    Abhik: { count: 0, voters: [] },
  });
  const [selectedCandidate, setSelectedCandidate] = useState('Suresh');
  const [totalVotes, setTotalVotes] = useState(0);

  const handleVote = () => {
    if (studentName.trim() === '') {
      alert('Please enter your name.');
      return;
    }

    if (votes[selectedCandidate].voters.some(voter => voter.name === studentName.trim())) {
      alert("You have already voted!");
      setStudentName('');
      return;
    }

    setVotes((prevVotes) => ({
      ...prevVotes,
      [selectedCandidate]: {
        count: prevVotes[selectedCandidate].count + 1,
        voters: [...prevVotes[selectedCandidate].voters, { name: studentName.trim() }],
      },
    }));
    setTotalVotes(totalVotes + 1);
    setStudentName(''); // Clear input after successful vote
  };

  const handleDeleteVote = (candidate, voterIndex) => {
    setVotes((prevVotes) => {
      const updatedVoters = [...prevVotes[candidate].voters];
      updatedVoters.splice(voterIndex, 1);
      return {
        ...prevVotes,
        [candidate]: {
          count: updatedVoters.length,
          voters: updatedVoters,
        },
      };
    });
    setTotalVotes(totalVotes - 1);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Class Monitor Vote</h1>
      <p>Total Votes: {totalVotes}</p>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="studentName" style={{ marginRight: '10px' }}>
          Student Name:
        </label>
        <input
          type="text"
          id="studentName"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          style={{ padding: '5px' }}
        />

        <label htmlFor="candidateSelect" style={{ marginLeft: '20px', marginRight: '10px' }}>
          Choose Monitor:
        </label>
        <select
          id="candidateSelect"
          value={selectedCandidate}
          onChange={(e) => setSelectedCandidate(e.target.value)}
          style={{ padding: '5px' }}
        >
          <option value="Suresh">Suresh</option>
          <option value="Deepank">Deepank</option>
          <option value="Abhik">Abhik</option>
        </select>
        <button onClick={handleVote} style={{ marginLeft: '10px', padding: '5px 10px' }}>
          Vote
        </button>
      </div>

      <div>
        {Object.keys(votes).map((candidate) => (
          <div key={candidate} style={{ marginBottom: '20px' }}>
            <h2>{candidate}</h2>
            <p>Total {votes[candidate].count}</p>
            {votes[candidate].voters.map((voter, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "10px" }}>{voter.name}</span>
                <button onClick={() => handleDeleteVote(candidate, index)} style={{ padding: "2px 5px" }}>Delete</button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;