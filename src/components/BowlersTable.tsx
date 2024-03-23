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
  team?: ITeam;
}

interface ITeam {
  teamId: number;
  teamName: string;
  bowlers?: {
    // Define the nested bowlers inside team
    $id: string;
    $values: IBowler[];
  };
}

interface IApiResponse {
  $id: string;
  $values: IBowler[];
}

function BowlersTable() {
  const [bowlers, setBowlers] = useState<IBowler[]>([]);

  useEffect(() => {
    axios
      .get<IApiResponse>('https://localhost:44336/api/Bowlers')
      .then((response) => {
        const uniqueBowlers = new Map<number, IBowler>();

        response.data.$values.forEach((bowler) => {
          uniqueBowlers.set(bowler.bowlerId, bowler);

          // Check if the bowler's team and the team's bowlers are defined
          if (
            bowler.team &&
            bowler.team.bowlers &&
            bowler.team.bowlers.$values
          ) {
            bowler.team.bowlers.$values.forEach((teamBowler) => {
              if (!uniqueBowlers.has(teamBowler.bowlerId)) {
                uniqueBowlers.set(teamBowler.bowlerId, teamBowler);
              }
            });
          }
        });

        setBowlers(Array.from(uniqueBowlers.values()));
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
            <td>{`${bowler.bowlerFirstName || ''} ${bowler.bowlerMiddleInit || ''} ${bowler.bowlerLastName || ''}`}</td>
            <td>{bowler.team?.teamName || ''}</td>
            <td>{bowler.bowlerAddress || ''}</td>
            <td>{bowler.bowlerCity || ''}</td>
            <td>{bowler.bowlerState || ''}</td>
            <td>{bowler.bowlerZip || ''}</td>
            <td>{bowler.bowlerPhoneNumber || ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BowlersTable;
