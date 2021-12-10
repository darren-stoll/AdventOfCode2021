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
  return generateInputList('./day9.txt');
}

const day9 = async () => {
  list = await listInput();
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
  list = await listInput();
  console.log(list);
  const trackedList = [];
  for (let i = 0; i < list.length; i++) {
    let row = [];
    for (let j = 0; j < list[i].length; j++) {
      row.push([list[i][j], 0])
    }
    trackedList.push(row);
  }
  console.log(trackedList)
}

day9_2()