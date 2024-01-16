"use strict";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");
const $episodesList = $("#episodesList");


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  return fetch("https://api.tvmaze.com/search/shows?q=" + term).then(
    res => res.json()
  ).then(data => (
    data.map(obj => obj['show'])
  ));
}


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();
  console.log("Populating shows...")
  for (let show of shows) {
    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src="${show.image.original ?? "https://tinyurl.com/tv-missing"}"
              alt="Movie Image"
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `);

    $showsList.append($show);
    const $episodeButtons = $(".Show-getEpisodes");
    $episodeButtons.unbind().on("click", async function() {
      const showID = $(this).parent().parent().parent().attr('data-show-id');
      const episodes = await getEpisodesOfShow(showID);
      console.log(showID);
      console.log(episodes);
      populateEpisodes(episodes);
    })
  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) {
  return fetch(`https://api.tvmaze.com/shows/${id}/episodes`).then(res => (
    res.json()
  )).then(data => (
    data
  ));
}

/** Given list of episodes, create markup for each and DOM */

function populateEpisodes(episodes) {
  $episodesArea.show();
  $episodesList.empty();
  for (let episode of episodes) {
    $episodesList.append(`<li>${episode.name} (season ${episode.season}, number ${episode.number})</li>`);
  }
}
