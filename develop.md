# How to develop echarts plugin

### init project

#### Take echars-xxx for example

- `mkdir echars-xxx && cd echars-xxx`

- `npm init`

- `npm install webpack --save -dev`

- `npm install echarts --save -dev`

- `mkdir src && mkdir example`

- cd src and create `index.js` file

```js

    var echarts = require('echarts');
    // todo ...

```

- create `webpack.config.js` file

```js
    var PROD = process.argv.indexOf('-p') >= 0;

    module.exports = {
        entry: {
            'echarts-xxx': __dirname + '/index.js'
        },
        output: {
            libraryTarget: 'umd',
            library: ['echarts-xxx'],
            path: __dirname + '/dist',
            filename: PROD ? '[name].min.js' : '[name].js'
        },
        externals: {
            'echarts': 'echarts'
        }
    };

```

- cd example and create `xxx.html` file then use your plugin


```html
<script src="echarts.min.js"></script>
<script src="echarts-xxx.min.js"></script>
```
