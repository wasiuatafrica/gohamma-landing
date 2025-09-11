import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

// Create a zip file from the attached_assets folder
const output = fs.createWriteStream('public/attached_assets.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Maximum compression
});

output.on('close', function() {
  console.log('Zip file created successfully!');
  console.log('Total bytes:', archive.pointer());
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

// Add all files from attached_assets folder
archive.directory('attached_assets/', false);

archive.finalize();
