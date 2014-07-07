var Life = require('./life');

test = function (name, start, end) {
  Life.plane = start;
  Life.tick();

  var failure = false;
  Life.plane.forEach(function (row, rowIndex) {
    row.forEach(function (cell, cellIndex) {
      if (Life.plane[rowIndex][cellIndex] !== end[rowIndex][cellIndex]) {
        failure = true;
      }
    });
  })

  if (!failure) {
    console.log('PASS: ' + name)
  } else {
    console.error('FAIL: ' + name);
  }

};


//////////////////////////////////////////////////

var empty = [];
test("Empty", empty, empty);

////////////////////////////////////////////////////

var block = [[0, 0, 0, 0],
             [0, 1, 1, 0],
             [0, 1, 1, 0],
             [0, 0, 0, 0]];

test("Block", block, block);

////////////////////////////////////////////////////

var horizontalBlinker = [[0, 0, 0, 0, 0],
                         [0, 0, 0, 0, 0],
                         [0, 1, 1, 1, 0],
                         [0, 0, 0, 0, 0],
                         [0, 0, 0, 0, 0]];

var verticalBlinker = [[0, 0, 0, 0, 0],
                       [0, 0, 1, 0, 0],
                       [0, 0, 1, 0, 0],
                       [0, 0, 1, 0, 0],
                       [0, 0, 0, 0, 0]];

test("Blinker", horizontalBlinker, verticalBlinker);

////////////////////////////////////////////////////

var fullBeacon = [[0, 0, 0, 0, 0, 0],
                  [0, 1, 1, 0, 0, 0],
                  [0, 1, 1, 0, 0, 0],
                  [0, 0, 0, 1, 1, 0],
                  [0, 0, 0, 1, 1, 0],
                  [0, 0, 0, 0, 0, 0],
                  ];

var emptyBeacon = [[0, 0, 0, 0, 0, 0],
                   [0, 1, 1, 0, 0, 0],
                   [0, 1, 0, 0, 0, 0],
                   [0, 0, 0, 0, 1, 0],
                   [0, 0, 0, 1, 1, 0],
                   [0, 0, 0, 0, 0, 0],
                   ];

test("Beacon", fullBeacon, emptyBeacon);
