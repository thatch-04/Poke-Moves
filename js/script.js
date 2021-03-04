//initializing global variables to catch data and store DOM elements
let pokeData, userInput, moveData;

const $targetPokemon = $('#pokemon');
const $idNumber = $('#id-number');
const $moves = $('moves');
const $input = $('input[type="text"]');

//event listener for the submit button
$('form').on('submit', handleData);

//event function for making API call
function handleData(event) {
    event.preventDefault();

    userInput = $input.val();
    console.log(userInput);

    $.ajax({
        url:`https://pokeapi.co/api/v2/pokemon/${userInput.toLowerCase()}`
    }).then(
        (data) => {
            pokeData = data;
            render();
        },
        (error) => {
            console.log('bad request', error)
        }
    );
}
//render function to manipulate DOM elements with the data from the API call
function render() {
    $targetPokemon.text(userInput);
    $idNumber.text(pokeData.id);
    console.log(pokeData.moves[0].move.url);

    //loop to grab all pokemon's moves with API calls to end respective move
        for (let i=0; i < pokeData.moves.length; i++) {
        $.ajax({
            url: pokeData.moves[i].move.url
        }).then(
            (data) => {
                moveData = data;
                console.log(moveData.effect_entries);
                let $p = $('<p>').text(`${moveData.effect_entries[0].effect}`);
                let $name = $('<p>').text(`${pokeData.moves[i].move.name}`)
                $('body').append($name);
                $('body').append($p);
            },
            (error) => {
                console.log('bad request', error)
            }
        );

    }

}