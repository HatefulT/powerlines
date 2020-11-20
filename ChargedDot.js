var k = 5000.;

var ChargedDot = function(x, y, q) {
  this.q = q;
  this.x = x;
  this.y = y;
}

ChargedDot.prototype.getElectricField = function (x, y) {
  var a = Math.atan2(y-this.y, x-this.x);
  var m = k*this.q / ((this.x-x)*(this.x-x) + (this.y-y)*(this.y-y));
  return [Math.cos(a)*m, Math.sin(a)*m];
};
