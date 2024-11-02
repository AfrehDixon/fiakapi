import fs from 'fs';

const convertImageToBase64 = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const base64Image = data.toString('base64');
        resolve(base64Image);
      }
    });
  });
};

export default convertImageToBase64;