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
  return generateInputList('./day7.txt');
}


const day7 = async () => {
  list = await listInput();
  console.log(list);
  list = list[0].split(',');
  let intList = [];
  list.forEach(x => {
    intList.push(parseInt(x));
  })
  console.log(intList);
  let min = Math.min(...intList);
  let max = Math.max(...intList);
  console.log(min,max);
  let fuelList = [];
  let fuelCost;
  for (let i = min; i < max; i++) {
    fuelCost = 0;
    for (let j = 0; j < intList.length; j++) {
      fuelCost += Math.abs(intList[j] - i);
    }
    fuelList.push(fuelCost);
  }
  console.log(Math.min(...fuelList));
  console.log(fuelList.indexOf(Math.min(...fuelList)))
}

const day7_2 = async () => {
  list = await listInput();
  console.log(list);
  list = list[0].split(',');
  let intList = [];
  list.forEach(x => {
    intList.push(parseInt(x));
  })
  console.log(intList);
  let min = Math.min(...intList);
  let max = Math.max(...intList);
  console.log(min,max);
  let fuelList = [];
  let fuelCost;
  for (let i = min; i < max; i++) {
    fuelCost = 0;
    for (let j = 0; j < intList.length; j++) {
      let n = Math.abs(intList[j] - i)
      fuelCost += ((Math.pow(n,2) + n)/2);
    }
    fuelList.push(fuelCost);
  }
  console.log(fuelList);
  console.log(Math.min(...fuelList));
  console.log(fuelList.indexOf(Math.min(...fuelList)))
}

day7_2()