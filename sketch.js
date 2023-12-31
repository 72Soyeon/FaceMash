let facemesh;
let video;
let predictions = [];
let analysis = false;
let timer = 1
let ready = false;


let myButton, myInput, myOutput;
let myOutputText = '';

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  
  facemesh = ml5.facemesh(video, modelReady);


  // This sets up an event that fills the global variable "predictions"
  // with an array every time new predictions are made
  facemesh.on("predict", results => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints
  if (analysis == true){
      drawKeypoints();
    
      if (frameCount % 60 == 0 && timer > 0) {
        timer --;
      }
      if (timer == 0) {
        analysis = false;
        timer = 1;
      } 
  }
  
  drawKeypoints();
  
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;

    // Draw facial keypoints.
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];

      fill(0, 255, 0);
      ellipse(x, y, 5, 5);
    }
  }
}