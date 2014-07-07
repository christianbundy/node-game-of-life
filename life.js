// Parent class
var Life = {
  plane:  [[0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0],
           [0, 1, 1, 1, 0],
           [0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0]],
  print: function () {
    Life.plane.forEach(console.dir)
  },
  countNeighbors: function (r, c) {
    var count = 0;
    var optionCount = 0;
    var options = [-1, 0, 1];
    options.forEach(function (row) {
      options.forEach(function (column) {
        if (!(column === 0 && row === 0)) {
          if (typeof Life.plane[r + row] !== 'undefined') {
            if (typeof Life.plane[r + row][c + column] !== 'undefined') {
              count += Life.plane[r + row][c + column];
            }
          }
        }
      });
    });
    return count;
  },
  rules: [
    // Any live cell with fewer than two live neighbours dies.
    function (r, c) {
      if (Life.plane[r][c] === 1) {
        if (Life.countNeighbors(r, c) < 2) {
          // console.log('STARVATION', r, c);
          return 0;
        }
      }
    },
    // Any live cell with two or three live neighbours lives.
    function (r, c) {
      if (Life.plane[r][c] === 1) {
        if (
          (Life.countNeighbors(r, c) === 2) ||
           Life.countNeighbors(r, c) === 3) {
          // console.log('LIFE', r, c);
          return 1;
        }
      }
    },
    // Any live cell with more than three live neighbours dies.
    function (r, c) {
      if (Life.plane[r][c] === 1) {
        if (Life.countNeighbors(r, c) > 3) {
          // console.log('OVERPOPULATION', r, c);
          return 0;
        }
      }
    },
    // Any dead cell with exactly three live neighbours becomes a live cell.
    function (r, c) {
      if (Life.plane[r][c] === 0) {
        if (Life.countNeighbors(r, c) === 3) {
          // console.log('RESURRECTION', r, c);
          return 1;
        }
      }
    }
  ],
  tick:  function () {
    var newPlane = [];

    Life.plane.forEach(function () {
      var row = new Array(Life.plane[0].length);
      newPlane.push(row);
    });

    Life.plane.forEach(function (row, rowIndex) {
      row.forEach(function (cell, cellIndex) {
        var changeMade = false;
        Life.rules.forEach(function (rule) {
          var status = rule(rowIndex, cellIndex);
          if (typeof status !== 'undefined') {
            newPlane[rowIndex][cellIndex] = status;
            changeMade = true;
          }
        });
        if (!changeMade) {
          newPlane[rowIndex][cellIndex] = Life.plane[rowIndex][cellIndex];
        }
      });
    });

    Life.tickCount++;
    Life.plane = newPlane;
  },
  tickCount: 0
};

/*
var thing = undefined;

Life.rules.forEach(function (rule) {
  var status = rule(1, 2);
  if (typeof status !== 'undefined') {
    thing = status;
  }
});

console.log(thing);
*/

module.exports = Life;
