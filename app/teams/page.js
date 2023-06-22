"use client";
import { useState, useEffect } from "react";
import Footer from "../components/footer";
import axios from "axios";

export default function TeamsPage() {
  const [data, setData] = useState("");
  const [teamsData, setTeamsData] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get("data");
    setData(data);
  }, []);

  useEffect(() => {
    if (data) {
      const compressedData = Buffer.from(data, "base64");
      const localData = JSON.parse(compressedData.toString());

      axios
        .get(
          `https://ddragon.leagueoflegends.com/cdn/13.12.1/data/${localData.lang}/champion.json`
        )
        .then((response) => {
          const championsData = response.data.data;
          const blueTeam = localData.blueTeam.map((x) => ({
            name: championsData[x].name,
            img: `http://ddragon.leagueoflegends.com/cdn/13.12.1/img/champion/${championsData[x].image.full}`,
          }));
          const redTeam = localData.redTeam.map((x) => ({
            name: championsData[x].name,
            img: `http://ddragon.leagueoflegends.com/cdn/13.12.1/img/champion/${championsData[x].image.full}`,
          }));
          setTeamsData({ blueTeam, redTeam, timestamp: localData.timestamp });
        });
    }
  }, [data]);

  if (!teamsData) {
    return <div>Loading...</div>;
  }

  const { blueTeam, redTeam, timestamp } = teamsData;

  const date = new Date(timestamp);

  // Format the date
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedTimestamp = date.toLocaleDateString(undefined, options);

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen font-sans antialiased flex flex-col justify-between">
      <div className="flex flex-col items-center py-10">
        <h1 className="text-4xl mb-5">ARAM Champions</h1>
        <p className="text-lg mb-5">Generated at: {formattedTimestamp}</p>
      </div>

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

      <Footer />
    </div>
  );
}
