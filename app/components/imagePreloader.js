function ImagePreloader({ champions }) {
  return (
    <div style={{ display: "none" }}>
      {champions.map((champion) => (
        <img
          key={champion.id}
          src={`http://ddragon.leagueoflegends.com/cdn/13.12.1/img/champion/${champion.image.full}`}
          alt={champion.name}
        />
      ))}
    </div>
  );
}

export default ImagePreloader;
