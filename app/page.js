"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./components/footer";
import Team from "./components/team";
import Share from "./components/share";
import BanSearch from "./components/banSearch";
import LanguageSelector from "./components/languageSelector";
import SettingsSidebar from "./components/sidebar";
import { slide as Menu } from "react-burger-menu";

function ChampionGenerator() {
  const [blueTeam, setBlueTeam] = useState([]);
  const [redTeam, setRedTeam] = useState([]);
  const [shareUrl, setShareUrl] = useState("");
  const [bannedChampions, setBannedChampions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [allChampions, setAllChampions] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState("en_US");
  const [searchText, setSearchText] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleChangeLanguage = (event) => {
    setSelectedLanguage(event.target.value);
    localStorage.setItem("selectedLanguage", event.target.value);
  };

  const handleBanChampion = (champion) => {
    const newBannedChampions = [...bannedChampions, champion];
    setBannedChampions(newBannedChampions);
    localStorage.setItem("bannedChampions", JSON.stringify(newBannedChampions));
    setSearchResults([]);
    setSearchText("");
  };

  const handleUnbanChampion = (championToUnban) => {
    const newBannedChampions = bannedChampions.filter(
      (champion) => champion.originalName !== championToUnban.originalName
    );
    setBannedChampions(newBannedChampions);
    localStorage.setItem("bannedChampions", JSON.stringify(newBannedChampions));
    setSearchText("");
  };

  const handleChangeSearch = (event) => {
    const inputValue = event.target.value;
    setSearchText(inputValue);
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
    const savedLanguage = localStorage.getItem("selectedLanguage");

    if (savedBans) {
      setBannedChampions(JSON.parse(savedBans));
    }

    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen font-sans antialiased flex flex-col justify-between">
      <Menu isOpen={sidebarOpen} disableAutoFocus>
        <SettingsSidebar
          searchText={searchText}
          handleChangeSearch={handleChangeSearch}
          searchResults={searchResults}
          handleBanChampion={handleBanChampion}
          handleUnbanChampion={handleUnbanChampion}
          bannedChampions={bannedChampions}
          selectedLanguage={selectedLanguage}
          handleChangeLanguage={handleChangeLanguage}
        />
      </Menu>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl mb-5">ARAM Champion Generator</h1>

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
