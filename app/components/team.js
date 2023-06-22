function Team(props) {
  return (
    <div className="bg-gray-700 rounded p-5 w-full md:w-1/2 mx-2 mb-5 md:mb-0 md:mr-2">
      {/* Blue Team content */}
      <h2 className="text-2xl text-center mb-5">{props.teamname}</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {props.team.map((champion, index) => (
          <li key={index} className="flex items-center">
            <img src={champion.img} className="w-16 h-16 mr-3" />
            {champion.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Team;
