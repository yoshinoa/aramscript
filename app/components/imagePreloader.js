function ImagePreloader({ champions, patchVersion }) {
  return (
    <div style={{ display: "none" }}>
      {champions.map((champion) => (
        <img
          key={champion.id}
          src={`http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${champion.image.full}`}
          alt={champion.name}
        />
      ))}
    </div>
  );
}

export default ImagePreloader;
