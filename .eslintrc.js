module.exports = {
  "extends": ["taro/react"],
  "rules": {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off"
  },
  "globals":{
    "my":"true",
    "wx":"true"
  },
  "parserOptions": {
    "parser": "babel-eslint"
  },
}
