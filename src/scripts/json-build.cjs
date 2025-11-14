const path = require('path');
const fs = require('fs');
const jsonc = require('jsonc-parser');

const dirSrcAssets = path.join(__dirname, '../assets');
const dirOutAssets = path.join(__dirname, '../../assets');

const everything = {};
fs.readdirSync(dirSrcAssets).forEach(folderName => {
  const dirAsset = path.join(dirSrcAssets, folderName);
  if (!fs.statSync(dirAsset).isDirectory()) { return; }

  const items = [];

  // Read all JSONC files in the folder
  const readFolder = (dirCurrent) => {
    fs.readdirSync(dirCurrent).forEach(file => {
      // Support subfolders recursively.
      if (fs.statSync(path.join(dirCurrent, file)).isDirectory()) {
        readFolder(path.join(dirCurrent, file));
        return;
      }

      // Only jsonc files.
      if (!file.endsWith('.jsonc')) {
        console.warn('Skipping non-jsonc file:', file);
        return;
      }

      // Parse file.
      const filePath = path.join(dirCurrent, file);
      const jsoncContent = fs.readFileSync(filePath, 'utf-8');
      const jsonData = jsonc.parse(jsoncContent);
      
      // Check format.
      if (!Array.isArray(jsonData)) {
        console.error('Expected an array in file:', filePath);
        process.exit(1);
      }
  
      items.push(...jsonData);
    });
  };

  readFolder(dirAsset);  

  // Write data
  const data = { items };
  everything[folderName] = data;
  console.log('Writing', items.length, 'items to', `${folderName}.json`);
  fs.writeFileSync(path.join(dirOutAssets, `${folderName}.json`), JSON.stringify(data));
  fs.writeFileSync(path.join(dirOutAssets, `${folderName}_guids.json`), JSON.stringify(items.map(i => i.guid)));
});

// Write everything.json
fs.writeFileSync(path.join(dirOutAssets, `everything.json`), JSON.stringify(everything));