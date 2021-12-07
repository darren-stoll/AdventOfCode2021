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
  
  return generateInputList('./day3.txt');
}

const day3GammaRate = async () => {
  list = await listInput();
  console.log(list);
  bitOccurrenceList = []
  for (let i = 0; i < list[0].length; i++) {
    bitOccurrenceList.push(parseInt(list[0][i]))
  }
  for (let i = 1; i < list.length; i++) {
    for (let j = 0; j < list[i].length; j++) {
      if (list[i][j] == '0') {
        bitOccurrenceList[j] -= 1
      } else {
        bitOccurrenceList[j] += 1
      }
    }
  }
  let currentBitMultiplier = 1
  let gammaRate = 0
  let epsilon = 0
  // For gamma rate and epsilon
  for (let i = bitOccurrenceList.length - 1; i >= 0; i--) {
    if (bitOccurrenceList[i] > 0) {
      gammaRate += currentBitMultiplier
    } else {
      epsilon += currentBitMultiplier
    }
    currentBitMultiplier *= 2;
  }
  console.log(gammaRate * epsilon);
}

const day3LifeSupport = async () => {
  list = await listInput();
  console.log(list);
  let bitCounts = [0,0]
  let oxygenList = list;
  let c02List = list;
  let nextList = [];
  for (let j = 0; j < list[0].length; j++) {
    if (oxygenList.length == 1) break;
    for (let i = 0; i < oxygenList.length; i++) {
      if (oxygenList[i][j] == '0') bitCounts[0] += 1;
      else bitCounts[1] += 1;
    }
    if (bitCounts[0] > bitCounts[1]) {
      for (let i = 0; i < oxygenList.length; i++) {
        if (oxygenList[i][j] == '0') nextList.push(oxygenList[i]);
      }
    } else if (bitCounts[0] <= bitCounts[1]) {
      for (let i = 0; i < oxygenList.length; i++) {
        if (oxygenList[i][j] == '1') nextList.push(oxygenList[i]);
      }
    }
    bitCounts = [0,0]
    oxygenList = nextList;
    nextList = [];
  }
  for (let j = 0; j < list[0].length; j++) {
    if (c02List.length == 1) break;
    for (let i = 0; i < c02List.length; i++) {
      if (c02List[i][j] == '0') bitCounts[0] += 1;
      else bitCounts[1] += 1;
    }
    if (bitCounts[0] <= bitCounts[1]) {
      for (let i = 0; i < c02List.length; i++) {
        if (c02List[i][j] == '0') nextList.push(c02List[i]);
      }
    } else if (bitCounts[0] > bitCounts[1]) {
      for (let i = 0; i < c02List.length; i++) {
        if (c02List[i][j] == '1') nextList.push(c02List[i]);
      }
    }
    bitCounts = [0,0]
    c02List = nextList;
    nextList = [];
  }

  let oxygenRating = oxygenList[0];
  let c02Rating = c02List[0];
  
  let currentBitMultiplier = 1
  let oxygenInt = 0
  let c02Int = 0
  // For oxygen
  for (let i = oxygenRating.length - 1; i >= 0; i--) {
    if (oxygenRating[i] == '1') {
      oxygenInt += currentBitMultiplier
    } 
    currentBitMultiplier *= 2;
  }
  // For c02
  currentBitMultiplier = 1
  for (let i = c02Rating.length - 1; i >= 0; i--) {
    if (c02Rating[i] == '1') {
      c02Int += currentBitMultiplier
    } 
    currentBitMultiplier *= 2;
  }
  console.log(oxygenInt,c02Int);
}

day3LifeSupport()