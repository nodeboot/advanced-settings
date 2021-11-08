const fs = require('fs');
const helpers = require('../helpers/helpers.js');
const envSettingHelpers = helpers();

function EnvSettings() {

  function parseObjectProperties(obj) {
      for (var k in obj) {
        if (envSettingHelpers.isObject(obj[k])) {
          parseObjectProperties(obj[k]);
        } else if (envSettingHelpers.hasOwnProperty(obj, k)) {
          let configInitialValue = "" + obj[k];
          if (envSettingHelpers.testEnvRegex(configInitialValue)) {
            while (envSettingHelpers.testEnvRegex(configInitialValue)) {
              configInitialValue = envSettingHelpers.getEnvParsedVariable(configInitialValue);
            };
            obj[k] = envSettingHelpers.parseVariableValue(configInitialValue);
          }
        }
      }
  }
 
  this.loadJsonFile = function(jsonFileLocation, charset) {
    const rawApplicationJson = fs.readFileSync(jsonFileLocation, charset);
    const jsonObject = JSON.parse(rawApplicationJson);
    parseObjectProperties(jsonObject);
    return jsonObject;
  }

}

module.exports = EnvSettings;
