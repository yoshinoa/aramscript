"use client";
import React, { useState } from "react";
import axios from "axios";

function ChampionGenerator() {
  const [blueTeam, setBlueTeam] = useState([]);
  const [redTeam, setRedTeam] = useState([]);

  const generateChampions = async () => {
    try {
      const response = await axios.get(
        "https://ddragon.leagueoflegends.com/cdn/11.11.1/data/zh_CN/champion.json"
      );
      const championsData = response.data.data;
      const champions = Object.values(championsData).map(
        (champion) => champion.name
      );

      const shuffledChampions = champions.sort(() => 0.5 - Math.random());

      const blueTeamChampions = shuffledChampions.slice(0, 15);
      const redTeamChampions = shuffledChampions.slice(15, 30);

      setBlueTeam(blueTeamChampions);
      setRedTeam(redTeamChampions);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>League of Legends Champion Generator</h1>
      <button onClick={generateChampions}>Generate Champions</button>
      {blueTeam.length > 0 && redTeam.length > 0 && (
        <div>
          <h2>Blue Team:</h2>
          <ul>
            {blueTeam.map((champion, index) => (
              <li key={index}>{champion}</li>
            ))}
          </ul>
          <h2>Red Team:</h2>
          <ul>
            {redTeam.map((champion, index) => (
              <li key={index}>{champion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ChampionGenerator;
