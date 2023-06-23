function HideTeams({ setHideTeams, hideTeams }) {
  return (
    <div className="hide-teams mb-2">
      <label htmlFor="hide-teams" className="mr-3">
        Hide Teams:
      </label>
      <input
        id="hide-teams"
        type="checkbox"
        checked={hideTeams}
        onChange={(e) => setHideTeams(e.target.checked)}
      />
    </div>
  );
}

export default HideTeams;
