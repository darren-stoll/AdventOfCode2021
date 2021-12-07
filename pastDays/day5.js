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
  return generateInputList('./day5.txt');
}


const day5Vents = async () => {
  list = await listInput();
  console.log(list);
  let commandList = []
  for (let i = 0; i < list.length; i++) {
    commandList.push(list[i].split(/[,\-> ]+/));
  }
  let maxXY = Math.max(...[].concat(...commandList)) + 1;

  let diagram = []
  for (let i = 0; i < maxXY; i++) {
    let diagramRow = []
    for (let j = 0; j < maxXY; j++) {
      diagramRow.push(0);
    }
    diagram.push(diagramRow);
  }

  // remove diagonals
  let dCommandList = [];
  for (let i = 0; i < commandList.length; i++) {
    if (commandList[i][0] == commandList[i][2] || commandList[i][1] == commandList[i][3]) {
      dCommandList.push(commandList[i]);
    }
  }

  for (let i = 0; i < dCommandList.length; i++) {
    let fromX,toX,fromY,toY;
    fromX = parseInt(dCommandList[i][0])
    fromY = parseInt(dCommandList[i][1])
    toX = parseInt(dCommandList[i][2])
    toY = parseInt(dCommandList[i][3])
    if (fromX < toX) {
      for (let j = fromX; j <= toX; j++) {
        if (diagram[fromY][j] != 2) diagram[fromY][j]++;
      }
    } else if (fromY < toY) {
      for (let j = fromY; j <= toY; j++) {
        if (diagram[j][fromX] != 2) diagram[j][fromX]++;
      }
    } else if (fromX > toX) {
      for (let j = fromX; j >= toX; j--) {
        if (diagram[fromY][j] != 2) diagram[fromY][j]++;
      }
    } else if (fromY > toY) {
      for (let j = fromY; j >= toY; j--) {
        if (diagram[j][fromX] != 2) diagram[j][fromX]++;
      }
    }
  }
  let overlapCount = 0;

  let flatDiagram = diagram.flat();
  flatDiagram.forEach(x => {
    if (x == 2) overlapCount++;
  })

  console.log(overlapCount);
}

const day5VentsDiag = async () => {
  list = await listInput();
  console.log(list);
  let commandList = [];
  for (let i = 0; i < list.length; i++) {
    commandList.push(list[i].split(/[,\-> ]+/));
  }
  let maxXY = Math.max(...[].concat(...commandList)) + 1;

  let diagram = []
  for (let i = 0; i < maxXY; i++) {
    let diagramRow = []
    for (let j = 0; j < maxXY; j++) {
      diagramRow.push(0);
    }
    diagram.push(diagramRow);
  }

  for (let i = 0; i < commandList.length; i++) {
    let fromX,toX,fromY,toY;
    fromX = parseInt(commandList[i][0])
    fromY = parseInt(commandList[i][1])
    toX = parseInt(commandList[i][2])
    toY = parseInt(commandList[i][3])

    if (fromX < toX) {
      if (fromY == toY) {
        for (let j = fromX; j <= toX; j++) {
          if (diagram[fromY][j] != 2) diagram[fromY][j]++;
        }
      } else if (fromY < toY) {
        let c = 0;
        for (let j = fromX; j <= toX; j++) {
          if (diagram[fromY+c][j] != 2) diagram[fromY+c][j]++;
          c++;
        }
      } else if (fromY > toY) {
        let c = 0;
        for (let j = fromX; j <= toX; j++) {
          if (diagram[fromY+c][j] != 2) diagram[fromY+c][j]++;
          c--;
        }
      }
    } else if (fromY < toY) {
      if (fromX == toX) {
        for (let j = fromY; j <= toY; j++) {
          if (diagram[j][fromX] != 2) diagram[j][fromX]++;
        }
      } else if (fromX < toX) {
        let c = 0;
        for (let j = fromY; j <= toY; j++) {
          if (diagram[j][fromX+c] != 2) diagram[j][fromX+c]++;
          c++;
        }
      } else if (fromX > toX) {
        let c = 0;
        for (let j = fromY; j <= toY; j++) {
          if (diagram[j][fromX+c] != 2) diagram[j][fromX+c]++;
          c--;
        }
      }
    } else if (fromX > toX) {
      if (fromY == toY) {
        for (let j = fromX; j >= toX; j--) {
          if (diagram[fromY][j] != 2) diagram[fromY][j]++;
        }
      } else if (fromY < toY) {
        let c = 0;
        for (let j = fromX; j >= toX; j--) {
          if (diagram[fromY+c][j] != 2) diagram[fromY+c][j]++;
          c++;
        }
      } else if (fromY > toY) {
        let c = 0;
        for (let j = fromX; j >= toX; j--) {
          if (diagram[fromY+c][j] != 2) diagram[fromY+c][j]++;
          c--;
        }
      }
    } else if (fromY > toY) {
      if (fromX == toX) {
        for (let j = fromY; j >= toY; j--) {
          if (diagram[j][fromX] != 2) diagram[j][fromX]++;
        }
      } else if (fromX < toX) {
        let c = 0;
        for (let j = fromY; j >= toY; j--) {
          if (diagram[j][fromX+c] != 2) diagram[j][fromX+c]++;
          c++;
        }
      } else if (fromX > toX) {
        let c = 0;
        for (let j = fromY; j >= toY; j--) {
          if (diagram[j][fromX+c] != 2) diagram[j][fromX+c]++;
          c--;
        }
      }
    }
  }
  // console.log(diagram);

  let overlapCount = 0;

  let flatDiagram = diagram.flat();
  flatDiagram.forEach(x => {
    if (x == 2) overlapCount++;
  })

  console.log(overlapCount);
}


day5VentsDiag()