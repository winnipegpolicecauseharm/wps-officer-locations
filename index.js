const fs = require('fs');

const fsaToCount = JSON.parse(fs.readFileSync('fsa-to-wps-count.json'));
const populatedFsas = Object.keys(fsaToCount);

// From https://github.com/simon8907/FSA_Data/blob/master/Canadian_FSA.geojson
const allFsas = JSON.parse(fs.readFileSync('Canadian_FSA.geojson'));

allFsas.features = allFsas.features.filter(feature => populatedFsas.includes(feature.properties.CFSAUID));
allFsas.features.forEach(feature => feature.properties.wpses = fsaToCount[feature.properties.CFSAUID]);

fs.writeFileSync('FSA-WPS.geojson', JSON.stringify(allFsas));
