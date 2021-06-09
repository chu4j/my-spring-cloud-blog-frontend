import {
  enable as enableDarkMode,
  disable as disableDarkMode,
  auto as followSystemColorScheme,
  exportGeneratedCSS as collectCSS,
  isEnabled as isDarkReaderEnabled,
} from "darkreader";
export function enableDarkReader() {
  enableDarkMode({
    mode: 1,
    brightness: 105,
    contrast: 95,
    sepia: 0,
  });
}
