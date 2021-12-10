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
  return generateInputList('./day10.txt');
}

const day10 = async () => {
  list = await listInput();
  console.log(list);
  let corruptors = [];
  for (let i = 0; i < list.length; i++) {
    let sL = list[i].split('');
    let j = 0;
    while (j < sL.length) {
      if (sL[j] === '[' || sL[j] === '(' || sL[j] === '{' || sL[j] === '<') {
        j++
        continue;
      }
      else if (sL[j] === ']' || sL[j] === ')' || sL[j] === '}' || sL[j] === '>') {
        j--;
        if (
          (sL[j] === '[' && sL[j+1] === ']')  ||
          (sL[j] === '(' && sL[j+1] === ')')  ||
          (sL[j] === '{' && sL[j+1] === '}')  ||
          (sL[j] === '<' && sL[j+1] === '>')
          ) {
            sL.splice(j,2);
        } else {
          corruptors.push(sL[j+1]);
          break;
        }
      }
    }
  }
  console.log(corruptors);
  // score the corruptors
  let score = 0;
  for (let i = 0; i < corruptors.length; i++) {
    if (corruptors[i] === ")") score += 3;
    else if (corruptors[i] === "]") score += 57;
    else if (corruptors[i] === "}") score += 1197;
    else if (corruptors[i] === ">") score += 25137;
  }
  console.log(score);
}

const day10_2 = async () => {
  list = await listInput();
  console.log(list);
  for (let i = 0; i < list.length; i++) {
    let sL = list[i].split('');
    let j = 0;
    // remove all corrupted lines
    while (j < sL.length) {
      if (sL[j] === '[' || sL[j] === '(' || sL[j] === '{' || sL[j] === '<') {
        j++
        continue;
      }
      else if (sL[j] === ']' || sL[j] === ')' || sL[j] === '}' || sL[j] === '>') {
        j--;
        if (
          (sL[j] === '[' && sL[j+1] === ']')  ||
          (sL[j] === '(' && sL[j+1] === ')')  ||
          (sL[j] === '{' && sL[j+1] === '}')  ||
          (sL[j] === '<' && sL[j+1] === '>')
          ) {
            sL.splice(j,2);
        } else {
          list.splice(i,1);
          i--;
          break;
        }
      }
      list[i] = sL.join('');
    }
  }
  console.log(list);
  // score incomplete lines
  let incompleteScores = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i][0] === '>' || list[i][0] === '>' || list[i][0] === '>' || list[i][0] === '>') continue;
    let score = 0;
    for (let j = list[i].length - 1; j >= 0; j--) {
      score *= 5;
      if (list[i][j] === '(') score += 1;
      else if (list[i][j] === '[') score += 2;
      else if (list[i][j] === '{') score += 3;
      else if (list[i][j] === '<') score += 4;
    }
    incompleteScores.push(score);
  }
  console.log(incompleteScores);
  // grab the median score
  incompleteScores.sort((a,b) => a - b);
  console.log(incompleteScores[(Math.floor(incompleteScores.length / 2))]);
}

day10_2()