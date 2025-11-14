const path = require('path');
const fs = require('fs');
const jsonc = require('jsonc-parser');

const dirSrcEventInstances = path.join(__dirname, '../assets/event-instances');
const dirOutEventInstanceSpirits = path.join(__dirname, '../assets/event-instance-spirits');

// Create output directory if it doesn't exist
if (!fs.existsSync(dirOutEventInstanceSpirits)) {
  fs.mkdirSync(dirOutEventInstanceSpirits, { recursive: true });
}

console.log('Extracting spirits from event-instances...');

// Process all JSONC files in the event-instances directory
fs.readdirSync(dirSrcEventInstances).forEach(fileName => {
  if (!fileName.endsWith('.jsonc')) {
    console.warn('Skipping non-jsonc file:', fileName);
    return;
  }

  const inputPath = path.join(dirSrcEventInstances, fileName);
  const outputPath = path.join(dirOutEventInstanceSpirits, fileName);
  
  console.log('Processing:', fileName);
  
  try {
    // Read and parse the JSONC file
    const jsoncContent = fs.readFileSync(inputPath, 'utf-8');
    const eventInstances = jsonc.parse(jsoncContent);
    
    // Validate that we have an array
    if (!Array.isArray(eventInstances)) {
      console.error('Expected an array in file:', fileName);
      return;
    }
    
    // Extract all spirits from all instances
    const allSpirits = [];
    
    eventInstances.forEach(instance => {
      if (instance.spirits && Array.isArray(instance.spirits)) {
        // Add each spirit to the collection
        instance.spirits.forEach(spirit => {
          allSpirits.push(spirit);
        });
      }
    });
    
    // Write the spirits array to the output file
    const spiritsJson = JSON.stringify(allSpirits, null, 2);
    fs.writeFileSync(outputPath, spiritsJson);
    
    console.log(`  → Extracted ${allSpirits.length} spirits to ${fileName}`);
    
  } catch (error) {
    console.error('Error processing file:', fileName, error.message);
  }
});

console.log('Spirit extraction complete!');