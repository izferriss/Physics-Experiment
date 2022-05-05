//canvas dimensions
const canvas=
{
    w: 1024,
    h: 768
};

var fps =
{
    framesLastSecond: 0,
    currentSecond: 0,
    lastFrameTime: 0,
    currentFrameTime: 0,
    frameCount: 0,
    delta: 0
};

var points = [];
var sticks = [];
var forms = [];
var scale = 1.2;

points.push(
{
    x: 70 * scale,
    y: 20 * scale,
    oldX: Math.random() * 60 - 20,
    oldY: Math.random() * 10 + 20
});
points.push(
{
    x: 110 * scale,
    y: 30 * scale,
    oldX: 110,
    oldY: 30,
    fixed: false
});
points.push(
{
    x: 120 * scale,
    y: 70 * scale,
    oldX: 120,
    oldY: 70,
    fixed: false
});
points.push(
{
    x: 110 * scale,
    y: 110 * scale,
    oldX: 100,
    oldY: 100,
    fixed: false
});
points.push(
{
    x: 70 * scale,
    y: 120 * scale,
    oldX: 60,
    oldY: 110,
    fixed: false
});
points.push(
{
    x: 30 * scale,
    y: 110 * scale,
    oldX: 20,
    oldY: 100,
    fixed: false
});
points.push(
{
    x: 20 * scale,
    y: 70 * scale,
    oldX: 10,
    oldY: 60,
    fixed: false
});
points.push(
{
    x: 30 * scale,
    y: 30 * scale,
    oldX: 20,
    oldY: 20,
    fixed: false
});
points.push(
{
    x: 70 * scale,
    y: 70 * scale,
    oldX: 60,
    oldY: 60,
    fixed: false
});
points.push(
{
    x: (canvas.w / 2),
    y: 0  * scale,
    oldX: 300,
    oldY: 0,
    fixed: true
});
points.push(
{
    x: 200  * scale,
    y: 50  * scale,
    oldX: 200,
    oldY: 475,
    fixed: false
});
points.push(
{
    x: 200  * scale,
    y: 150  * scale,
    oldX: 200,
    oldY: 250,
    fixed: false
});

sticks.push(
{
    p0: points[0],
    p1: points[1],
    length: distance(points[0], points[1]),
    hidden: false
});
sticks.push(
{
    p0: points[1],
    p1: points[2],
    length: distance(points[1], points[2]),
    hidden: false
});
sticks.push(
{
    p0: points[2],
    p1: points[3],
    length: distance(points[2], points[3]),
    hidden: false
});
sticks.push(
{
    p0: points[3],
    p1: points[4],
    length: distance(points[3], points[4]),
    hidden: false
});
sticks.push(
{
    p0: points[4],
    p1: points[5],
    length: distance(points[4], points[5]),
    hidden: false
});
sticks.push(
{
    p0: points[5],
    p1: points[6],
    length: distance(points[5], points[6]),
    hidden: false
});
sticks.push(
{
    p0: points[6],
    p1: points[7],
    length: distance(points[6], points[7]),
    hidden: false
});
sticks.push(
{
    p0: points[7],
    p1: points[0],
    length: distance(points[7], points[0]),
    hidden: false
});
sticks.push(
{
    p0: points[0],
    p1: points[8],
    length: distance(points[0], points[8]),
    hidden: true
});
sticks.push(
{
    p0: points[1],
    p1: points[8],
    length: distance(points[1], points[8]),
    hidden: true
});
sticks.push(
{
    p0: points[2],
    p1: points[8],
    length: distance(points[2], points[8]),
    hidden: true
});
sticks.push(
{
    p0: points[3],
    p1: points[8],
    length: distance(points[3], points[8]),
    hidden: true
});
sticks.push(
{
    p0: points[4],
    p1: points[8],
    length: distance(points[4], points[8]),
    hidden: true
});
sticks.push(
{
    p0: points[5],
    p1: points[8],
    length: distance(points[5], points[8]),
    hidden: true
});
sticks.push(
{
    p0: points[6],
    p1: points[8],
    length: distance(points[6], points[8]),
    hidden: true
});
sticks.push(
{
    p0: points[7],
    p1: points[8],
    length: distance(points[7], points[8]),
    hidden: true
});
sticks.push(
{
    p0: points[9],
    p1: points[10],
    length: distance(points[9], points[10]),
    hidden: false
});
sticks.push(
{
    p0: points[10],
    p1: points[11],
    length: distance(points[10], points[11]),
    hidden: false
});
sticks.push(
{
    p0: points[11],
    p1: points[0],
    length: distance(points[11], points[1]),
    hidden: false
});

function distance(p0, p1)
{
    var dx = p1.x - p0.x;
    var dy = p1.y - p0.y;
    return Math.sqrt(dx * dx + dy * dy);
}

forms.push(
{
    path:
        [
        points[0],
        points[1],
        points[2],
        points[3],
        points[4],
        points[5],
        points[6],
        points[7]
        ],
    color: "violet"
});

var gameSpeed = 1;
var gravity = .5;
var bounce = .8;
friction = .999;

//Runs once page loaded
window.onload = init();

//make the canvas and start the loop
function init()
{
    ctx = document.getElementById("canvas").getContext("2d");
    document.getElementById("canvas").setAttribute("width", canvas.w);
    document.getElementById("canvas").setAttribute("height", canvas.h);

    gameLoop();
}

//Game loop
function gameLoop()
{
    update(fps.delta);
    draw();
    requestAnimationFrame(gameLoop);
}

//Draw
function draw()
{
    ctx.clearRect(0,0, canvas.w, canvas.h);
    drawCanvasBG("white");
    drawFrameRate();
    //drawPoints();
    drawSticks();
    drawForms();
}

//Make changes
function update(timePassed)
{
    calcFrameRate();
    updatePoints(timePassed);
    for(var i = 0; i < 5; i++)
    {
        constrainPoints();
        updateSticks();
    }
}

//Calculate the frame rate
function calcFrameRate()
{
    fps.currentFrameTime = Date.now();
    fps.delta = fps.currentFrameTime - fps.lastFrameTime;
    fps.delta = Math.min(fps.delta, gameSpeed);
    var sec = Math.floor(Date.now() / 1000);

    if(sec != fps.currentSecond)
    {
        fps.currentSecond = sec;
        fps.framesLastSecond = fps.frameCount;
        fps.frameCount = 1;
    }
    else
    {
        fps.frameCount++;
    }
}


//Fill the canvas in with a color
function drawCanvasBG(color)
{
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.w, canvas.h);
}

//Display frame rate
function drawFrameRate()
{
    ctx.fillStyle= "black";
    ctx.font = "20px monospace";
    ctx.textAlign = "left";
    ctx.fillText("FPS: " + Math.floor(fps.framesLastSecond), 0, 15);
}

function updatePoints(timePassed)
{
    for(var i = 0; i < points.length; i++)
    {
        var p = points[i];
        if(!p.fixed)
        {
            vx = ((p.x - p.oldX) * friction);// * timePassed;
            vy = ((p.y - p.oldY) * friction);// * timePassed;
        
        p.oldX = p.x;
        p.oldY = p.y;
        p.x += vx;
        p.y += vy;
        p.y += gravity;
        }
    }
}

function updateSticks()
{
    for(var i = 0; i < sticks.length; i++)
    {
        var s = sticks[i],
        dx = s.p1.x - s.p0.x,
        dy = s.p1.y - s.p0.y,
        distance = Math.sqrt(dx * dx + dy * dy),
        difference = s.length - distance,
        percent = difference / distance / 2,
        offsetX = dx * percent,
        offsetY = dy * percent;

        if(!s.p0.fixed)
        {
            s.p0.x -= offsetX;
            s.p0.y -= offsetY;
        }
        if(!s.p1.fixed)
        {
            s.p1.x += offsetX;
            s.p1.y += offsetY;
        }
    }
}

function drawPoints()
{
    for(var i = 0; i < points.length; i++)
    {
        var p = points[i];
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawSticks()
{
    ctx.beginPath();
    ctx.strokeStyle = "black";
    for(var i = 0; i < sticks.length; i++)
    {
        var s = sticks[i];
        if(!s.hidden)
        {
            ctx.moveTo(s.p0.x, s.p0.y);
            ctx.lineTo(s.p1.x, s.p1.y);
        }
    }
    ctx.stroke();
}

function constrainPoints()
{
    
    for(var i = 0; i < points.length; i++)
    {
        var p = points[i];
        var vx = (p.x - p.oldX) * friction;
        var vy = (p.y - p.oldY) * friction;

        if(p.x > canvas.w)
        {
            p.x = canvas.w;
            p.oldX = p.x + vx * bounce;
        }
        else if(p.x < 0)
        {
            p.x = 0;
            p.oldX = p.x + vx * bounce;
        }
        if(p.y > canvas.h)
        {
            p.y = canvas.h;
            p.oldY = p.y + vy * bounce;
        }
        else if (p.y < 0)
        {
            p.y = 0;
            p.oldY = p.y + vy * bounce;
        }
    }
}

function drawForms()
{
    for(var i = 0; i < forms.length; i++)
    {
        var f = forms[i];
        ctx.beginPath();
        ctx.fillStyle = f.color;
        ctx.moveTo(f.path[0].x, f.path[0].y);
        for(var j = 1; j < f.path.length; j++)
        {
            ctx.lineTo(f.path[j].x, f.path[j].y);
        }
        ctx.fill();
    }
}