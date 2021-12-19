const fs = require('fs').promises;

const assertEqual = (expected, actual) => {
  console.log(expected === actual);
}

const generateInputList = async (txtFile) => {
  try {
    let list = [];
    const data = await fs.readFile(txtFile, 'utf8')
    list = data.split('\r\n')
    return list;
  } catch (err) {
    console.log(err);
    return;
  }
}

const listInput = () => {  
  return generateInputList('./day9.txt');
}

const day9 = async () => {
  const list = await listInput();
  console.log(list);
  const lowPointValues = [];
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list[i].length; j++) {
      let lowCheck = true;
      //check right
      if (j < list[i].length - 1) {
        if (list[i][j] >= list[i][j+1]) lowCheck = false;
      }
      //check up
      if (i > 0) {
        if (list[i][j] >= list[i-1][j]) lowCheck = false;
      }
      //check left
      if (j > 0) {
        if (list[i][j] >= list[i][j-1]) lowCheck = false;
      }
      //check down
      if (i < list.length - 1) {
        if (list[i][j] >= list[i+1][j]) lowCheck = false;
      }
      if (lowCheck) lowPointValues.push(parseInt(list[i][j]) + 1);
    }
  }
  console.log(lowPointValues);
  console.log(lowPointValues.reduce((acc, a) => acc + a))
}

const checkAll = () => {

}

const day9_2 = async () => {
  let list = await listInput();
  console.log(list);

  const newGrid = []
  for (let i = 0; i < list.length; i++) {
    const gridRow = []
    for (let j = 0; j < list[i].length; j++) {
      gridRow.push(parseInt(list[i][j]));
    }
    newGrid.push(gridRow);
  }
  list = newGrid
  console.log(list)

  const startInfection = () => {
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list[i].length; j++) {
        if (list[i][j] < 9) {
          list[i][j] = "m"
          return
        }
      }
    }
  }
  
  const maxHeight = list.length - 1
  const maxWidth = list[0].length - 1
  
  const checkInBounds = (posX, posY) => {
    if (posX >= 0 && posY >= 0 && posY <= maxHeight && posX <= maxWidth) return true;
    return false;
  }
  
  const infect = () => {
    let mCount = 0
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list[i].length; j++) {
        if (list[i][j] === "m") {
          // check left
          if (checkInBounds(j,i-1)) {
            if (list[i-1][j] < 9) {
              list[i-1][j] = "m";
              mCount++;
            }
          }
          // check right
          if (checkInBounds(j,i+1)) {
            if (list[i+1][j] < 9) {
              list[i+1][j] = "m";
              mCount++;
            }
          }
          // check up
          if (checkInBounds(j-1,i)) {
            if (list[i][j-1] < 9) {
              list[i][j-1] = "m";
              mCount++
            }
          }
          // check down
          if (checkInBounds(j+1,i)) {
            if (list[i][j+1] < 9) {
              list[i][j+1] = "m";
              mCount++
            }
          }
          
        }
      }
    }
    return mCount
  }
  
  const infectEverything = () => {
    while (true) {
      let mCount = infect()
      if (mCount === 0) break;
    }
  }
  
  const prettify = () => {
    let str = "" 
    for (let i = 0; i < list.length; i++) {
      str += list[i].join('') + "\n"
    }
    return str
  }
  const mToNine = () => {
    let count = 0;
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list[i].length; j++) {
        if (list[i][j] === "m") {
          count++;
          list[i][j] = 9
        }
      }
    }
    return count
  }
  
  const listOfBasinSizes = []
  
  const checkAllNines = () => {
    let count = 0;
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list[i].length; j++) {
        if (list[i][j] !== 9) count++;
      }
    }
    console.log(count);
    if (count === 0) return false;
    return true
  }
  
  while (checkAllNines()) {
    // console.log(list)
    // console.log(prettify())
    startInfection()
    infectEverything()
    listOfBasinSizes.push(mToNine())
  }
  
  listOfBasinSizes.sort((a,b) => b - a)
  
  // answer
  console.log(listOfBasinSizes[0] * listOfBasinSizes[1] * listOfBasinSizes[2])
  
  console.log(prettify())
}

day9_2()