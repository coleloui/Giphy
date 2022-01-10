let search = document.getElementById('animal');
let searchBtn = document.getElementById('search-btn');
let gifContainer = document.getElementById('gif-container');
let prevSearch = document.getElementById('prev-search');
let clearSearch = document.getElementById('clear-btn');
let container = [];
let giphyURL = 'https://api.giphy.com/v1/gifs/search?api_key=IlkXGKDr00K2Yom7Z85GQF7cMhUgT351&q='

function thing(event) {
    event.preventDefault();
    let toSearch = search.value;

    searchGifs(toSearch)
}

function searchGifs(animal) {
    console.log(animal);
    gifContainer.innerHTML = ''
    fetch(giphyURL+animal).then(
        function(res){
            return res.json()
        }
    ).then(function(data) {
        data.data.forEach(function(gif) {
            console.log(gif);
            let gifEl = document.createElement('img')
            gifEl.setAttribute('src', gif.images.fixed_height.url)
            gifContainer.append(gifEl)
        });
    })
    search.value = ''
    if(!container.includes(animal)){
        container.push(animal)
        localStorage.setItem('Animal', JSON.stringify(container))
        storage()
    }
}

function storage() {
    prevSearch.textContent = '';
    container = JSON.parse(localStorage.getItem('Animal')) || []
    console.log(container)
    container.map( item => {
        let li = document.createElement('button')
        li.setAttribute('class', 'btn btn-outline btn-danger text-light m-3 previous')
        li.textContent = item
        prevSearch.append(li)
    })
}

searchBtn.addEventListener('click', thing);
prevSearch.addEventListener('click', function(event) {
if(event.target.matches('.previous')){
    searchGifs(event.target.textContent)
}
})

clearSearch.addEventListener('click', function() {
    localStorage.clear()
    prevSearch.textContent = '';
    storage()
})
storage();