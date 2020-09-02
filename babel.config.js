module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            assets: "./src/assets",
            molecules: "./src/components/molecules",
            atoms: "./src/components/atoms",
            organisms: "./src/components/organisms",
            tests: './src/tests',
            styles: './src/styles'
          },
        },
      ],
    ],
  };
};
