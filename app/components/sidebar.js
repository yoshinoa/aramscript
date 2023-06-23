import BanSearch from "./banSearch";
import LanguageSelector from "./languageSelector";
import HideTeams from "./hideTeams";
import AmountSelector from "./amountSelector";

const SettingsSidebar = ({
  selectedLanguage,
  handleChangeLanguage,
  searchText,
  handleChangeSearch,
  searchResults,
  handleBanChampion,
  handleUnbanChampion,
  bannedChampions,
  setHideTeams,
  hideTeams,
  amountOfChampions,
  setAmountOfChampions,
}) => {
  return (
    <div className="settings-sidebar">
      <BanSearch
        searchText={searchText}
        handleChangeSearch={handleChangeSearch}
        searchResults={searchResults}
        handleBanChampion={handleBanChampion}
        handleUnbanChampion={handleUnbanChampion}
        bannedChampions={bannedChampions}
      />
      <LanguageSelector
        selectedLanguage={selectedLanguage}
        handleChangeLanguage={handleChangeLanguage}
      />
      <HideTeams setHideTeams={setHideTeams} hideTeams={hideTeams} />
      <AmountSelector
        amountOfChampions={amountOfChampions}
        setAmountOfChampions={setAmountOfChampions}
      />
    </div>
  );
};

export default SettingsSidebar;
