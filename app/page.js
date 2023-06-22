"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./components/footer";
import Team from "./components/team";
import Share from "./components/share";

function ChampionGenerator() {
  const [blueTeam, setBlueTeam] = useState([]);
  const [redTeam, setRedTeam] = useState([]);
  const [shareUrl, setShareUrl] = useState("");
  const [bannedChampions, setBannedChampions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [allChampions, setAllChampions] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState("en_US");

  const handleChangeLanguage = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleBanChampion = (champion) => {
    const newBannedChampions = [...bannedChampions, champion];
    setBannedChampions(newBannedChampions);
    localStorage.setItem("bannedChampions", JSON.stringify(newBannedChampions));
    setSearchResults([]);
  };

  const handleUnbanChampion = (championToUnban) => {
    const newBannedChampions = bannedChampions.filter(
      (champion) => champion.originalName !== championToUnban.originalName
    );
    setBannedChampions(newBannedChampions);
    localStorage.setItem("bannedChampions", JSON.stringify(newBannedChampions));
  };

  const handleChangeSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    if (searchText.length < 2) {
      setSearchResults([]);
      return;
    }

    if (!searchText) {
      setSearchResults([]);
      return;
    }
    const championsData = allChampions;

    const results = Object.values(championsData)
      .filter((champion) => champion.name.toLowerCase().includes(searchText))
      .map((champion) => ({
        originalName: champion.id,
        name: champion.name,
        img: `http://ddragon.leagueoflegends.com/cdn/13.12.1/img/champion/${champion.image.full}`,
      }));

    setSearchResults(results);
  };

  const generateChampions = async () => {
    try {
      const championsData = allChampions;
      const champions = Object.entries(championsData).map(
        ([originalName, champion]) => ({
          originalName,
          name: champion.name,
          img: `http://ddragon.leagueoflegends.com/cdn/13.12.1/img/champion/${champion.image.full}`,
        })
      );

      const shuffledChampions = champions.sort(() => 0.5 - Math.random());

      const unbannedChampions = shuffledChampions.filter(
        (champion) =>
          !bannedChampions.find(
            (bannedChampion) =>
              bannedChampion.originalName === champion.originalName
          )
      );

      const blueTeamChampions = unbannedChampions.slice(0, 15);
      const redTeamChampions = unbannedChampions.slice(15, 30);

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

  useEffect(() => {
    // Fetch the champion data when the component first mounts
    const fetchChampionsData = async () => {
      try {
        const response = await axios.get(
          `https://ddragon.leagueoflegends.com/cdn/13.12.1/data/${selectedLanguage}/champion.json`
        );
        setAllChampions(response.data.data); // Save the data to state
      } catch (error) {
        console.log(error);
      }
    };

    fetchChampionsData();
  }, [selectedLanguage]);

  useEffect(() => {
    const savedBans = localStorage.getItem("bannedChampions");

    if (savedBans) {
      setBannedChampions(JSON.parse(savedBans));
    }
  }, []);

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen font-sans antialiased flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl mb-5">ARAM Champion Generator</h1>
        <div className="relative mb-5 items-center">
          <label htmlFor="search" className="mr-3">
            Bans:
          </label>
          <input
            id="search"
            onChange={handleChangeSearch}
            className="rounded border-2 border-gray-600 bg-gray-700 text-gray-200 p-2"
            autoComplete="off"
          />
          <div className="absolute w-full bg-gray-300 text-black">
            {searchResults.map((champion) => (
              <div
                key={champion.originalName}
                onClick={() => handleBanChampion(champion)}
                className="cursor-pointer flex items-center p-1"
              >
                <img
                  src={champion.img}
                  alt={champion.name}
                  width="30"
                  height="30"
                />
                <span className="ml-2">{champion.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-5 flex flex-wrap">
          {" "}
          {/* <-- use flexbox for horizontal layout */}
          <label className="mr-3">Banned Champions:</label>
          {bannedChampions.map((champion) => (
            <div key={champion.originalName} className="mr-3">
              <img
                src={champion.img}
                alt={champion.name}
                width="30"
                height="30"
                onClick={() => handleUnbanChampion(champion)}
                style={{ cursor: "pointer" }}
              />
            </div>
          ))}
        </div>
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
          className="bg-gray-600 hover:bg-gray-500 text-gray-200 font-bold py-2 px-4 rounded mb-2"
        >
          Generate Champions
        </button>
      </div>
      {blueTeam.length > 0 && redTeam.length > 0 && (
        <div>
          <div className="flex flex-col md:flex-row justify-around mx-5">
            <Team team={blueTeam} teamname={"Blue Team"} />
            <Team team={redTeam} teamname={"Red Team"} />
          </div>
          {shareUrl && <Share shareUrl={shareUrl} />}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default ChampionGenerator;
