
var inc = 0.1;
var scl = 10;
var cols, rows;

var zoff = 0;

var fr;

var particles = [];

var flowfield;
let test;
//let canvas;
//let gifLength = 2000;
function setup() {
    createCanvas(600,600); //add var p5Canvas = (for saving)
	//canvas = p5Canvas.canvas;

	//capturer.start();
    cols = floor(width/scl);
    rows = floor(height/scl);
    fr = createP('');
    test = createSlider(1,6,4,.5);
    flowfield = new Array(cols * rows);

    for(var i = 0; i < 500; i++){
        particles[i] = new Particle();
    }
    background(255);
    
}

function draw() {
    
    randomSeed(10);
    let val = test.value();
    var yoff = 0;
    for(var x = 0; x < cols; x++){
        var xoff = 0;
       for(var y = 0; y < rows; y++){
            var index = x + y * cols;
            var angle = noise(xoff, yoff, zoff) * TWO_PI * val;
            var v = p5.Vector.fromAngle(angle);
            v.setMag(1);
            flowfield[index] = v;
            xoff += inc;
            stroke(0, 80);
            //push();
            //translate(x * scl, y * scl);
            //rotate(v.heading());
            //line(0, 0, scl, 0)
            //pop();
       }
       yoff += inc;

       zoff += 0.0003;
    }
    for(var i = 0; i < particles.length; i++){
        particles[i].follow(flowfield);
        particles[i].update();
        particles[i].show();
        particles[i].edges();
    }


    fr.html(floor(frameRate()));
    /*if (frameCount < gifLength) {
		capturer.capture(canvas);
    }
    else if (frameCount === gifLength) {
		capturer.stop();
		capturer.save();
	}*/

}