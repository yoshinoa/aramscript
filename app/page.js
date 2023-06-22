"use client";
import React, { useState } from "react";
import axios from "axios";
import Footer from "./components/footer";

function ChampionGenerator() {
  const [blueTeam, setBlueTeam] = useState([]);
  const [redTeam, setRedTeam] = useState([]);
  const [shareUrl, setShareUrl] = useState("");

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
      const champions = Object.entries(championsData).map(
        ([originalName, champion]) => ({
          originalName,
          name: champion.name,
          img: `http://ddragon.leagueoflegends.com/cdn/13.12.1/img/champion/${champion.image.full}`,
        })
      );

      const shuffledChampions = champions.sort(() => 0.5 - Math.random());

      const blueTeamChampions = shuffledChampions.slice(0, 15);
      const redTeamChampions = shuffledChampions.slice(15, 30);

      setBlueTeam(blueTeamChampions);
      setRedTeam(redTeamChampions);
      const timestamp = new Date().toISOString();

      const teamsData = {
        blueTeam: blueTeamChampions.map((x) => x.originalName),
        redTeam: redTeamChampions.map((x) => x.originalName),
        timestamp,
        lang: selectedLanguage,
      };

      const teamsDataStr = JSON.stringify(teamsData);
      const encodedTeamsData = Buffer(teamsDataStr).toString("base64");

      // set shareable URL to state
      setShareUrl(`${window.location.origin}/teams?data=${encodedTeamsData}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen font-sans antialiased flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl mb-5">ARAM Champion Generator</h1>
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
            <option value="ja_JP">日本語</option>
            <option value="zh_CN">简体中文</option>
            <option value="zh_TW">繁體中文</option>
            <option value="ko_KR">한국어</option>
            <option value="ru_RU">Русский</option>
            <option value="el_GR">Ελληνικά</option>
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
        <div>
          {shareUrl && (
            <div className="flex flex-col items-center py-10">
              <h2 className="text-2xl mb-5">Share this setup</h2>
              <p className="mb-5">
                Copy this link to share the team setup with your friends:
              </p>
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="p-2 text-black"
                onClick={(e) => e.target.select()}
              />
            </div>
          )}
          <div className="flex flex-col md:flex-row justify-around mx-5">
            <div className="bg-gray-700 rounded p-5 w-full md:w-1/2 mx-2 mb-5 md:mb-0 md:mr-2">
              {/* Blue Team content */}
              <h2 className="text-2xl text-center mb-5">Blue Team:</h2>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {blueTeam.map((champion, index) => (
                  <li key={index} className="flex items-center">
                    <img src={champion.img} className="w-16 h-16 mr-3" />
                    {champion.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-700 rounded p-5 w-full md:w-1/2 mx-2">
              {/* Red Team content */}
              <h2 className="text-2xl text-center mb-5">Red Team:</h2>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {redTeam.map((champion, index) => (
                  <li key={index} className="flex items-center">
                    <img src={champion.img} className="w-16 h-16 mr-3" />
                    {champion.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default ChampionGenerator;
