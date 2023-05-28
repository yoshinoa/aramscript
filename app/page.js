"use client";
import React, { useState } from "react";
import axios from "axios";

function ChampionGenerator() {
  const [blueTeam, setBlueTeam] = useState([]);
  const [redTeam, setRedTeam] = useState([]);

  const [selectedLanguage, setSelectedLanguage] = useState("en_US");

  const handleChangeLanguage = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const generateChampions = async () => {
    try {
      const response = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/11.11.1/data/${selectedLanguage}/champion.json`
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
      <div>
        <label htmlFor="language">Select Language:</label>
        <select
          id="language"
          value={selectedLanguage}
          onChange={handleChangeLanguage}
        >
          <option value="en_US">English</option>
          <option value="zh_CN">中文</option>
          <option value="ja_JP">日本語</option>
          <option value="fr_FR">French</option>
          {/* Add more language options as needed */}
        </select>
      </div>
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
