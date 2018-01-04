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

//身体对象
var snakeBodys = [];

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

      //画画函数
       function draw(obj){
          context.setFillStyle(obj.color);
          context.beginPath();
          context.rect(obj.x, obj.y, obj.w, obj.h);
          context.closePath();
          context.fill();
       }

       function animate(){
         frameNum++;

         if(frameNum % 20 == 0){
           //向蛇身体数组添加一个上一个位置(身体对象)
           snakeBodys.push({
             x: snakeHead.x,
             y: snakeHead.y,
             w: 20,
             h: 20,
             color: "#00ff00"
           });

           if (snakeBodys.length > 4) {
             //移除不用的身体位置，移除数组的第一位元素，现在有4节身体
             snakeBodys.shift();
           }

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


         //设置蛇头
          draw(snakeHead);

          //设置蛇身
          for(var i=0; i < snakeBodys.length;i++){
            var snakeBody = snakeBodys[i];
            draw(snakeBody); 
          }  


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
