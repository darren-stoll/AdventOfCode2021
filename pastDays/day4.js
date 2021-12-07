const fs = require('fs').promises;

const assertEqual = (expected, actual) => {
  console.log(expected === actual);
}

const generateInputList = async (txtFile) => {
  try {
    var list = [];
    const data = await fs.readFile(txtFile, 'utf8')
    list = data.split('\r\n')
    return list;
  } catch (err) {
    console.log(err);
    return;
  }
}

const listInput = () => {
  
  return generateInputList('./day4.txt');
}

const markCardCheckCard = (card, draw) => {
  //mark card, if any spots
  for (let i = 0; i < card.length; i++) {
    for (let j = 0; j < card[i].length; j++) {
      if (card[i][j] == draw) card[i][j] = card[i][j] + "m"
    }
  }
  //check card for bingo
  //check rows
  for (let i = 0; i < card.length; i++) {
    let markedCount = 0;
    for (let j = 0; j < card[i].length; j++) {
      if (card[i][j].includes('m')) markedCount++;
    }
    if (markedCount == 5) return true;
  }

  //check cols
  for (let i = 0; i < card.length; i++) {
    let markedCount = 0;
    for (let j = 0; j < card[i].length; j++) {
      if (card[j][i].includes('m')) markedCount++;
    }
    if (markedCount == 5) return true;
  }
  return false;

}

const day4Bingo = async () => {
  list = await listInput();
  console.log(list);
  let draws = list[0].split(',');
  let cards = []
  let card = [];
  // create bingo cards list
  for (let i = 2; i < list.length; i++) {
    let row = list[i].trim().split(/\s+/);
    card.push(row);
    if (list[i+1] == '' || i == list.length - 1) {
      cards.push(card);
      card = [];
      i += 1;
      continue;
    }
  }
  // mark and check each card for a bingo
  let doneCard;
  let markedOffCard, markedOffDraw;
  for (let i = 0; i < draws.length; i++) {
    for (let j = 0; j < cards.length; j++) {
       doneCard = markCardCheckCard(cards[j],draws[i]);
       if (doneCard) {
         markedOffCard = cards[j];
         markedOffDraw = draws[i];
         break;
       }
    }
    if (doneCard) break;
  }
  console.log(markedOffCard, markedOffDraw);

  // calculate the score based on draw and remaining numbers on card
  let sumOfUnmarked = 0;
  for (let i = 0; i < markedOffCard.length; i++) {
    for (let j = 0; j < markedOffCard[i].length; j++) {
      if (!markedOffCard[i][j].includes('m')) sumOfUnmarked += parseInt(markedOffCard[i][j]);
    }
  }
  console.log(sumOfUnmarked * markedOffDraw);
}

const day4BingoLast = async () => {
  list = await listInput();
  console.log(list);
  let draws = list[0].split(',');
  let cards = []
  let card = [];
  // create bingo cards list
  for (let i = 2; i < list.length; i++) {
    let row = list[i].trim().split(/\s+/);
    card.push(row);
    if (list[i+1] == '' || i == list.length - 1) {
      cards.push(card);
      card = [];
      i += 1;
      continue;
    }
  }
  // mark and check each card for a bingo
  // mark the card, set it to an empty array, and pop empty ones when finished with draw
  let doneCard;
  let markedOffCard, markedOffDraw, markedOffDrawIndex;
  for (let i = 0; i < draws.length; i++) {
    for (let j = 0; j < cards.length; j++) {
      doneCard = markCardCheckCard(cards[j],draws[i]);
      if (doneCard) {
        cards[j] = [];
      }
    }
    // go through another loop to check for empty arrays
    for (let j = 0; j < cards.length; j++) {
      if (cards[j].length == 0) {
        cards.splice(j,1);
        j = -1;
      }
    }
    if (cards.length == 1) {
      markedOffCard = cards[0];
      markedOffDraw = draws[i];
      markedOffDrawIndex = i;
      break;
    }
  }

  // play the final board until it has won
  for (let i = markedOffDrawIndex+1; i < draws.length; i++) {
    doneCard = markCardCheckCard(markedOffCard,draws[i]);
    if (doneCard) {
      markedOffDraw = draws[i];
      break;
    }
  }
  console.log(markedOffCard, markedOffDraw);

  // calculate the score based on draw and remaining numbers on card
  let sumOfUnmarked = 0;
  for (let i = 0; i < markedOffCard.length; i++) {
    for (let j = 0; j < markedOffCard[i].length; j++) {
      if (!markedOffCard[i][j].includes('m')) sumOfUnmarked += parseInt(markedOffCard[i][j]);
    }
  }
  console.log(sumOfUnmarked * markedOffDraw);
}


day4BingoLast()