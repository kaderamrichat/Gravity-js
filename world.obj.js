var World = function()
{
  this.entities = {
      asteroid : []
    , planet : []
    , explosion : []
  };
  this.debug = false;
  this.pause = false;
  this.fpsMax = 25;
  this.g = 1;
  this.canvas = "";
  this.context = "";
  this.mousedown = false;
}

World.prototype.init = function() {

  var _this;

  _this = this;

  this.canvas = document.getElementById("game");
  this.canvas.width = document.documentElement.clientWidth;
  this.canvas.height = document.documentElement.clientHeight;
  this.context = this.canvas.getContext("2d");

  for (var i = 0; i < 3; i++)
  {
    var tmp = new Planet(
        Math.floor(Math.random() * this.canvas.width) % (this.canvas.width - 200) + 100
      , Math.floor(Math.random() * this.canvas.height) % (this.canvas.height - 200) + 100
      , Math.floor(Math.random() * 100) + 20
      , "#f00"
    );
    this.entities.planet.push(tmp);
  }

  for (var i = 0; i < 10; i++)
  {
     var tmp = new Asteroid(
        Math.floor(Math.random() * this.canvas.width) % (this.canvas.width - 200) + 100
      , Math.floor(Math.random() * this.canvas.height) % (this.canvas.height - 200) + 100
      , Math.floor(Math.random() * 10) + 2
      , "#ff0"
    );
    this.entities.asteroid.push(tmp);
  }
  this.canvas.addEventListener("mousedown", function(e) {
    _this.mousedown = true;
  });
  this.canvas.addEventListener("mouseup", function(e) {
    _this.mousedown = false;
  });
  this.canvas.addEventListener("mousemove", function(e) {
    if (_this.mousedown)
    {
      var tmp = new Asteroid(
        e.clientX
      , e.clientY
      , Math.floor(Math.random() * 10) + 2
      , "#ff0"
      );
      _this.entities.asteroid.push(tmp);
    }
  });

  this.loop();
}

World.prototype.loop = function() {
  var _this;

  _this = this;

  this.context.fillStyle = "#000";
  this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

  this.entities.asteroid.forEach(function(elem, index) {
    elem.run(_this);
    elem.draw(_this.context);
  })
  this.entities.planet.forEach(function(elem, index) {
    elem.draw(_this.context);
  })
  setTimeout(function() {
      _this.loop();
    }, 1000 / this.fpsMax
  );
  return true;
}