// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// ❌ вимикаємо bytecode, якщо він активний
config.transformer.unstable_allowRequireContext = true;

module.exports = config;
