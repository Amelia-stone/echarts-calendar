/**
 * @file calendarView.js
 * @author dxh
 */

var echarts = require('echarts');
var graphic = require('echarts/lib/util/graphic');

echarts.extendChartView({

    type: 'calendar',

    render: function (seriesModel, ecModel, api) {

        var group = this.group;

        var data = seriesModel.getData();
        var itemModel = data.getItemModel(0);

        var oldData = this._data;

        var self = this;

        var year = new Date(itemModel.option[0]).getFullYear();

        for (var i = 0; i < 53; i++) {

            for (var j = 0; j < 7; j++) {
                group.add(self._renderRect(i, j, 40, 40));
            }
        }

        data.each(function (idx) {
            var obj = {};
            var obj = self._days(data.getItemModel(idx).option[0]);
            var color = '#' + ('00000' + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
            group.add(self._renderRect(obj.weeks - 1, obj.weekDay, 40, 40, color));
        });

        data.diff(oldData)
            .add(function (idx) {

            })
            .execute();
    },

    _renderRect: function (i, j, width, height, color, opacity) {

         return new graphic.Rect({
            shape: {
                x: i * width + i,
                y: j * height + j,
                width: width,
                height: height
            },
            style: {
                fill: color || '#fff',
                opacity: opacity || 1
            }
        });
    },

    /**
     * 一天是某年的第几周第几天星期几
     *
     * @param  {Number} date 具体日期(年-月-日)
     * @return {Object}      {}
     */
    _days: function (date) {

        // 获得年份
        var year = new Date(date).getFullYear();
        var month = new Date(date).getMonth() + 1;
        var day = new Date(date).getDate();

        // 表示改日期为当年的第几天
        var days = 0;

        // 累加月天数
        for (var i = 1; i < month; i++ ) {

            switch (i) {

                // 大月的情况加31
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12: {
                    days += 31;
                    break;
                }

                // 小月的情况加30
                case 4:
                case 6:
                case 9:
                case 11: {
                    days += 30;
                    break;
                }
                // 二月的情况，根据年类型来加

                case 2: {
                    if (this._isLeapYear(year)) {
                        // 闰年加29
                        days += 29;
                    }
                    else {
                        days += 28;
                    }
                    break;
                }
            }
        }

        day = day * 1;

        // 月天数之和加上日天数
        days += day;

        // 当年的第一天是周几
        var date0 = new Date(year, 0, 1);

        // 将日期值格式化,0-11代表1月-12月;
        var date1 = new Date(year, month - 1, day);

        // 向下取整
        var nthOfWeek = Math.floor((days + date0.getDay() + 6) / 7);

        return {

            // 第几天
            days: days,

            // 第几周
            weeks: nthOfWeek,

            // 星期几
            weekDay: date1.getDay()
        };
    },

    /**
     * 是不是闰年
     * @param  {Number}  year 年份
     * @return {Boolean}      是否是闰年
     */
    _isLeapYear: function (year) {
        // 条件1：年份必须要能被4整除
        var cond1 = year % 4 == 0;

        // 条件2：年份不能是整百数
        var cond2 = year % 100 != 0;

        // 条件3：年份是400的倍数
        var cond3 = year % 400 ==0;

        // 当条件1和条件2同时成立时，就肯定是闰年，所以条件1和条件2之间为“与”的关系。
        // 如果条件1和条件2不能同时成立，但如果条件3能成立，则仍然是闰年。所以条件3与前2项为“或”的关系。
        // 所以得出判断闰年的表达式：
        var cond = cond1 && cond2 || cond3;

        return cond ? true : false;
    }

});
