import BanSearch from "./banSearch";
import LanguageSelector from "./languageSelector";

const SettingsSidebar = ({
  selectedLanguage,
  handleChangeLanguage,
  searchText,
  handleChangeSearch,
  searchResults,
  handleBanChampion,
  handleUnbanChampion,
  bannedChampions,
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
    </div>
  );
};

export default SettingsSidebar;
