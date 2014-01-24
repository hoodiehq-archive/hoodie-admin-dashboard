'use strict';

var $ = require('jquery');
var Packery = require('packery');
var Draggabilly = require('draggabilly');

var window = global;

var $content = $('.packery');
var pckry = new Packery($content[0], {
  itemSelector: '.item',
  gutter: 0,
  columnWidth: '.item',
  rowHeight: 230
});

$content.find('.item').each(function (index, element) {
  var draggable;
  draggable = new Draggabilly(element, {
    handle: '.handle'
  });
  return pckry.bindDraggabillyEvents(draggable);
});

$content.packery();
pckry.layout();

$(window).resize(function () {
  // @TODO:  this doesn't always work
  pckry.layout();
});
