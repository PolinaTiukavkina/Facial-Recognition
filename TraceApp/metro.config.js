// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Ensure images like .png, .jpg are supported
config.transformer.assetPlugins = ["expo-asset/tools/hashAssetFiles"];

module.exports = config;
