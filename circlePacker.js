let bigIters = 1000;
let smallIters = 2000;
let c = 1.4;

let circles = [];
let radii = [];
let area;

function setup() {
  
    createCanvas(1024, 1024);
    area = width * height;
    
    //Riemann zeta
    let sum = 0;
    for (let i = 0; i < bigIters; i++)
    {
        sum += pow(i+1, -c);
    }
    
    let startArea = area / sum;
    
    //radius[i] calculation
    for (let i = 0; i < bigIters; i++)
    {
        let iarea = startArea * pow(i+1,-c);
        radii[i] = sqrt(iarea/PI);
        circles[i] = new Circ(-1,-1,0,false);
    }
  
    //make circles
    for (let i =0; i< bigIters; i++)
    { 
        let collided = false;
        let rx = 0, ry = 0;
       
        for(let j = 0; j< smallIters; j++)
        {
            collided = false;
            rx = random(0+radii[i],width-radii[i]);
            ry = random(0+radii[i],height-radii[i]);
             
            for(let k = 0; k< bigIters; k++)
            { //collision check here        
                if (circles[k].drawable && circleColliding(rx, ry, circles[k].x, circles[k].y, radii[i], circles[k].radius))
                {
                    collided = true;
                    break;
                }
            }
          
            if(!collided){
              break;
            }     
        }
        circles[i] = new Circ(rx,ry,radii[i],!collided);
      
    }  
    
}

function draw() {
  background(128);
  noFill();
  stroke(200);
  for(let i = 0; i< bigIters; i++)
      {
          if(circles[i].drawable)
              ellipse( circles[i].x, circles[i].y, circles[i].radius*2, circles[i].radius*2);  
      }
}

function circleColliding(p1x, p1y,p2x, p2y, r1, r2)
{
    let dx, dy, dr;
    dx = p1x - p2x;
    dy = p1y - p2y;
    
    dr = dx * dx + dy * dy;
    return(dr < (r1+r2)*(r1+r2));
}

