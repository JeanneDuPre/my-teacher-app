module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./",
            "@components": "./components",
            "@utils": "./utils",
            "@screens": "./app/screens",
            "@hooks": "./hooks",
            "@assets": "./assets",
            "@constants": "./constants",
            "@styles": "./styles",
          },
        },
      ],
    ],
  };
};
