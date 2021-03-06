var modal = document.getElementById("my_modal");

function load_films(page, category, ul_id) {
    fetch('http://127.0.0.1:8000/api/v1/titles/?page=' + page + '&page_size=4&sort_by=-imdb_score&genre=' + category)
        .then(response => response.json())
        .then(data => {
            const ul = document.getElementById(ul_id);
            ul.innerHTML = '';
            data.results.forEach(function (film) {

                let li = document.createElement('li');
                let image = document.createElement("img");
                image.src = film.image_url;
                li.appendChild(image)
                li.onclick = (event) => {
                    modal.style.display = "block";
                    fetch('http://127.0.0.1:8000/api/v1/titles/' + film.id)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                            document.getElementById("film_info").innerHTML = `
                            <p><img src="${data.image_url}"></p>
                            <h2> Titre : ${data.title}</h2>
                            <p>Genre : ${data.genres}</p>
                            <p>Synopsis : ${data.year}</p>
                            <p> Noté : ${data.rated}</p>
                            <p> Score Imdb : ${data.imdb_score}</p>
                            <p> Directeur : ${data.directors}</p>
                            <p> Acteurs : ${data.actors}</p>
                            <p> Durée : ${data.countries}</p>
                            <p> Box Office : ${data.worldwide_gross_income}</p>
                            <p> Description : ${data.description}</p>
                            `
                        })

                }

                ul.appendChild(li)
            })
        })
}


function load_best_film(page, ul_id) {
    fetch('http://127.0.0.1:8000/api/v1/titles/?page=' + page + '&page_size=1&sort_by=-imdb_score&genre=')
        .then(response => response.json())
        .then(data => {
            const ul = document.getElementById(ul_id);
            fetch('http://127.0.0.1:8000/api/v1/titles/' + data.results[0].id)
                .then(response => response.json())
                .then(data => {
                    ul.innerHTML = `
                        <div>
                        <h2> Titre : ${data.title}</h2>
                        <button id="modal_button">Voir Plus</button>
                        <p> Description : ${data.description}</p>
                        </div>
                        <p><img src="${data.image_url}"></p>
                        
                        `
                    const button = document.getElementById("modal_button")
                    button.onclick = (event) => {
                        modal.style.display = "block";
                        document.getElementById("film_info").innerHTML = `
                        <div>
                        <p><img src="${data.image_url}"></p>
                        <h2> Titre : ${data.title}</h2>
                        <p> Genre : ${data.genres}</p>
                        <p> Synopsis : ${data.year}</p>
                        <p> Noté : ${data.rated}</p>
                        <p> Imdb Score : ${data.imdb_score}</p>
                        <p> Directeur : ${data.directors}</p>
                        <p> Acteurs : ${data.actors}</p>
                        <p> Durée : ${data.countries}</p>
                        <p> Box Office : ${data.worldwide_gross_income}</p>
                        <p> Description : ${data.description}</p>
                        </div>
                        `
                    }
                })

        })
}




load_best_film(1, "best_movie_info")
load_films(1, "", "best_movies")
load_films(1, "comedy", "comedies")
load_films(1, "horror", "horrors")
load_films(1, "romance", "romances")


// Modal
var span = document.getElementsByClassName("close")[0];

span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// Previous and next buttons

//Best movies
let page_best = 1

const previous_best = document.getElementById("previous_best")
previous_best.onclick = (event) => {
    if (page_best > 1) {
        page_best--
        load_films(page_best, "", "best_movies")
    }

}

const next_best = document.getElementById("next_best")
next_best.onclick = (event) => {
    page_best++
    load_films(page_best, "", "best_movies")
}
// comedies section
let page_comedies = 1
const next_comedy = document.getElementById("next_comedies")
next_comedy.onclick = (event) => {
    page_comedies++
    load_films(page_comedies, "comedy", "comedies")
}

const previous_comedies = document.getElementById("previous_comedies")
previous_comedies.onclick = (event) => {
    if (page_comedies > 1) {
        page_comedies--
        load_films(page_comedies, "comedy", "comedies")
    }

}


// Horror section
let page_horror = 1
const next_horror = document.getElementById("next_horror")
next_horror.onclick = (event) => {
    page_horror++
    load_films(page_horror, "horror", "horrors")
}

const previous_horror = document.getElementById("previous_horror")
previous_horror.onclick = (event) => {
    if (page_horror > 1) {
        page_horror--
        load_films(page_horror, "horror", "horrors")
    }
}

// Romance section
let page_romance = 1
const next_romance = document.getElementById("next_romance")
next_romance.onclick = (event) => {
    page_romance++
    load_films(page_romance, "romance", "romances")
}

const previous_romances = document.getElementById("previous_romances")
previous_romances.onclick = (event) => {
    if (page_romance > 1) {
        page_romance--
        load_films(page_romance, "romance", "romances")
    }

}

