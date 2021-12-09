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
  return generateInputList('./day8.txt');
}

const verifyNums = (str,strList) => {
  str = str.split('').sort().join("");
  if (str.length === 2) return 1;
  else if (str.length === 3) return 7;
  else if (str.length === 4) return 4;
  else if (str.length === 7) return 8;
  else if (str.length === 6) {

  }
  else return -1;
}

const day8 = async () => {
  list = await listInput();
  console.log(list);
  const numbers = [];
  for (let i = 0; i < list.length; i++) {
    let strOutput = list[i].split('|')[1].trim().split(" ");
    numbers.push(...strOutput);
  }
  console.log(numbers);
  let validNumbersCount = 0;
  // for (let i = 0; i < numbers.length; i++) {
  //   // let returnedNum = verifyNum(numbers[i]);
  //   // if (returnedNum === 1 || returnedNum === 4 || returnedNum === 7 || returnedNum === 8) validNumbersCount++;
  // }
  // return counts of numbers of lengths 1, 4, 7, and 8
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i].length <= 4 || numbers[i].length === 7) validNumbersCount++;
  }
  
  console.log(validNumbersCount);
}

const day8_2 = async () => {
  list = await listInput();
  console.log(list);
  //   aaaa 
  //  b    c 
  //  b    c 
  //   dddd 
  //  e    f
  //  e    f
  //   gggg 
  const decodedNumbers = [];
  
  for (let i = 0; i < list.length; i++) {
    let numList = new Array(10);
    let jumbledNumbers = list[i].split("|")[0].trim().split(" ");
    let lettersToDecode = list[i].split("|")[1].trim().split(" ");
    let decodedNumberStr = "";
    jumbledNumbers = jumbledNumbers.sort((a,b) => a.length - b.length)
    
    console.log(jumbledNumbers);
    numList[1] = jumbledNumbers[0];
    numList[7] = jumbledNumbers[1];
    numList[4] = jumbledNumbers[2];
    numList[8] = jumbledNumbers[9];
    // Figure out 9
    for (let j = 6; j < 9; j++) {
      let correct9 = true;
      for (let k = 0; k < numList[4].length; k++) {
        if (!jumbledNumbers[j].includes(numList[4][k])) correct9 = false;
      }
      if (correct9) {
        numList[9] = jumbledNumbers[j];
        break;
      }
    }
    // Figure out 3
    for (let j = 3; j < 6; j++) {
      let correct3 = true;
      for (let k = 0; k < numList[7].length; k++) {
        if (!jumbledNumbers[j].includes(numList[7][k])) correct3 = false;
      }
      if (correct3) {
        numList[3] = jumbledNumbers[j];
        break;
      }
    }
    // Figure out 2
    for (let j = 3; j < 6; j++) {
      let correct2Count = 0;
      for (let k = 0; k < numList[4].length; k++) {
        if (jumbledNumbers[j].includes(numList[4][k])) correct2Count++;
      }
      if (correct2Count === 2) {
        numList[2] = jumbledNumbers[j];
        break;
      }
      correct2Count = 0;
    }
    // Figure out 5, which is remaining five-letter set
    for (let j = 3; j < 6; j++) {
      if (jumbledNumbers[j] === numList[3] || jumbledNumbers[j] === numList[2]) continue;
      else {
        numList[5] = jumbledNumbers[j];
        break;
      }
    }
    // Figure out 6
    for (let j = 6; j < 9; j++) {
      let correct6 = true;
      if (numList[9] === jumbledNumbers[j]) continue;
      for (let k = 0; k < numList[5].length; k++) {
        if (!jumbledNumbers[j].includes(numList[5][k])) correct6 = false;
      }
      
      if (correct6) {
        numList[6] = jumbledNumbers[j];
        break;
      }
    }
    // Figure out 0, which is remaining six-letter set
    for (let j = 6; j < 9; j++) {
      if (jumbledNumbers[j] === numList[6] || jumbledNumbers[j] === numList[9]) continue;
      else {
        numList[0] = jumbledNumbers[j];
        break;
      }
    }
    
    console.log(numList);
    console.log(lettersToDecode);
    // sort all the letters alphabetically in both sets
    for (let j = 0; j < numList.length; j++) {
      numList[j] = numList[j].split('').sort().join('');
    }
    console.log(numList);
    for (let j = 0; j < lettersToDecode.length; j++) {
      lettersToDecode[j] = lettersToDecode[j].split('').sort().join('');
      decodedNumberStr += numList.indexOf(lettersToDecode[j])
    }
    decodedNumbers.push(parseInt(decodedNumberStr));
  }
  console.log(decodedNumbers);
  let sum = decodedNumbers.reduce((acc, a) => acc + a)
  console.log(sum)
}


day8_2()