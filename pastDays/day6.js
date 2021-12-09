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
  const fish = new Array(9).fill(0);
  
  for (let i = 0; i < list.length; i++) {
    fish[list[i]]++;
  }
  console.log(fish);
  
  const days = 256;
  
  for (let day = 0; day < days; day++) {
    // Credit goes to CBuchert for helping with the code
    // Each day, fish of day 0 reproduce.
    // Reproducing means: push 1 for each reproducing fish.
    // splice off position 0. Add position 0 to position 6.
    const reproducingFish = fish.splice(0, 1)[0];
    
    fish[6] += reproducingFish;
    fish.push(reproducingFish);
    const fishCount = fish.reduce((acc, curr) => acc + curr, 0)
    console.log({day, fishCount, fish});
  }
}


day6ImmortalLFish()