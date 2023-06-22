"use client";
import { useState, useEffect } from "react";
import Footer from "../components/footer";
import axios from "axios";
import Team from "../components/team";

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
        <Team teamname={"Blue Team"} team={blueTeam} />
        <Team teamname={"Red Team"} team={redTeam} />
      </div>

      <Footer />
    </div>
  );
}
