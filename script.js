const sunIcon = document.querySelector('#sun');
const moonIcon = document.querySelector('#moon');
const body = document.querySelector('body');
let page = 1;

sunIcon.addEventListener('click', () => {
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
    body.classList.remove('dark');
});

moonIcon.addEventListener('click', () => {
    moonIcon.classList.add('hidden');
    sunIcon.classList.remove('hidden');
    body.classList.add('dark');
});


window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    loader.classList.add("loader-hidden");

    loader.addEventListener("transitioned", () => {
        document.body.removeChild("loader");
    })
})


const fetchContent = async (event, pageno) => {
    event.preventDefault();
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjFlNGUwOGE5YjIxY2FhY2ZiY2IyOTQ2ODNhOTdmZCIsInN1YiI6IjY2MjkwMjFmMzc4MDYyMDE3ZWRhOTQ0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pfhDKcTgvrtTuQz6IvW2URFrXM0J_2Jow5UwCKbLmqg'
        }
    };

    let response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${pageno}`, options)
    let resJson = await response.json()
    console.log(resJson)

    let moviecontainer1 = document.getElementById("moviecontainer1");
    let moviecontainer1desc = document.getElementById("moviecontainer1desc");

    let pagenospan = document.getElementById("pageno");
    pagenospan.innerHTML = `Showing page ${pageno} of ${resJson.total_pages}`;

    for (let index = 0; index < Object.keys(resJson.results).length; index++) {
        moviecontainer1.innerHTML += `<div class="group relative overflow-hidden basis-1/3 md:basis-1/4 lg:basis-1/3">
                        <!--Image-->
                        <img src="http://image.tmdb.org/t/p/w500/${resJson.results[index].poster_path}"
                            class="group-hover:scale-110 group-hover:opacity-50 duration-500">
                        <!--Image Detail Container-->
                        <div class="absolute px-6 bottom-8">
                            <h3 class="dark:text-gega-grey group-hover:text-gega-melon group-hover:mb-2 duration-500">
                                ${resJson.results[index].original_title}</h3>
                            <p
                                class="text-xs opacity-0 group-hover:opacity-100 group-hover:mb-10 duration-500 dark:text-gega-grey">
                                ${resJson.results[index].overview.slice(0, 150)}...</p>
                            <!--Icons Container-->
                            <div
                                class="absolute flex space-x-8 text-gega-grey opacity-0 -bottom-2 group-hover:bottom-2 group-hover:opacity-100 duration-500">
                                <a class="hover:text-gega-red" href="#"><i class="fa-solid fa-play"></i></a>
                                <a class="hover:text-gega-red" href="#"><i class="fa-solid fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>`

        moviecontainer1desc.innerHTML += `<div class="flex items-center group basis-3/4 md:basis-1/2">
                        <!--News Image Container-->
                        <div class="basis-1/3 h-full">
                            <img src="http://image.tmdb.org/t/p/w500/${resJson.results[index].backdrop_path}" class="h-full w-full object-cover" alt="">
                        </div>
                        <!--Item Dteail-->
                        <div
                            class="pl-8 basis-2/3 dark:text-gega-grey text-gega-red group-hover:text-gega-melon group-hover:cursor-pointer duration-500">
                            <p class="text-sm">${resJson.results[index].overview.slice(0, 150)}...</p>
                            <p class="text-xs tracking-tighter mt-2 font-bold font-gemunu">ON NOW 01 2022</p>
                        </div>
                    </div>`
    }
}
document.addEventListener("DOMContentLoaded", async (event) => {fetchContent(event, page)});


document.getElementById("backmovies").addEventListener("click", async (event) => {
    console.log("backclicked")
    if (page > 1) {
        page -= 1;
        let moviecontainer1 = document.getElementById("moviecontainer1");
        let moviecontainer1desc = document.getElementById("moviecontainer1desc");

        moviecontainer1.innerHTML = "";
        moviecontainer1desc.innerHTML = "";
        fetchContent(event, page);
    }

    
});

document.getElementById("nextmovies").addEventListener("click", async (event) => {
    page += 1;
    let moviecontainer1 = document.getElementById("moviecontainer1");
    let moviecontainer1desc = document.getElementById("moviecontainer1desc");

    moviecontainer1.innerHTML = "";
    moviecontainer1desc.innerHTML = "";
    fetchContent(event, page);
})
