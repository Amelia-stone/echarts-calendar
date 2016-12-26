/**
 * @file calendarSeries.js
 * @author dxh
 */

var completeDimensions = require('echarts/lib/data/helper/completeDimensions');
var echarts = require('echarts');
// var createListFromArray = require('echarts/lib/chart/helper/createListFromArray');

echarts.extendSeriesModel({

    type: 'series.calendar',

    getInitialData: function (option, ecModel) {
        var dimensions = completeDimensions(['value'], option.data);
        var list = new echarts.List(dimensions, this);
        list.initData(option.data);
        return list;

        // var list = createListFromArray(option.data, this, ecModel);
        // return list;
    },

    defaultOption: {
    }
});
