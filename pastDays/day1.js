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
  
  return generateInputList('./day1.txt');
}

const day1Increases = async () => {
  list = await listInput();
  console.log(list);
  var currentDepth = list[0]
  var totalIncreases = 0
  for (var i = 1; i < list.length; i++) {
    if (list[i] > currentDepth) totalIncreases++;
    currentDepth = list[i];
  }
  console.log(totalIncreases);
}

const day1Sums = async () => {
  list = await listInput();
  console.log(list);
  var currentDepthSum = parseInt(list[0]) + parseInt(list[1]) + parseInt(list[2]);
  var totalIncreases = 0;
  for (var i = 1; i < list.length - 2; i++) {
    if ((parseInt(list[i]) + parseInt(list[i+1]) + parseInt(list[i+2])) > currentDepthSum) totalIncreases++;
    currentDepthSum = parseInt(list[i]) + parseInt(list[i+1]) + parseInt(list[i+2])
    // console.log(currentDepthSum)
  }
  console.log(totalIncreases);
}

day1Sums()