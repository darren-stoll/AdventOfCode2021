const fs = require('fs').promises;

const assertEqual = (expected, actual) => {
  console.log(expected === actual);
}

var fileName = './day1.txt'

var generateInputList = async (txtFile) => {
  try {
    var list = [];
    const data = await fs.readFile(txtFile, 'utf8')
    list = data.split('\r\n')
    console.log(list);
    return list;
  } catch (err) {
    console.log(err);
    return;
  }
}

var testInput = [];

const listTestValue = () => {
  // return testInput;
  return generateInputList(fileName);
}

const dayNum = async () => {
  list = await listTestValue();
}

dayNum();