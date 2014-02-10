/* global window */

'use strict';

var $ = require('jquery');

require('gridster');

var gridster;

var maximumColumns = 6;
var widgetMargin = 5;

var widgetWidth = Math.floor(($('.dashboard > ul').width() / maximumColumns) - (widgetMargin * 2));

gridster = $('.dashboard > ul').gridster({
  widget_margins: [widgetMargin, widgetMargin],
  widget_base_dimensions: [widgetWidth, 100]
}).data('gridster');

var widgets = [
  ['<li>0</li>', 1, 2],
  ['<li>1</li>', 3, 2],
  ['<li>2</li>', 3, 2],
  ['<li>3</li>', 2, 2],
  ['<li>4</li>', 4, 2],
  ['<li>5</li>', 1, 2],
  ['<li>6</li>', 2, 2],
  ['<li>7</li>', 3, 2],
  ['<li>8</li>', 1, 2],
  ['<li>9</li>', 2, 2],
  ['<li>10</li>', 1, 2]
];

$.each(widgets, function (i, widget) {
  gridster.add_widget.apply(gridster, widget);
});

$(window).resize(function () {
  var widgetWidth = Math.floor(($('.dashboard > ul').width() / maximumColumns) - (widgetMargin * 2));
  gridster.resizeGridster(widgetWidth, 100);
});
