let pokeData, userInput;

const $targetPokemon = $('#pokemon');
const $idNumber = $('#id-number');
const $moves = $('moves');
const $input = $('input[type="text"]');

$('form').on('submit', handleData);

function handleData(event) {
    event.preventDefault();

    userInput = $input.val();

    $.ajax({
        url:'https://pokeapi.co/api/v2/pokemon/' + userInput
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

function render() {
    $targetPokemon.text(userInput);
    $idNumber.text(pokeData.id);
    //$moves.text(weatherData.main.feels_like);
}