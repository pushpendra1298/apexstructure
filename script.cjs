const fs = require('fs');
const file = fs.readFileSync('src/data/projects.js', 'utf8');

const newFile = file.replace(/image:\s*img\.([a-zA-Z]+),/g, (match, imgKey, offset, str) => {
  let nameMatch = str.substring(offset - 300, offset).match(/name:\s*'([^']+)'/);
  if (!nameMatch) nameMatch = str.substring(offset - 300, offset).match(/name:\s*"([^"]+)"/);
  const name = nameMatch ? nameMatch[1] : 'Project';
  
  // Use placehold.co to generate a generic image with the project name.
  // We can also use unsplash source (though deprecated, it sometimes redirects) or ui-avatars.
  return `image: \`https://placehold.co/800x600/e2e8f0/1e293b?text=\${encodeURIComponent(name)}\`,`;
});

fs.writeFileSync('src/data/projects.js', newFile);
console.log('Successfully updated the projects array with unique images based on their names!');
