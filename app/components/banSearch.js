function BanSearch(props) {
  return (
    <div>
      <div className="relative mb-5 items-center">
        <label htmlFor="search" className="mr-3">
          Bans:
        </label>
        <input
          id="search"
          value={props.searchText} // <- control the input value through state
          onChange={props.handleChangeSearch}
          className="rounded border-2 border-gray-600 bg-gray-700 text-gray-200 p-2"
          autoComplete="off"
        />
        <div className="absolute w-full bg-gray-300 text-black">
          {props.searchResults.map((champion) => (
            <div
              key={champion.originalName}
              onClick={() => props.handleBanChampion(champion)}
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
        <label className="mr-3">Banned Champions:</label>
        {props.bannedChampions.map((champion) => (
          <div key={champion.originalName} className="mr-3">
            <img
              src={champion.img}
              alt={champion.name}
              width="30"
              height="30"
              onClick={() => props.handleUnbanChampion(champion)}
              style={{ cursor: "pointer" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BanSearch;
