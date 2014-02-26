
/**
 * Module dependencies.
 */

var fs = require('fs');
var path = require('path');

var json = exec('data/edc3deuttemp2007.txt');
fs.writeFileSync('index.json', JSON.stringify(json, null, 2));

function exec(filePath) {
  var records = [];

  // small file
  fs.readFileSync(filePath, 'utf-8').split(/\n/).forEach(function(line, i){
    if (i < 92) return;

    var parts = line.trim().split(/\s+/);

    // Column 1: Bag number (55 cm sample)
    // Column 2: Top depth (m)
    // Column 3: EDC3 age scale (years before year 1950)
    // Column 4: dD data (per mille with respect to SMOW)
    // Column 5: Temperature estimate (temperature difference from the average of the last 1000 years)

    records.push({
      bagId: parseInt(parts[0]),
      depth: parseFloat(parts[1]),
      age: parseFloat(parts[2]), // XXX: convert to time
      deuterium: parseFloat(parts[3]) || undefined,
      temperature: parseFloat(parts[4]) || undefined
    });
  });

  return records;
}