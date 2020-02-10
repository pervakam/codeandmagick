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

var createText = function (ctx) {
  ctx.fillStyle = NAME_COLOR;
  ctx.font = '16px PTMono';
  ctx.fillText('Ура вы победили!', 250, 30);
  ctx.fillText('Список результатов:', 245, 50);
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

  createText(ctx);

  var maxTime = findMaxElement(times);

  var createResult = function () {

    var resultBox = (RESULT_HEIGHT * times[i]) / maxTime;
    var resultColor = 'hsl(255, ' + Math.random() * 100 + '%, 50%)';

    ctx.fillStyle = NAME_COLOR;
    ctx.fillText(names[i], NAME_X + RESULT_GAP * i, NAME_Y);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = resultColor;
    }
    ctx.fillRect(RESULT_X + RESULT_GAP * i, RESULT_Y, RESULT_WIDTH, resultBox);
    ctx.fillStyle = NAME_COLOR;
    ctx.fillText(Math.round(times[i]), NAME_X + RESULT_GAP * i, RESULT_Y + resultBox - 5);
  };

  for (var i = 0; i < names.length; i++) {
    createResult();
  }
};


