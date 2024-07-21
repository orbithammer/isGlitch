const getPreferredTheme = () => {
    const hasDarkPreference = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    return hasDarkPreference ? true : false;
  };

  export default getPreferredTheme