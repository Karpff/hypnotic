var canvas = document.getElementsByTagName("canvas")[0];
canvas.width = innerWidth;
canvas.height = innerHeight;
var c = canvas.getContext('2d');

//Config
var initialDistance = 120;
var color1 = "#111111";
var color2 = "#FFFCF9";
var expansion = 2;
var rotation = 17;
var backRotation = 0.5;
var escape = 0.5;
var interval = 120;

class Sphere
{
  constructor(x,y,angle,color)
  {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.distance = initialDistance;
    this.color = color;
    this.dead = false;
    this.size = 1;
  }

  update()
  {
    if(!this.dead)
    {
      this.size+=expansion;
      this.angle-=backRotation;
      this.distance+=escape;
      this.x=Math.cos(this.angle/180*Math.PI)*this.distance+innerWidth/2;
      this.y=Math.sin(this.angle/180*Math.PI)*this.distance+innerHeight/2;
      if(this.size>1000)this.dead = true;
      this.display();
    }
  }

  display()
  {
    c.beginPath();
    c.arc(this.x,this.y,this.size,0,Math.PI*2);
    c.fillStyle=this.color;
    c.fill();
  }
}

var angle = 0;
var spheres = [];
var currentColor = color2;

function generate()
{
  angle+=rotation;
  let x=Math.cos(angle/180*Math.PI)*initialDistance+innerWidth/2;
  let y=Math.sin(angle/180*Math.PI)*initialDistance+innerHeight/2;
  spheres.push(new Sphere(x,y,angle,currentColor));
  if(currentColor==color1)currentColor = color2;
  else currentColor=color1;
}
generate();
setInterval(generate,interval);


function animate()
{
  c.clearRect(0,0,innerWidth,innerHeight);
  for(let i=0;i<spheres.length;i++)
  {
    spheres[i].update();
  }
  window.requestAnimationFrame(animate);
}
animate();
