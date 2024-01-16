$searchForm = $("#search-form");
$searchInput = $("#search-input");
$gifContainer = $("#gif-container");
$removeButton = $('#remove-button');

$searchForm.on('submit', function(event) {
    event.preventDefault();
    const text = $searchInput.val();
    console.log(text);
    $searchInput.val("");
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${text}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`).then(res => {
        const firstResult = res.data.data[0];
        $gifContainer.append(`<img class="gif-img" src="${firstResult.images.original.url}" />`)
    });
})

$removeButton.on('click', function(event) {
    $gifContainer.html('');
});