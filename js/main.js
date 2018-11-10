var context = canvas.getContext('2d')

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    var w = canvas.width
    var h = canvas.height
    console.log(w + "," + h)

    var bg = wx.createImage()
    bg.onload = function() {
      context.drawImage(bg, 0, 0, w, h)

      var grad = context.createLinearGradient(0, h - 120 - 24, 0, h); //创建一个渐变色线性对象
      grad.addColorStop(0, "#fff0"); //定义渐变色颜色
      grad.addColorStop(1, "#ffff");
      context.fillStyle = grad; //设置fillStyle为当前的渐变对象
      context.fillRect(0, h * 3 / 4, w, h); //绘制渐变图形

      context.fillStyle = '#fff9'
      drawRoundedRect(context, w / 4 + 10, h - 120 - 24, w / 2 - 20, 48, 22, true, false)
      var text = '开始游戏'
      context.fillStyle = '#333'
      context.textAlign = 'center'
      context.font = '20px Airal'
      context.fillText(text, w / 2, h - 120 + 5);

      var text = '* 请注意，本游戏没有存档功能，程序被杀死将会丢档。'
      context.fillStyle = '#333'
      context.textAlign = 'center'
      context.font = '14px Airal'
      context.fillText(text, w / 2, h - 60 + 5);
    }
    bg.src = 'images\\bg_' + Math.floor(Math.random() * 10 + 1) + '.jpg'

    wx.onTouchEnd(function(touches) {
      var x = touches.changedTouches[0].pageX
      var y = touches.changedTouches[0].pageY
      console.log(x + "," + y)

      if (isInsideRect([x, y], w / 4 + 10, h - 120 - 24, w / 2 - 20, 48)) {
        wx.showToast({
          title: '正在载入',
          icon: 'loading',
          duration: 1500,
          mask: true
        })
        
      }
    })
  }
}

/**
 * 是否在某区域内
 */
function isInsideRect([locationX, locationY], x, y, w, h) {
  return (locationX > x && locationX < x + w && locationY > y && locationY < y + h)
}

/**
 * 画圆角矩形
 */
function drawRoundedRect(ctx, x, y, width, height, r, fill, stroke) {
  ctx.save();
  ctx.beginPath(); // draw top and top right corner 
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + r, r); // draw right side and bottom right corner 
  ctx.arcTo(x + width, y + height, x + width - r, y + height, r); // draw bottom and bottom left corner 
  ctx.arcTo(x, y + height, x, y + height - r, r); // draw left and top left corner 
  ctx.arcTo(x, y, x + r, y, r);
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
  ctx.restore();
}