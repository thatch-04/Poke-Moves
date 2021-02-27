let pokeData, userInput, moveData;

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
    console.log(pokeData.moves[0].move.url);
    /*pokeData.moves.forEach(move => {
        console.log(move.url);
        $.ajax({
            url: `${move.url}`
        }).then(
            (data2) => {
                moveData = data2;
                console.log(moveData.effect_entries);
                let $p = $('<p>').innertext(`${moveData.effect_entries[0].effect}`);
                $('body').append($p);
            },
            (error) => {
                console.log('bad request', error)
            }
        );
    });*/

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