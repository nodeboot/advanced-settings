const EnvSettings = require('../src/env/EnvSettings.js');
const helpers = require('../src/helpers/helpers.js');
const path = require('path');

describe('Correct parsing from a configuration file', () => {

  const envSettings = new EnvSettings();
  const envSettingHelpers = helpers();

  it('Is an object not null', () => {
    const testCorrectObj = { oneKey: 1, twoKey: 2};
    const resultEvaluation = envSettingHelpers.isObject(testCorrectObj);
    expect(resultEvaluation).toBeTruthy();
    const testInCorrectObjNull = null;
    const resultEvaluationIncorrectNull = envSettingHelpers.isObject(testInCorrectObjNull);
    expect(resultEvaluationIncorrectNull).toBeFalsy();
    const testInCorrectObjEmpty = {};
    const resultEvaluationIncorrectEmpty = envSettingHelpers.isObject(testInCorrectObjEmpty);
    expect(resultEvaluationIncorrectEmpty).toBeFalsy();
  })

  it('Is has an own property', () => {
    const testCorrectObj = new Object();
    testCorrectObj.prop = 'exists';
    const resultEvaluation = envSettingHelpers.hasOwnProperty(testCorrectObj, 'prop');
    expect(resultEvaluation).toBeTruthy();
    const resultEvaluationIncorrect = envSettingHelpers.hasOwnProperty(testCorrectObj, 'propTwo');
    expect(resultEvaluationIncorrect).toBeFalsy();
  })

  it('Matches Regex', () => {
    const testCorrect = '${FOO_VALUE}';
    const resultEvaluation = envSettingHelpers.testEnvRegex(testCorrect);
    expect(resultEvaluation).toBeTruthy();
    const testInCorrect = '${FOO_VALUE';
    const resultEvaluationIncorrect = envSettingHelpers.testEnvRegex(testInCorrect);
    expect(resultEvaluationIncorrect).toBeFalsy();
  })

  it('Success In Parsing Env', () => {
    const testCorrect = '${FOR_TEST}';
    const resultEvaluation = envSettingHelpers.getEnvParsedVariable(testCorrect);
    expect(resultEvaluation).toMatch(/TESTING/);
    expect(resultEvaluation).not.toMatch(/TESTING1/);
    const testInCorrect = '${FOR_TEST_TEST}';
    const resultEvaluationIncorrect = envSettingHelpers.getEnvParsedVariable(testInCorrect);
    expect(resultEvaluationIncorrect).toBe('${FOR_TEST_TEST}');
  })

  it('Success In Parsing Variable Values', () => {
    const testCorrectBooleanTrue = 'true';
    const resultEvaluationBooleanTrue = envSettingHelpers.parseVariableValue(testCorrectBooleanTrue);
    expect(resultEvaluationBooleanTrue).toBeTruthy();
    const testCorrectBooleanFalse = 'false';
    const resultEvaluationBooleanFalse = envSettingHelpers.parseVariableValue(testCorrectBooleanFalse);
    expect(resultEvaluationBooleanFalse).toBeFalsy();
    const testCorrectSame = 'same';
    const resultEvaluationSame = envSettingHelpers.parseVariableValue(testCorrectSame);
    expect(resultEvaluationSame).toBe(testCorrectSame);
  })

  it('Parse a whole JSON', async () => {
    const route = path.join(__dirname, './mocks/application.json');
    const parsedJson = await envSettings.loadJsonFile(route, 'utf8');
    expect(parsedJson.foo).toBe('foo');
    expect(parsedJson.nested.testing).toBe('TESTING');
  })

  it('Parse a whole JSON Async Mode', () => {
    const route = path.join(__dirname, './mocks/application.json');
    const parsedJson = envSettings.loadJsonFileSync(route, 'utf8');
    expect(parsedJson.foo).toBe('foo');
    expect(parsedJson.nested.testing).toBe('TESTING');
  })

});
