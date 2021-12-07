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
  return generateInputList('./day6.txt');
}


const day6LFish = async () => {
  list = await listInput();
  console.log(list);
  
  list = list[0].split(',');
  // console.log(list);
  for (let i = 0; i < list.length; i++) {
    list[i] = parseInt(list[i]);
  }
  // console.log(list);
  let newList = list;
  for (let i = 0; i < 80; i++) {
    for (let j = 0; j < list.length; j++) {
      if (list[j] == 0) {
        list[j] = 6;
        newList.push(9);
      }
      else list[j]--;
      
    }
    list = newList;
    // console.log(list);
  }
  console.log(list.length);
}

const day6ImmortalLFish = async () => {
  list = await listInput();
  console.log(list);
  
  list = list[0].split(',');
  // console.log(list);
  for (let i = 0; i < list.length; i++) {
    list[i] = parseInt(list[i]);
  }
  // console.log(list);
  let newList = list;
  let days = 80
  for (let i = 0; i < days; i++) {
    for (let j = 0; j < list.length; j++) {
      if (list[j] == 0) {
        list[j] = 6;
        newList.push(9);
      }
      else list[j]--;
      
    }
    list = newList;
    // console.log(list);
  }
  console.log(list.length);
}


day6ImmortalLFish()