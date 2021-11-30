const fs = require('fs');
const fsp = require('fs/promises');
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
            let count=0;
            while (envSettingHelpers.testEnvRegex(configInitialValue)) {
              if(count>10){
                throw new Error(`Max attempts reached while ${configInitialValue} was being evaluated`);
              }
              configInitialValue = envSettingHelpers.getEnvParsedVariable(configInitialValue);
              count++;
            };
            obj[k] = envSettingHelpers.parseVariableValue(configInitialValue);
          }
        }
      }
  }
 
  this.loadJsonFileSync = function(jsonFileLocation, charset) {
    const rawApplicationJson = fs.readFileSync(jsonFileLocation, charset);
    const jsonObject = JSON.parse(rawApplicationJson);
    parseObjectProperties(jsonObject);
    return jsonObject;
  }

  this.loadJsonFile = async function(jsonFileLocation, charset) {
    const rawApplicationJson = await fsp.readFile(jsonFileLocation, charset);
    const jsonObject = JSON.parse(rawApplicationJson);
    parseObjectProperties(jsonObject);
    return jsonObject;
  }

}

module.exports = EnvSettings;
