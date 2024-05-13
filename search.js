const search = async (event) => {
    console.log(event.target.value);
    let searchedresults = document.querySelector('#searchedresults');
    if (event.target.value === "") {
        searchedresults.innerHTML = `<h1 class="text-4xl text-center text-gray-100 p-10">Search to Find Movies</h1>`
    } else {
        searchedresults.innerHTML = '';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjFlNGUwOGE5YjIxY2FhY2ZiY2IyOTQ2ODNhOTdmZCIsInN1YiI6IjY2MjkwMjFmMzc4MDYyMDE3ZWRhOTQ0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pfhDKcTgvrtTuQz6IvW2URFrXM0J_2Jow5UwCKbLmqg'
            }
        };

        let response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${event.target.value}&include_adult=false&page=1`, options)
        response = await response.json();
        console.log(response);
        
        if (response.results.length > 0) {
            for (let index = 0; index < response.results.length; index++) {
                const element = response.results[index];
                searchedresults.innerHTML += `<section class="h-full lg:h-full group relative sm:w-96 md:w-1/2 lg:w-1/3 mx-auto p-4">
            <!--Hero Image-->
            <img src="http://image.tmdb.org/t/p/w500/${response.results[index].poster_path}" alt="Main Image" class="h-full w-full object-cover">

            <!--Hero Content-->
            <div class="absolute bottom-0 w-full bg-gradient-to-b from-transparent to-black">
                <!--Hero Content Container-->
                <div class="container pl-10 lg:pl-0">
                    <h3 class="text-gega-melon tracking-wider group-hover:mb-1 duration-500">
                        Action, Adventure, Fantasy
                    </h3>
                    <h1 class="text-4xl lg:text-6xl text-gega-grey group-hover:mb-1 duration-500">
                        ${response.results[index].title}
                    </h1>
                    <p class="text-gega-grey group-hover:mb-2 duration-500 text-sm lg:text-base w-3/4 lg:w-2/3">
                        ${response.results[index].overview.slice(0, 200)}...
                    </p>
                    <!--Container Detail-->
                    <div
                        class="flex space-x-8 opacity-0 group-hover:opacity-100 group-hover:mb-10 lg:group-hover:mb-20 duration-1000">
                        <!--Container/Watch-->
                        <div class="flex space-x-2 items-center cursor-pointer">
                            <a href="#" class="text-gega-grey uppercase lg:text-lg hover:text-gega-red duration-500">
                                Watch
                                Trailer</a>
                            <!--Watch Trailer Button-->
                            <div
                                class="flex h-8 w-8 text-center items-center rounded-full justify-center bg-gega-red text-gega-grey">
                                <i class="fas fa-play"></i>
                            </div>
                        </div>
                        <!--Watch End-->

                        <!--Full Synopsis-->

                        <!--Container/Watch-->
                        <div class="flex space-x-2 items-center cursor-pointer">
                            <a href="#" class="text-gega-grey uppercase lg:text-lg hover:text-gega-red duration-500">
                                Full
                                Synopsis</a>
                            <!--Watch Trailer Button-->
                            <div
                                class="flex h-8 w-8 text-center items-center rounded-full justify-center bg-gega-red text-gega-grey">
                                <i class="fas fa-arrow-right"></i>
                            </div>
                        </div>
                        <!--Full Synopsis End-->
                    </div>
                </div>
                <!--Image Content End-->


                <!--Image Points-->
                <div class="flex space-x-3 absolute bottom-5 left-10 opacity-0 group-hover:opacity-100 duration-1000">
                    <div class="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-gega-red"></div>
                    <div class="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-gega-grey"></div>
                    <div class="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-gega-grey"></div>
                    <div class="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-gega-grey"></div>
                </div>
                <!--Points End-->
        </section>`
                
            }
            
        } else {
            searchedresults.innerHTML = `<h1 class="text-4xl text-center text-gray-100 p-10">No such Movie found</h1>`
        }

    }
};
