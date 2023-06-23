function TrueRandom({ trueRandom, setTrueRandom }) {
  return (
    <div>
      <label htmlFor="true-random" className="mr-3">
        Allow Duplicate Champions
      </label>
      <input
        id="true-random"
        type="checkbox"
        checked={trueRandom}
        onChange={(e) => setTrueRandom(e.target.checked)}
      />
    </div>
  );
}

export default TrueRandom;
