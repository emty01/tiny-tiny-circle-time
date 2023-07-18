let bigIters = 2000;
let smallIters = 200;
let c;

let circles = [];
let radii = [];
let area;

function setup() {

    createCanvas(windowWidth, windowHeight);
    area = windowWidth * windowHeight;
    
    c = random(1.1,1.4);
  
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
            rx = random(0+radii[i],windowWidth-radii[i]);
            ry = random(0+radii[i],windowHeight-radii[i]);
             
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
  background(35);
  noFill();
  stroke(235);
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

