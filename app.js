'use strict';
function Pics(name, url, shown, clicked){
  this.name = name;
  this.url = url;
  this.shown = shown;
  this.clicked = clicked;
}
var picOne = new Pics('bag', 'assets/bag.jpg', 0, 0);
var picTwo = new Pics('banana', 'assets/banana.jpg', 0, 0);
var picThree = new Pics('bathroom', 'assets/bathroom.jpg', 0, 0);
var picFour = new Pics('boots', 'assets/boots.jpg', 0, 0);
var picFive = new Pics('breakfast', 'assets/breakfast.jpg', 0, 0);
var picSix = new Pics('bubblegum', 'assets/bubblegum.jpg', 0, 0);
var picSeven = new Pics('chair', 'assets/chair.jpg', 0, 0);
var picEight = new Pics('cthulhu', 'assets/cthulhu.jpg', 0, 0);
var picNine = new Pics('dogDuck', 'assets/dog-duck.jpg', 0, 0);
var picTen = new Pics('dragon', 'assets/dragon.jpg', 0, 0);
var picEleven = new Pics('pen', 'assets/pen.jpg', 0, 0);
var picTwelve = new Pics('petSweep', 'assets/pet-sweep.jpg', 0, 0);
var picThirteen = new Pics('scissors', 'assets/scissors.jpg', 0, 0);
var picFourteen = new Pics('shark', 'assets/shark.jpg', 0, 0);
var picFifteen = new Pics('sweep', 'assets/sweep.png', 0, 0);
var picSixteen = new Pics('tauntaun', 'assets/tauntaun.jpg', 0, 0);
var picSeventeen = new Pics('unicorn', 'assets/unicorn.jpg', 0, 0);
var picEighteen = new Pics('usb', 'assets/usb.gif', 0, 0);
var picNineteen = new Pics('waterCan', 'assets/water-can.jpg', 0, 0);
var picTwenty = new Pics('wineGlass', 'assets/wine-glass.jpg', 0, 0);
var selectionCounter = 0;
var displayArray = [];
var mainArray = [picOne, picTwo, picThree, picFour, picFive, picSix, picSeven, picEight, picNine, picTen, picEleven, picTwelve, picThirteen, picFourteen, picFifteen, picSixteen, picSeventeen, picEighteen, picNineteen, picTwenty];
var form = document.getElementsByTagName('form')[0];
var createImg = function(parent, source, imgClass, idName){
  var element = document.createElement('img');
  element.setAttribute('src', source);
  element.setAttribute('class', imgClass);
  element.setAttribute('id', idName);
  console.log(element);
  parent.appendChild(element);
};
var initialFunction = function(){
  for (var i = 0; i < 3; i++){
    var rand = Math.floor(Math.random() * mainArray.length);
    var placeholder = mainArray[rand];
    displayArray.push(placeholder);
    mainArray.splice(rand, 1);
    createImg(form, displayArray[i].url, 'img', displayArray[i].name);
  };
};
initialFunction();
var displayTotals = function(){
  var body = document.getElementsByTagName('body')[0];
  var unList = document.createElement('ul');
  unList.setAttribute('class', 'unList');
  body.appendChild(unList);
  for(var i = 0; i < displayArray.length; i++){
    var listItem = document.createElement('li');
    listItem.innerText = 'The ' + displayArray[i].name + ' was displayed ' + displayArray[i].shown + ' times and was chosen ' + displayArray[i].clicked + ' times.';
    unList.appendChild(listItem);
  };
  for(var i = 0; i < mainArray.length; i++){
    var listItem = document.createElement('li');
    listItem.innerText = 'The ' + mainArray[i].name + ' was displayed ' + mainArray[i].shown + ' times and was chosen ' + mainArray[i].clicked + ' times.';
    unList.appendChild(listItem);
  };
};
var PicCycle = function(event){
  event.preventDefault();
  for (var i = 0; i < displayArray.length; i++){
    if (displayArray[i].name == event.currentTarget.id){
      displayArray[i].clicked += 1;
    }
  }
  selectionCounter += 1;
  var displayPlaceHolder = [];
  for (var x = 0; x < displayArray.length; x++){
    displayPlaceHolder.push(displayArray[x]);
  }
  displayArray.splice(0,3);
  for (var i = 0; i < 3; i++){
    var oldPic = document.getElementsByClassName('img')[0];
    form.removeChild(oldPic);
    var rand = Math.floor(Math.random() * mainArray.length);
    var placeholder = mainArray[rand];
    displayArray.push(placeholder);
    mainArray.splice(rand, 1);
    var img = createImg(form, displayArray[i].url, 'img', displayArray[i].name);
    displayArray[i].shown += 1;
  };
  mainArray = mainArray.concat(displayPlaceHolder);
  displayPlaceHolder = [];
  var picture = document.getElementsByClassName('img');
  for (var l = 0; l < picture.length; l++){
    picture[l].addEventListener('click', PicCycle);
    if (selectionCounter > 24){
      picture[l].removeEventListener('click', PicCycle);
    };
  };
  if (selectionCounter > 24){
    displayTotals();
  };
};
var picture = document.getElementsByClassName('img');
for (var l = 0; l < picture.length; l++){
  picture[l].addEventListener('click', PicCycle);
};

function chart() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var selectChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['bag', 'banana', 'bathroom' ,'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dogDuck', 'dragon', 'pen', 'petSweep', 'scissor', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'waterCan', 'wineGlass'],
      datasets: [
        {
          label: 'click',
          data: function clicks(),
          backgroundColor: brown,
        },
        {
          label: 'shown',
          data: // show function,
          backgroundColor: brown,
        }
      ]
    },
    options: {
    }
  });
}
