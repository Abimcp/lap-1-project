const apiKey = 'dc6zaTOxFJmzC';
let results = document.querySelector('.giphy-search__results');

document.addEventListener('DOMContentLoaded', fetchGiphy);
function fetchGiphy() {
    results.innerHTML = '';
    let str = document.querySelector('#gif-search-bar').value.trim();
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=1&q=${str}`;
    fetch(url)
        .then(resp => resp.json())
        .then(json => {
            let img = document.createElement('img');
            img.src = json.data[0].images.fixed_height_downsampled.url;
            results.appendChild(img);
            document.querySelector('#gif-search-bar').value = '';
        })
        .catch(err => {
            console.error(err);
        });
}

module.exports = { fetchGiphy };
