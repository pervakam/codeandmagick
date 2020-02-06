'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;

var RESULT_X = 150;
var RESULT_Y = 230;
var RESULT_GAP = 90;
var RESULT_WIDTH = 40;
var RESULT_HEIGHT = -150;

var NAME_X = 150;
var NAME_Y = 250;
var NAME_COLOR = '#000';


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var findMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = NAME_COLOR;
  ctx.font = '16px PTMono';
  ctx.fillText('Ура вы победили!', 250, 30);
  ctx.fillText('Список результатов:', 245, 50);

  var maxTime = findMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var resultBox = (RESULT_HEIGHT * times[i]) / maxTime;
    var resultColor = ['rgba(255, 0, 0, 1)', 'hsl(255, '+Math.random() * 100+'%, 50%)', 'hsl(255, '+Math.random() * 100+'%, 50%)', 'hsl(255, '+Math.random() * 100+'%, 50%)'];
    ctx.fillStyle = NAME_COLOR;
    ctx.fillText(names[i], NAME_X + RESULT_GAP * i, NAME_Y);

    ctx.fillStyle = resultColor[i];
    ctx.fillRect(RESULT_X + RESULT_GAP * i, RESULT_Y, RESULT_WIDTH, resultBox);
    ctx.fillStyle = NAME_COLOR;
    ctx.fillText(Math.round(times[i]), NAME_X + RESULT_GAP * i, RESULT_Y + resultBox - 5);
  }


};

