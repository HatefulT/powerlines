var w, h, c, ctx;

window.onload = function() {
  c = document.getElementById('canvas');
  ctx = c.getContext('2d');
  w = c.width = 500;
  h = c.height = 500;
  loop();
};
var t = 0;
var loop = function() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, w, h);
  dots[2].x = 150. + Math.sin(t)*100.;
  render();
  t += 0.1;
  requestAnimationFrame(loop);
};

var dots = [
  new ChargedDot(100., 100., 10.),
  new ChargedDot(200., 100., -10.),
  new ChargedDot(150., 150., 10.),
  new ChargedDot(150., 250., -5.),
];

var render = function() {
  ctx.strokeStyle = "#000";
  for(var i = 0; i<dots.length; i++) {
    if(dots[i].q < 0) continue;
    for(var a = 0.; a<2.*Math.PI; a+=Math.PI/8.) {
      var r = [dots[i].x + 10*Math.cos(a), dots[i].y + 10*Math.sin(a)];

      ctx.beginPath();
      ctx.moveTo(r[0], r[1]);

      for(var d=0; d<2000; d++) {
        let e = [0., 0.];
        b = false;
        for(var j=0; j<dots.length; j++) {
          if( (dots[j].x-r[0])*(dots[j].x-r[0])+(dots[j].y-r[1])*(dots[j].y-r[1]) < 100 ) {
            b = true;
            break;
          }
          let e1 = dots[j].getElectricField(r[0], r[1]);
          e[0] += e1[0];
          e[1] += e1[1];
        }
        if(b) break;
        r2 = [r[0] + 0.01*e[0], r[1] + 0.01*e[1]];
        r[0] = r2[0];
        r[1] = r2[1];
        ctx.lineTo(r[0], r[1]);
      }
      ctx.stroke();
    }
  }
};
