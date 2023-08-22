const express = require('express');
const request = require('request');

const app = express();

const fetchNumbers = (url) => {
  return new Promise((resolve, reject) => {
    request(url, {timeout: 2000}, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const data = JSON.parse(body);
        resolve(data.numbers || []);
      } else {
        resolve([]);
      }
    });
  });
}

const mergeSort = (numbersLists) => {
  let mergedNumbers = [];
  for (let numbers of numbersLists) {
    mergedNumbers.push(...numbers); 
  }
  return Array.from(new Set(mergedNumbers)).sort((a, b) => a - b);
}


app.get('/numbers', async (req, res) => {
  const urls = req.query.url;
  
  const startTime = Date.now();

  const numbersListsPromises = urls.map(url => fetchNumbers(url));

  let numbersLists;

  try {
    numbersLists = await Promise.all(numbersListsPromises);
  } catch(error) {
    return res.status(500).json({message: 'Error fetching numbers'});
  }

  const mergedNumbers = mergeSort(numbersLists);  

  const endTime = Date.now();
  const duration = endTime - startTime;

  if (duration > 500) {
    return res.status(500).json({message: 'Timeout merging numbers'}); 
  }

  res.json({numbers: mergedNumbers});
});

app.listen(3000, () => {
  console.log('Server listening on port 3000'); 
});