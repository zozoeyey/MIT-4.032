//let typeSlider;
//let causeSlider;

//in draw page #1
//let typeNum = typeSlider.value();
//let causeNum = causeSlider.value();

//display slider info
//textFont("OpenSans-Bold");
//textSize(20);
//strokeWeight(50);
//text("+", 1375, 100);
//text("-", 1400, 100);
//text("=", 1420, 100);

//textSize(14);
//text("S", 1375, 150);
//text("M", 1395, 150);
//text("I", 1420, 150);


//slider function
//function slider(typeNum, causeNum, i, x, y) {
//  if (typeNum == 0) {
//    if (causeNum == 0) {
//      image(img[i], x, y);
//      mouseHover(i, x, y);
//    }

//    if (causeNum == 1) {
//      if (data[i][3] == 'Stimulus') {
//        image(img[i], x, y);
//        mouseHover(i, x, y);
//      }
//    }
//    if (causeNum == 2) {
//      if (data[i][3] == 'Memory') {
//        image(img[i], x, y);
//        mouseHover(i, x, y);
//      }
//    }
//    if (causeNum == 3) {
//      if (data[i][3] == 'Imagination') {
//        image(img[i], x, y);
//        mouseHover(i, x, y);
//      }
//    }
//  }
//  if (typeNum== 1) {
//    if (causeNum == 0) {
//      if (data[i][2] == 'Positive') {
//        image(img[i], x, y);
//        mouseHover(i, x, y);
//      }
//    }
//    if (causeNum == 1) {
//      if (data[i][3] == 'Stimulus' &&  data[i][2] == 'Positive') {
//        image(img[i], x, y);
//        mouseHover(i, x, y);
//      }
//    }
//    if (causeNum == 2) {
//      if (data[i][3] == 'Memory' &&  data[i][2] == 'Positive') {
//        image(img[i], x, y);
//        mouseHover(i, x, y);
//      }
//    }
//    if (causeNum == 3) {
//      if (data[i][3] == 'Imagination' &&  data[i][2] == 'Positive') {
//        image(img[i], x, y);
//        mouseHover(i, x, y);
//      }
//    }
//  }

//  if (typeNum == 2) {
//    if (causeNum == 0) {
//      if (data[i][2] == 'Negative') {
//        image(img[i], x, y);
//        mouseHover(i, x, y);
//      }
//    }
//    if (causeNum == 1) {
//      if (data[i][3] == 'Stimulus' &&  data[i][2] == 'Negative') {
//        image(img[i], x, y);
//        mouseHover(i, x, y);
//      }
//    }
//    if (causeNum == 2) {
//      if (data[i][3] == 'Memory' &&  data[i][2] == 'Negative') {
//        image(img[i], x, y);
//        mouseHover(i, x, y);
//      }
//    }
//    if (causeNum == 3) {
//      if (data[i][3] == 'Imagination' &&  data[i][2] == 'Negative') {
//        image(img[i], x, y);
//        mouseHover(i, x, y);
//      }
//    }
//  }

//  if (typeNum == 3) {
//    if (causeNum == 0) {
//      if (data[i][2] == 'Neutral') {
//        image(img[i], x, y);
//        mouseHover(i, x, y);
//      }
//    }
//    if (causeNum == 1) {
//      if ((data[i][3]) == 'Stimulus' &&  data[i][2] == 'Neutral') {
//        image(img[i], x, y);
//        mouseHover(i, x, y);
//      }
//    }
//    if (causeNum == 2) {
//      if (data[i][3] == 'Memory' &&  data[i][2] == 'Neutral') {
//        image(img[i], x, y);
//        mouseHover(i, x, y);
//      }
//    }
//    if (causeNum == 3) {
//      if (data[i][3] == 'Imagination' &&  data[i][2] == 'Neutral') {
//        image(img[i], x, y);
//        mouseHover(i, x, y);
//      }
//    }
//  }
//}
