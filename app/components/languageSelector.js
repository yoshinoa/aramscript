function LanguageSelector(props) {
  const languages = [
    { value: "en_US", label: "English" },
    { value: "ja_JP", label: "日本語" },
    { value: "zh_CN", label: "简体中文" },
    { value: "zh_TW", label: "繁體中文" },
    { value: "ko_KR", label: "한국어" },
    { value: "ru_RU", label: "Русский" },
    { value: "el_GR", label: "Ελληνικά" },
  ];

  return (
    <div className="mb-5">
      <label htmlFor="language" className="mr-3">
        Select Language:
      </label>
      <select
        id="language"
        value={props.selectedLanguage}
        onChange={props.handleChangeLanguage}
        className="rounded border-2 border-gray-600 bg-gray-700 text-gray-200 p-2"
      >
        {languages.map((language) => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;
