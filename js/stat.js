var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;


var RESULT_X = 150;
var RESULT_Y = 80;
var RESULT_WIDTH = 40;
var RESULT_HEIGHT = 150;
var RESULT_GAP = 90;

var NAME_X = 150;
var NAME_Y = 250;
var NAME_COLOR = '#000';


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderResult = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, RESULT_WIDTH, RESULT_HEIGHT);
};

var findMaxElement = function(arr) {
  var maxElement = arr[0];
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = NAME_COLOR;
  ctx.font = "16px PTMono";
  ctx.fillText('Ура вы победили!', 250, 40);
  ctx.fillText('Список результатов:', 245, 60);

  // var players = ['Вы', 'Ниф-Ниф', 'Наф-Наф', 'Нуф-Нуф'];
  var resultColor = ['#000', 'hsl(240, 20%, 50%)', 'hsl(240, 100%, 50%)', 'hsl(240, 40%, 50%)'];

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = NAME_COLOR;
    ctx.fillText(players[i], NAME_X + RESULT_GAP * i, NAME_Y);
    renderResult(ctx, RESULT_X + RESULT_GAP * i, RESULT_Y, resultColor[i]);
  };

}

