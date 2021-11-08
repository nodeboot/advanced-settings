# advanced-settings

Read application settings using advanced strategies like environment variables instead:

- .env
- hardcoded values in nodejs modules/classes

## Requirements

- nodejs >= 10

## Usage

- Create a file called: application.json at the root of workspace

``` json
{
  "foo": "${FOO_VALUE}",
  "bar": "baz",
}
```

- expose required environment variables

```cmd
expot FOO_VALUE=imthefoovalue
```

- add this snippet at the beginning of your application

```javascript
const EnvSettings = require('advanced-settings').EnvSettings;
var envSettings = new EnvSettings();
var settings = envSettings.loadJsonFileSync("application.json",'utf8');
console.log(settings.foo)
```

- expose the settings variable to your application using your own approach.

- You can also use it as a promise

``` javascript
await envSettings.loadJsonFile('application.json','utf8');
```

## Inspiration

- how spring boot framework allow us to centralize the configuration of the app with a lot of features, one of them called [Placeholders in properties](https://docs.spring.io/spring-boot/docs/1.5.6.RELEASE/reference/html/boot-features-external-config.html#boot-features-external-config-placeholders-in-properties)
  - usage: <https://stackoverflow.com/a/35535138/3957754>
- environment variables usage is the best approach to handle the variables who change from environments: dev > testing > prod.
  - see how heroku does: <https://devcenter.heroku.com/articles/config-vars>

## Contributors

<table>
  <tbody>
    <td>
      <img src="https://avatars0.githubusercontent.com/u/3322836?s=460&v=4" width="100px;"/>
      <br />
      <label><a href="http://jrichardsz.github.io/">JRichardsz</a></label>
      <br />
    </td>    
  </tbody>
</table>
