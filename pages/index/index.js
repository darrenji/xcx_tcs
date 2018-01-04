//手指按下的坐标
var startX = 0;
var startY = 0;

//手指在canvas上移动的坐标
var moveX = 0;
var moveY = 0;

//手指移动坐标和初始位置的差值
var X = 0;
var Y = 0;

Page({
  canvasStart:function(e){
    startX = e.touches[0].x;
    startY = e.touches[0].y;
  },
  canvasMove: function(e){
    moveX = e.touches[0].x;
    moveY = e.touches[0].y;

    X = moveX - startX;
    Y = moveY - startY;

    if(Math.abs(X) > Math.abs(Y) && X > 0){
      console.log('moving right');
    } else if (Math.abs(X) > Math.abs(Y) && X < 0){
      console.log('moving left');
    } else if(Math.abs(Y) > Math.abs(X) && Y > 0) {
      console.log('moving down');
    } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
      console.log('moving top');
    }
  }
})
