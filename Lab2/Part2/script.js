//given Api in the problem
const apiUrl = 'http://jsonplaceholder.typicode.com';

// Part1: List all post titles having more than six words

fetch(`${apiUrl}/posts`)
    .then((response) => response.json())
    .then((posts) => {
        const longPostTitles = posts
            .filter((post) => post.title.split(' ').length > 6)
            .map((post) => post.title);

        console.log('Post titles with more than six words:');
        console.log(longPostTitles);
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });

// Part2: Show a word frequency map for all body contents of the posts

fetch(`${apiUrl}/posts`)
    .then((response) => response.json())
    .then((posts) => {
        const bodyText = posts.map((post) => post.body);
        const words = bodyText
            .flatMap((text) => text.split(/\s+/))
            .map((word) => word.toLowerCase())
            .filter((word) => word.match(/[a-z]+/));

        const wordFrequencyMap = words.reduce((freqMap, word) => {
            freqMap[word] = (freqMap[word] || 0) + 1;
            return freqMap;
        }, {});

        console.log('Word frequency map for post body contents:');
        console.log(wordFrequencyMap);
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });