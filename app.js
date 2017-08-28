'use strict';

var totalClicks = 0;
var maxClicks = 25;

// make a constructor function for all of the items we're selling
function Item (name, filePath, id) {
  this.name = name;
  this.filePath = filePath;
  this.timesShown = 0;
  this.timesClicked = 0;
  this.id = id;
  allItems.push(this);
}

var allItems = []; // array to hold all of our Item instances
var names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var paths = ['imgs/bag.jpg', 'imgs/banana.jpg', 'imgs/bathroom.jpg', 'imgs/boots.jpg', 'imgs/breakfast.jpg', 'imgs/bubblegum.jpg', 'imgs/chair.jpg', 'imgs/cthulhu.jpg', 'imgs/dog-duck.jpg', 'imgs/dragon.jpg', 'imgs/pen.jpg', 'imgs/pet-sweep.jpg', 'imgs/scissors.jpg', 'imgs/shark.jpg', 'imgs/sweep.png', 'imgs/tauntaun.jpg', 'imgs/unicorn.jpg', 'imgs/usb.gif', 'imgs/water-can.jpg', 'imgs/wine-glass.jpg'];
var ids = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

function createItems (){
  for (var i = 0; i < names.length; i++){
    // for each iteration, create a new Item object using the names, paths, and ids arrays
    new Item(names[i], paths[i], ids[i]);
  }
}
createItems();

// initialize two empty arrays
var thisRound = []; // contains whatever's generated this round
var lastRound = []; // contains whatever was generated last round

// make a function that randomly selects 3 images out of the images we've already created.
function makeThreeImages (){
  // write a for loop, where each iteration will select a distinct image
  // distinct: images haven't been used in the current set or in the last set
  for (var i = 1; i < 4; i++) {
    var indexNum = Math.floor(Math.random() * allItems.length);
    // check if I've already used this number or not
    if (lastRound.includes(indexNum) || thisRound.includes(indexNum)) {
      i--; // allows the for loop to step back one iteration
    } else {
      // we have a unique number, add it to this round of numbers
      thisRound.push(indexNum);
      allItems[indexNum].timesShown++; // increase the number of times shown for the Item instance we've selected
      var linkedImage = document.getElementById('image-' + i);
      linkedImage.setAttribute('src', allItems[indexNum].filePath);
      linkedImage.setAttribute('itemIdx', indexNum);
    }
  }
  // assign lastRound to thisRound so that this current set of numbers is reserved
  lastRound = thisRound;
  thisRound = [];
}
makeThreeImages();

// add an event listener to every img tag
for (var i = 0; i < document.getElementsByClassName('clickable').length; i++) {
  var image = document.getElementById('image-' + (i + 1));
  image.addEventListener('click', onClick);
}

// onClick registers the fact that the user clicked on an image
// increment up by 1 the value of timesClicked for the item that owns the image that was clicked
// it then kicks off the makeThreeImages function
function onClick (event){

  var itemIdx = parseInt(event.target.getAttribute('itemIdx'));
  var itemIWant = allItems[itemIdx];
  itemIWant.timesClicked++;
  makeThreeImages();
  totalClicks++;
  // if i'm at my max clicks, remove the event listeners and show the list
  if (totalClicks === maxClicks) {
    // otherwise remove the event listeners from all the image tags.
    for (var i = 0; i < document.getElementsByClassName('clickable').length; i++) {
      var image = document.getElementById('image-' + (i + 1));
      image.removeEventListener('click', onClick);
    }

    // when the user is done clicking, list results of the click tracker.
    var list = document.getElementById('list');
    if(localStorage.getItem('clicks')){
      var clArray = JSON.parse(localStorage.getItem('clicks'));
      var shArray = JSON.parse(localStorage.getItem('clicks'));
      for(var i = 0; i < allItems.length; i ++){
        allItems[i].timesClicked += clArray[i];
        allItems[i].timesShown += shArray[i];
      }
    }
    for (var j = 0; j < allItems.length; j++) {
      // for each item in the allItems array, show how many times each one was clicked.
      // create the list items to go into the list
      var li = document.createElement('li');
      // insert text within each list item
      li.innerText = allItems[j].name + ' was clicked ' + allItems[j].timesClicked + ' times and was shown ' + allItems[j].timesShown;
      // append the list items to "list"
      list.appendChild(li);
    }
    var clicksArray = [];
    var shownArray = [];
    for(var i = 0; i < allItems.length; i ++){
      clicksArray.push(allItems[i].timesClicked);
      shownArray.push(allItems[i].timesShown);
    }


  }
}
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var data = {
  labels: allItems,
  datasets: [{
    label: 'times clicked',
    backgroundColor: 'blue',
    data: clicksArray
  },{
    label: 'times shown',
    backgroundColor: 'red',
    data: shownArray
  }]
};
var myChart = new Chart(ctx, {
  type: 'bar',
  data: data,
  options:{
    barValueSpacing: 20,
    maintainAspectRatio: false,
  }
});
localStorage.setItem('clicks', JSON.stringify(clicksArray));
localStorage.setItem('shows', JSON.stringify(shownArray));
