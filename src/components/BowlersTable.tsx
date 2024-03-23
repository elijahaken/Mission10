import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface IBowler {
  bowlerId: number;
  bowlerLastName?: string;
  bowlerFirstName?: string;
  bowlerMiddleInit?: string;
  bowlerAddress?: string;
  bowlerCity?: string;
  bowlerState?: string;
  bowlerZip?: string;
  bowlerPhoneNumber?: string;
  teamId?: number;
  // Assuming you do not need to include bowlerScores in the interface for your table
  // If the API returns a team object as well, include it
  team?: ITeam;
}

interface ITeam {
  teamId: number;
  teamName: string;
  // captainId and other properties can be added if they are included in your API response
}

function BowlersTable() {
  const [bowlers, setBowlers] = useState<IBowler[]>([]);

  useEffect(() => {
    axios
      .get<IBowler[]>('https://localhost:44336/api/Bowlers')
      .then((response) => {
        setBowlers(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the bowlers:', error);
      });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Team</th>
          <th>Address</th>
          <th>City</th>
          <th>State</th>
          <th>Zip</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {bowlers.map((bowler) => (
          <tr key={bowler.bowlerId}>
            <td>{`${bowler.bowlerFirstName} ${bowler.bowlerMiddleInit} ${bowler.bowlerLastName}`}</td>
            <td>{bowler.team?.teamName}</td>
            <td>{bowler.bowlerAddress}</td>
            <td>{bowler.bowlerCity}</td>
            <td>{bowler.bowlerState}</td>
            <td>{bowler.bowlerZip}</td>
            <td>{bowler.bowlerPhoneNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BowlersTable;
