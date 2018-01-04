//手指按下的坐标
var startX = 0;
var startY = 0;

//手指在canvas上移动的坐标
var moveX = 0;
var moveY = 0;

//手指移动坐标和初始位置的差值
var X = 0;
var Y = 0;

//蛇头的坐标
var snakeHead = {
  x:0,
  y:0,
  color: '#ff0000',
  w: 20,
  h:20
};

//手指方向
var direction = null;

//蛇头方向
var snakeDirection = "right";

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
      direction = "right";
    } else if (Math.abs(X) > Math.abs(Y) && X < 0){
      direction = "left";
    } else if(Math.abs(Y) > Math.abs(X) && Y > 0) {
      direction = "bottom";
    } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
      direction="top";
    }
  },
  canvasEnd: function(e){
    snakeDirection = direction;
  },
  onReady: function(){
       //获取画布上的上下文
       var context = wx.createContext();

       //帧数
       var frameNum = 0;

       function animate(){
         frameNum++;

         if(frameNum % 20 == 0){
           //根据方向改变坐标值 
           switch (snakeDirection) {
             case "left":
               snakeHead.x -= snakeHead.w;
               break;
             case "right":
               snakeHead.x += snakeHead.w;
               break;
             case "top":
               snakeHead.y -= snakeHead.h;
               break;
             case "bottom":
               snakeHead.y += snakeHead.h;
               break;
           }
         }


         //先设置
          context.setFillStyle(snakeHead.color);
          context.beginPath();
          context.rect(snakeHead.x, snakeHead.y, snakeHead.w, snakeHead.h);
          context.closePath();
          context.fill();

          //再画
          wx.drawCanvas({
            canvasId: "snakeCanvas",
            actions: context.getActions()
          });

          requestAnimationFrame(animate);
       }
       animate();
  }
})
