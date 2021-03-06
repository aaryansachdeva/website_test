
var inc = .1;
var scl = 10;
var cols, rows;

var zoff = 0;

var fr,freq_text;

var particles = [];
var pause = 0;
var flowfield;
let noise_freq, noise_scale, noise_scale_text, button_clear, button_pause, button_save, gitLink, info; //UI Elements
//let canvas;
//let gifLength = 2000;
function setup() {
    createCanvas(600,600); //add var p5Canvas = (for saving)
	//canvas = p5Canvas.canvas;

	//capturer.start();
    cols = floor(width/scl);
    rows = floor(height/scl);
    
    fr = createP('');
    freq_text = createP('Frequency Slider');
    info = createP('Save Frame option only works on single frames for now. Pause the sim before saving for accuracy. <br> Credits: Aryan Sachdeva');
    info.position(10,830);
    
    noise_freq = createSlider(1,6,4,.5);

    noise_scale_text = createP('Noise Scale');
    noise_scale_text.position(10,710);
    noise_scale = createSlider(.001,.5,.1,.10);
    noise_scale.position(10,750);
    

    button_clear = createButton('Reset Sim');
    button_clear.mousePressed(clearScreen);
    button_clear.position(10,780);

    button_pause = createButton('Pause Sim');
    button_pause.mousePressed(pauseScreen);
    button_pause.position(100,780);

    button_save = createButton('Save Frame');
    button_save.mousePressed(saveFrame);
    button_save.position(190,780);
    

    gitLink = createA("https://github.com/aaryansachdeva/website_test","Link to Repo!","_blank");
    gitLink.position(10,810);

    flowfield = new Array(cols * rows);

    for(var i = 0; i < 1000; i++){
        particles[i] = new Particle();
    }
    background(255);
    
}

function draw() {
    
    randomSeed(10);
    inc = noise_scale.value();
    let val = noise_freq.value();
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
            stroke(0,50);
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


    fr.html("Framerate " + floor(frameRate()));
    
    /*if (frameCount < gifLength) {
		capturer.capture(canvas);
    }
    else if (frameCount === gifLength) {
		capturer.stop();
		capturer.save();
	}*/

}

function clearScreen() {
    background(255);
}

function pauseScreen() {
    if(pause === 0) {
        noLoop();
        pause = 1;
    }
    else if(pause === 1) {
        loop();
        pause = 0;
    }

    
}

function saveFrame() {
    saveFrames("frame01", "jpg", 1, 1);
}