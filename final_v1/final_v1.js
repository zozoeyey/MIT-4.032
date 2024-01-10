//Final Visualization
/********************
 Name: Zoey Yan
 Course: MIT 4.032
 Version: Apr 25, 2023
 
 This program visualizes 40 different dreams I've collected of myself
 and my friends. Each dream is drawn with an outer circle indicating
 the quality of dream(negative, positive or neutral), a shape in the center
 indicating the possible cause of dream(stimulus,  memory, imagination), and
 a series of icons mapping the emotions(good, neutral, bad).
 
 Interactions for the dreams depend on hovering/clicking on the center(peripheral) of
 the circle.
 mouseOver, mousePressed
 
 When the mouse is over the center of the dream, the content will be printed
 at the top right of the sketch window, and the center is brightened. (try to do)
 
 When the mouse is pressed the dream info will be printed in the console.
 **********************/


let pageNum = 0; //the main page

let reset;
let myFont;
let img = [];
let img90 = [];
let fade = [];
let imgCopy = [];
let dataPointsY = [];
let dataPointsY1 = [];

let index = -1;

let words = [];
let colorSet = [];

let table;
let table1;

let data = [];
let data1 = [];

let stars = [];
let alpha = 0;

let x1 = 300;
let y1 = 140;

let xpos = [];
let ypos = [];


function preload() {

  myFont = loadFont('data/meglona.otf');
  table = loadTable('data/project.csv', 'csv', 'header');
  table1 = loadTable('data/chart1.csv', 'csv', 'header');

  // images for key
  stimulus = loadImage('assets/stimulus.png');
  memory = loadImage('assets/memory.png');
  imagination = loadImage('assets/imagination.png');
  positive = loadImage('assets/positive.png');
  negative = loadImage('assets/negative.png');
  neutral = loadImage('assets/neutral.png');
  good = loadImage('assets/good.png');
  bad = loadImage('assets/bad.png');
  neutral1 = loadImage('assets/neutral1.png');

  //condense loading images
  img90 = new Array(37);

  for (let i = 0; i < 37; i++) {
    let m = loadImage(`assets/d${i+1}.png`);
    imgCopy.push(m);
  }

  for (let i = 0; i < 37; i++) {
    img[i] = loadImage(`assets/d${i+1}.png`, loadedImage => {
      betterResize(loadedImage, 90);
    });
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  let rowCount = table.getRowCount();
  let colCount = table.getColumnCount();

  let rowCount1 = table1.getRowCount();
  let colCount1 = table1.getColumnCount();

  //loop through each row of data excluding first row
  for (let row = 0; row < rowCount; row ++) {
    data[row] = [];
    for (let col = 0; col < colCount; col ++) {
      data[row][col] = table.getString(row, col);
    }
  }

  for (let row = 0; row < rowCount1; row ++) {
    data1[row] = [];
    for (let col = 0; col < colCount1; col ++) {
      data1[row][col] = table1.get(row, col);
    }
  }

  console.log(data1);

  words = ["Angry", "Anxious", "Shocked", "Scared", "Sad", "Depressed", "Surprised",
    "Confused", "Happy", "Loved"];

  colorSet = [color('#BD361E'), color('#E27A72'), color("#E8974F"), color("#5CB37A"),
    color('#4581BF'), color('#A8B1BB'), color('#87D8FF'), color("#A091C0"),
    color('#E5639A'), color('#F9DD89')];

  //create sliders, maybe put to draw?
  //typeSlider = createSlider(0, 3, 0);
  //typeSlider.position(1350, 60);
  //typeSlider.style('width', '80px');
  //typeSlider.style('background-color', 'white');

  //causeSlider = createSlider(0, 3, 0);
  //causeSlider.position(1350, 110);
  //causeSlider.style('width', '80px');
  //causeSlider.style('background-color', 'white');

  for (let i = 0; i < 28; i++) {
    xpos[i] = 500 + 110*(i%7);
    ypos[i] = 200 + 120*(floor(i / 7));
  }
  for (let i = 28; i < img.length; i ++) {
    xpos[i] = 500 + 110*(i%9);
    ypos[i] = 680;
  }
  console.log(xpos);
  console.log(ypos);

  for (let i = 0; i < 41; i++) {
    fade.push(new SoftNum());
  }
  
  for (let i = 0; i < 41; i ++) {
    dataPointsY.push(new SoftNum(windowHeight));
  }
  
  for (let i = 0; i < 41; i ++) {
    dataPointsY1.push(new SoftNum(windowHeight));
  }
}


function draw() {

  background(0);
  imageMode(CENTER);

  if (pageNum == 0) {

    drawSky();//draw background
    
    dataPointsY.forEach(function(entry) {
      entry.update();
    }
    );
    
    dataPointsY1.forEach(function(entry) {
      entry.update();
    }
    );

    //draw the title
    fill(255);
    textFont(myFont);
    textSize(70);
    text("WHAT'S IN", 70, 100);
    text("YOUR", 70, 200);
    text("DREAM?", 70, 300);

    //draw KEY
    textSize(30);
    text("KEY", 75, 380);

    //draw subtitles
    textFont('Open Sans');
    textSize(18);
    text("Hover on the key, images and\n" + "icons at the top to explore!", 70, 720);
    text("Cause", 70, 420);
    text("Type", 70, 560);
    

    //icons

    image(stimulus, 90, 450, 20, 20);
    image(memory, 90, 480, 22, 15);
    image(imagination, 90, 510, 20, 20);

    image(positive, 110, 610, 50, 50);
    image(negative, 210, 610, 50, 50);
    image(neutral, 310, 610, 50, 50);

    textSize(14);
    text("Stimulus", 130, 460);
    text("Memory", 130, 485);
    text("Imagination", 130, 510);
    text("Positive", 85, 660);
    text("Negative", 180, 660);
    text("Neutral", 285, 660);
    textSize(12);
    fill("gray");
    text("A project by Ziwen(Zoey) Yan", 1340, 800);

    //display color key at the top
    push();
    for (let i = 0; i < words.length; i ++) {
      textAlign(CENTER);
      textFont('Open Sans');
      textSize(11);
      fill(255);
      text(words[i], 495 + 80*i, 60);
      fill(colorSet[i]);
      circle(495 + 80 * i, 80, 20);
    }
    fill(255);
    image(good, 1290, 80, 40, 40);
    image(bad, 1360, 80, 40, 40);
    image(neutral1, 1435, 80, 70, 70);

    text("Good", 1290, 60);
    text("Bad", 1360, 60);
    text("Neutral", 1435, 60);

    pop();

    //display page text
    textSize(20);
    textFont(myFont);
    fill(255);
    text("Explore", 1350, 200);
    text("Explore", 1350, 200);
    noFill();
    stroke(255);
    strokeWeight(2);
    circle(1395, 190, 115);
    noStroke();
    if (dist(1395, 210, mouseX, mouseY) < 30) {
      noStroke();
      fill(255);
      image(good, 1395, 160, 40, 40);
      text("Explore", 1350, 200);
    }

    //display the images + hover functions
    push();

    fade.forEach(function(entry) {
      entry.update();
    }
    );

    causeHover();
    typeHover();
    
    colorHover();
    emotionHover();

    displayImg();
    pop();
    
  } else if (pageNum == 1) {//second page

    drawSky();
    
    dataPointsY.forEach(function(entry) {
      entry.update();
    }
    );
    
    dataPointsY1.forEach(function(entry) {
      entry.update();
    }
    );
    
    push();
    noFill();
    stroke(255);
    circle(1390, 90, 90);
    pop();
    
    push();
    fill(255);
    textFont(myFont);
    textSize(20);
    text("switch", 1350, 100);
    text("switch", 1350, 100);
    if (dist(1390, 90, mouseX, mouseY) < 30){
      circle(1390, 90, 90);
      fill(0);
      text("switch", 1350, 100);
    }
    pop();

    push();
    textAlign(RIGHT);
    textFont('Open Sans');
    textSize(12);
    noStroke();
    
    
    

    for (let i = 0; i < data1.length; i ++) {
      text(data1[i][0], x1, y1 + 27*i);
    }
    
    for (let i = 0; i < data1.length; i ++) {
      for (let j = 1; j < colorSet.length + 1; j++) {
        fill(colorSet[j-1]);
        circle(350 + 90*(j-1), dataPointsY[i].get(), parseInt(data1[i][j])*5);
        push();
        if (dist(350 + 90*(j-1), y1 + 26.8*i , mouseX, mouseY) < 10) {
        fill(255);
        textSize(14);
        circle(350 + 90*(j-1), y1 + 26.8*i, parseInt(data1[i][j])*5);
        text(data1[i][j] , 350 + 90*(j-1)+45, y1 + 26.8*i);
      }
        if (dist(x1-20, y1+27*i, mouseX, mouseY) < 20) {
          fill(255);
          text(data1[i][0], x1, y1 + 27*i);
          for (let k = 1; k < colorSet.length + 1; k ++) {
            fill(255);
            textSize(14);
            circle(350 + 90*(k-1), y1 + 26.8*i, parseInt(data1[i][k])*5);
            text(data1[i][k], 350 + 90*(k-1)+45, y1 + 26.8*i);
          }
        }
        pop();
      }
    }
    fill(255);
    textSize(16);
    text("The relationship between emotions and different contents", 500, 70);
    text("The relationship between emotions and different contents", 500, 70);
    pop();

    for (let i = 0; i < words.length; i ++) {
      push();
      textAlign(CENTER)
        textFont('Open Sans');
      textSize(12);
      text(words[i], 350 + 90*i, 740);
      if (dist(350 + 90*i, 740, mouseX, mouseY) < 10) {
        fill(255);
        for (let k = 0; k < data1.length; k ++) {
          textSize(14);
        circle(350 + 90*i, y1 + 26.8*k, parseInt(data1[k][i+1])*5);
        text(data1[k][i+1], 350 + 90*i+45, y1 + 26.8*k);
        textSize(12);
        text(words[i], 350 + 90*i, 740);
        }
      }
      pop();
    }
} else if(pageNum == 2) {//third page
    drawSky();
    
    dataPointsY.forEach(function(entry) {
      entry.update();
    }
    );
    
    dataPointsY1.forEach(function(entry) {
      entry.update();
    }
    );
  
    push();
    for (let i = 0; i < words.length; i ++) {
      textAlign(CENTER);
      textFont('Open Sans');
      textSize(11);
      fill(255);
      text(words[i], 350 + 80*i, 50);
      fill(colorSet[i]);
      circle(350 + 80 * i, 70, 20);
    }
    pop();
    
    push();
    noFill();
    stroke(255);
    circle(1390, 90, 90);
    pop();
    
    push();
    fill(255);
    textFont(myFont);
    textSize(20);
    text("back", 1365, 100);
    text("back", 1365, 100);
    if (dist(1390, 90, mouseX, mouseY) < 30){
      circle(1390, 90, 90);
      fill(0);
      text("back", 1365, 100);
    }
    pop();
    
    push();
    textAlign(RIGHT);
    textFont('Open Sans');
    textSize(12);
    //noStroke();
    
    for (let i = 0; i < data1.length; i ++) {
      text(data1[i][0], 270, 160 + 26*i);
      stroke(255);
      strokeWeight(0.5);
      if (dist(mouseX, mouseY, 250, 160 + 26*i) < 20){
      stroke(255, 255);
      line(300, 160 + 26*i, 1300, 160 + 26*i);
      }else{
      stroke(255, 100);
      line(300, 160 + 26*i, 1300, 160 + 26*i);
      }
      noStroke();
    }
    pop();
    
    for (let i = 1; i < 13; i ++) {
      push();
      textAlign(CENTER)
      textFont('Open Sans');
      textSize(14);
      text(i, 300 + 90*(i-1), 750);
      pop();
    }
    
    for (let i = 0; i < data1.length; i ++) {
      for (let j = 1; j < colorSet.length + 1; j++) {
        fill(colorSet[j-1]);
        circle(300 + 90*(parseInt(data1[i][j])-1), dataPointsY1[i].get(), parseInt(data1[i][j])*6);
        fill(255);
        textSize(14);
        //if (i != 0){
        //text(data1[i][j] , 300 + 90*(parseInt(data1[i][j])-1)+45,160 + 26*i );
        //}
      }
    }

}
}

function drawSky() {
  let numStars = 500;

  fill(255);
  noStroke();

  for (let i = 0; i < numStars; i++) {
    stars.push( {
    x:
      random(windowWidth),
      y:
      random(windowHeight),
      size:
      random(1, 3),
      speed:
      random(0.5, 1),
    }
    );

    stars[i].x += stars[i].speed;
    if (stars[i].x > width) {
      stars[i].x = 0;
    }
    ellipse(stars[i].x, stars[i].y, stars[i].size);
  }
}

function msg(rowNum) {
  let msg;
  let result = '';

  msg = "The person experienced { " + data[rowNum][0] + " }. ";
  msg += "This person feels { " + data[rowNum][1] + " }. ";
  msg += "It is a " + data[rowNum][2] + " dream caused by " + data[rowNum][3] + ".";

  for (let i = 0; i < msg.length; i += 50) {
    result += msg.substring(i, i + 50) + '\n';
  }
  return(result);
}

function mousePressed() {
  if (pageNum == 0 && dist(1350, 200, mouseX, mouseY) < 60) { // top button pressed
    pageNum = 1;
    for (let i = 0; i < img.length; i ++) {
      dataPointsY[i].setTarget(y1 + 26.8*i);
    }
    for (let i = 0; i < img.length; i ++) {
      dataPointsY1[i].setTarget(windowHeight);
    }
  } else if (pageNum == 1 && dist(1350, 100, mouseX, mouseY) < 50){
    pageNum = 2;
    for (let i = 0; i < img.length; i ++) {
      dataPointsY[i].setTarget(windowHeight);
    }
    for (let i = 0; i < img.length; i ++) {
      dataPointsY1[i].setTarget(160 + 26*i);
    }
  }else if (pageNum == 1) {
    pageNum = 0;
    for (let i = 0; i < img.length; i ++) {
      dataPointsY[i].setTarget(windowHeight);
    }
    for (let i = 0; i < img.length; i ++) {
      dataPointsY1[i].setTarget(windowHeight);
    }
  }else if (pageNum == 2 && dist(1390, 90, mouseX, mouseY) < 20){
    pageNum = 1;
    for (let i = 0; i < img.length; i ++) {
      dataPointsY[i].setTarget(y1 + 26.8*i);
    }
    for (let i = 0; i < img.length; i ++) {
      dataPointsY1[i].setTarget(windowHeight);
    }
  }else if(pageNum == 2){
    pageNum = 0;
    for (let i = 0; i < img.length; i ++) {
      dataPointsY[i].setTarget(windowHeight);
    }
    for (let i = 0; i < img.length; i ++) {
      dataPointsY1[i].setTarget(windowHeight);
    }
  }
}

function causeHover() {
  push();
  for (let i = 0; i < img.length; i ++) {
    if (dist(mouseX, mouseY, 160, 460)< 15) {
      textSize(14);
      fill(255);
      textFont('Open Sans');
      text("Stimulus", 130, 460);
      if ((data[i][3]) == 'Stimulus') {
        image(img[i], xpos[i], ypos[i], 90, 90);
      }
    }

    if (dist(mouseX, mouseY, 160, 485)< 15) {
      textSize(14);
      fill(255);
      textFont('Open Sans');
      text("Memory", 130, 485);
      if ((data[i][3]) == 'Memory') {
        image(img[i], xpos[i], ypos[i], 90, 90);
      }
    }

    if (dist(mouseX, mouseY, 160, 510)< 15) {
      textSize(14);
      textFont('Open Sans');
      fill(255);
      text("Imagination", 130, 510);
      if ((data[i][3]) == 'Imagination') {
        image(img[i], xpos[i], ypos[i], 90, 90);
      }
    }
  }
  pop();
}

function typeHover() {
  for (let i = 0; i < img.length; i ++) {
    if (dist(mouseX, mouseY, 100, 660)< 15) {
      textSize(14);
      fill(255);
      textFont('Open Sans');
      text("Positive", 85, 660);
      if ((data[i][2]) == 'Positive') {
        image(img[i], xpos[i], ypos[i], 90, 90);
      }
    }

    if (dist(mouseX, mouseY, 200, 660)< 15) {
      textSize(14);
      fill(255);
      textFont('Open Sans');
      text("Negative", 180, 660);
      if ((data[i][2]) == 'Negative') {
        image(img[i], xpos[i], ypos[i], 90, 90);
      }
    }

    if (dist(mouseX, mouseY, 300, 660)< 15) {
      textSize(14);
      textFont('Open Sans');
      fill(255);
      text("Neutral", 285, 660);
      if ((data[i][2]) == 'Neutral') {
        image(img[i], xpos[i], ypos[i], 90, 90);
      }
    }
  }
}

function colorHover() {
  for (let i = 0; i < img.length; i ++) {
    for (let j = 0; j < words.length; j ++) {
      if (dist(mouseX, mouseY, 495 + 80*j, 80)< 15) {
        if (data[i][1].indexOf(words[j]) !== -1) {
          fill(colorSet[j]);
          circle(495 + 80 * j, 80, 30);
          image(img[i], xpos[i], ypos[i], 90, 90);
        }
      }
    }
  }
}

function emotionHover() {
  for (let i = 0; i < img.length; i ++) {
    if (dist(mouseX, mouseY, 1290, 80)< 15) {
      if (data[i][1].indexOf("Happy") !== -1 || data[i][1].indexOf("Loved") !== -1 ) {
        alpha = lerp(alpha, 255, 1);
        tint(255, alpha);
        image(img[i], xpos[i], ypos[i], 90, 90);
      }
    }
    if (dist(mouseX, mouseY, 1430, 80)< 15) {
      if (data[i][1].indexOf("Surprised") !== -1 || data[i][1].indexOf("Confused") !== -1 ||
        data[i][1].indexOf("Shocked") !== -1) {
        alpha = lerp(alpha, 255, 1);
        tint(255, alpha);
        image(img[i], xpos[i], ypos[i], 90, 90);
      }
    }
    if (dist(mouseX, mouseY, 1360, 80)< 15) {
      if (data[i][1].indexOf("Angry") !== -1 || data[i][1].indexOf("Anxious") !== -1 ||
        data[i][1].indexOf("Sad") !== -1 || data[i][1].indexOf("Depressed") !== -1 ||
        data[i][1].indexOf("Scared") !== -1) {
        alpha = lerp(alpha, 255, 1);
        tint(255, alpha);
        image(img[i], xpos[i], ypos[i], 90, 90);
      }
    }
  }
}


function displayText(i, x, y) {//when hover over an image, display text gradually
  if (dist(mouseX, mouseY, x, y) < 20) {
    textFont('Open Sans');
    textSize(14);
    alpha = fade[i].get();
    fill(255, alpha);
    text(msg(i), 1100, 380);
  }
}

function indexImg(index) {//draw all images in gray except the hovered one
  for (let i = 0; i < img.length; i ++) {
    if (i != index) {
      tint(255, 0);
      image(img[i], xpos[i], ypos[i], 90, 90);
    }
  }
}

function mouseMoved() {
  // Check if the mouse is over any of the images
  index = -1;
  for (let i = 0; i < img.length; i++) {
    if (dist(mouseX, mouseY, xpos[i], ypos[i]) < 20) {
      index = i;
    }
  }
  for (let j = 0; j < words.length; j ++) {
    if (dist(mouseX, mouseY, 495 + 80*j, 80)< 15 || dist(mouseX, mouseY, 160, 460)< 15 ||
      dist(mouseX, mouseY, 160, 485)< 15 || dist(mouseX, mouseY, 160, 510)< 15 ||
      dist(mouseX, mouseY, 100, 660)< 15 || dist(mouseX, mouseY, 300, 660)< 15 ||
      dist(mouseX, mouseY, 200, 660)< 15 || dist(mouseX, mouseY, 1290, 80)< 15 ||
      dist(mouseX, mouseY, 1430, 80)< 15 || dist(mouseX, mouseY, 1360, 80)< 15) {
      index = 40;
    }
  }
}

function displayImg() {
  for (let i = 0; i < img.length; i ++) {
    if (index == -1) {
      image(img[i], xpos[i], ypos[i], 90, 90);
    }
    if (index == 40) {
      tint(255, 100);
      image(img[i], xpos[i], ypos[i], 90, 90);
    }
    if (i == index) {
      fadeIn(index);
      displayText(i, xpos[i], ypos[i]);
      alpha = fade[i].get();
      tint(255, alpha);
      image(imgCopy[i], windowWidth/2, windowHeight/2);
      indexImg(index);
    }
  }
}


function fadeIn(index) {
  fade.forEach(function(entry) {
    entry.setTarget(0);  // fade everyone out
  }
  );
  fade[index].setTarget(250);  // fade this one in
}

//function from Professor Fry
// Resizing from a very large image to a small image can make it blocky.
// The solution is to resize in multiple steps, decreasing it by half each time,
// until we're close enough to the target size that we can just resize it directly.
function betterResize(img, targetWidth) {
  // as long as the image size is more than 2x the target width,
  // keep cutting the size down by half
  while (img.width / targetWidth > 2) {
    // cut it down by half
    img.resize(img.width / 2, 0);
  }
  // finally, resize to the exact size we want
  img.resize(targetWidth, 0);
}
