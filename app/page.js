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
        `https://ddragon.leagueoflegends.com/cdn/13.12.1/data/${selectedLanguage}/champion.json`
      );
      const championsData = response.data.data;
      const champions = Object.values(championsData).map((champion) => ({
        name: champion.name,
        img: `http://ddragon.leagueoflegends.com/cdn/13.12.1/img/champion/${champion.image.full}`,
      }));

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
    <div className="bg-gray-800 text-gray-100 min-h-screen font-sans">
      <div className="flex flex-col items-center py-10">
        <h1 className="text-4xl mb-5">League of Legends Champion Generator</h1>
        <div className="mb-5">
          <label htmlFor="language" className="mr-3">
            Select Language:
          </label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={handleChangeLanguage}
            className="rounded border-2 border-gray-600 bg-gray-700 text-gray-200 p-2"
          >
            <option value="en_US">English</option>
            <option value="zh_CN">中文</option>
            <option value="ja_JP">日本語</option>
            <option value="fr_FR">French</option>
          </select>
        </div>
        <button
          onClick={generateChampions}
          className="bg-gray-600 hover:bg-gray-500 text-gray-200 font-bold py-2 px-4 rounded"
        >
          Generate Champions
        </button>
      </div>
      {blueTeam.length > 0 && redTeam.length > 0 && (
        <div className="flex justify-around mx-5">
          <div className="bg-gray-700 rounded p-5 w-1/2 mx-2">
            <h2 className="text-2xl text-center mb-5">Blue Team:</h2>
            <ul className="grid grid-cols-3 gap-4">
              {blueTeam.map((champion, index) => (
                <li key={index} className="flex items-center">
                  <img src={champion.img} className="w-16 h-16 mr-3" />
                  {champion.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-700 rounded p-5 w-1/2 mx-2">
            <h2 className="text-2xl text-center mb-5">Red Team:</h2>
            <ul className="grid grid-cols-3 gap-4">
              {redTeam.map((champion, index) => (
                <li key={index} className="flex items-center">
                  <img src={champion.img} className="w-16 h-16 mr-3" />
                  {champion.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChampionGenerator;
