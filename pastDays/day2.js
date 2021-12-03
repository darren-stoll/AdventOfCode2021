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
  
  return generateInputList('./day2.txt');
}

const day2Distance = async () => {
  list = await listInput();
  console.log(list);
  var totalForward = 0
  var totalDepth = 0
  for (let i = 0; i < list.length; i++) {
    let command = list[i].split(' ');
    if (command[0] == "forward") {
      totalForward += parseInt(command[1])
    } else if (command[0] == "up") {
      totalDepth -= parseInt(command[1])
    } else if (command[0] == "down") {
      totalDepth += parseInt(command[1])
    }
  }
  console.log(totalDepth*totalForward)
}

const day2Aim = async () => {
  list = await listInput();
  console.log(list);
  var totalForward = 0
  var totalDepth = 0
  var totalAim = 0
  for (let i = 0; i < list.length; i++) {
    let command = list[i].split(' ');
    if (command[0] == "forward") {
      totalForward += parseInt(command[1])
      if (totalAim > 0) {
        totalDepth += command[1] * totalAim
      }
    } else if (command[0] == "up") {
      totalAim -= parseInt(command[1])
    } else if (command[0] == "down") {
      totalAim += parseInt(command[1])
    }
  }
  console.log(totalDepth,totalForward)
}

day2Aim()