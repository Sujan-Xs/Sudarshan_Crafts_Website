import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, 'public', 'images');
const galleryDataPath = path.join(__dirname, 'src', 'gallery_data.js');

fs.readdir(directoryPath, async (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  } 

  const jpegFiles = files.filter(file => file.endsWith('.jpeg') || file.endsWith('.jpg'));
  let convertedCount = 0;
  
  const newItems = [];

  if (jpegFiles.length === 0) {
    console.log('No .jpeg files found to convert.');
    return;
  }

  for (const file of jpegFiles) {
    const inputPath = path.join(directoryPath, file);
    convertedCount++;
    const outputFileName = `gallery_custom_${convertedCount}.avif`;
    const outputPath = path.join(directoryPath, outputFileName);

    try {
      await sharp(inputPath)
        .avif({ quality: 80 })
        .toFile(outputPath);
        
      console.log(`Converted ${file} to ${outputFileName}`);
      
      newItems.push({
        id: `bulk-${convertedCount}`,
        statueName: `Masterpiece Collection ${convertedCount}`,
        description: `A stunning addition to the Sudarshan Crafts Museum gallery. (Description to be updated)`,
        location: "Sudarshan Gallery",
        material: "Mixed Media",
        category: "Stone Sculpture", // Default fallback
        heightClass: convertedCount % 2 === 0 ? "h-[380px]" : "h-[460px]",
        placeholderClass: "stone-placeholder-marble",
        image: `/images/${outputFileName}`
      });
      
      // Delete the original
      fs.unlinkSync(inputPath);
    } catch (err) {
      console.error(`Error converting ${file}:`, err);
    }
  }
  
  const jsContent = `export const bulkGalleryItems = ${JSON.stringify(newItems, null, 2)};\n`;
  fs.writeFileSync(galleryDataPath, jsContent);
  console.log(`Successfully created gallery data at ${galleryDataPath} with ${newItems.length} items!`);
});
