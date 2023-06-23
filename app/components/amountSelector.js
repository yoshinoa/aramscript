function AmountSelector({ amountOfChampions, setAmountOfChampions }) {
  return (
    <div className="amount-selector mb-2">
      <label htmlFor="amount-selector" className="mr-3">
        Amount of Champions:
      </label>
      <input
        id="amount-selector"
        type="number"
        value={amountOfChampions}
        onChange={(e) => setAmountOfChampions(e.target.value)}
      />
    </div>
  );
}

export default AmountSelector;
