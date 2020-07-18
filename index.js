const readline = require('readline-sync');

function start() {
    const content = {};

    content.searchTerm = askAndReturnSearchTerm();
    content.prefix = askAndReturnPrefix();

    function askAndReturnSearchTerm() {

        return readline.question('Type the term for the wikipedia search: ');

    }

    function askAndReturnPrefix() {

        const prefixes = ['who is', 'what is', 'history of'];
        const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choose one option: ');
        const selectedPrefixText = prefixes[selectedPrefixIndex];

        console.log(selectedPrefixIndex);

        return selectedPrefixText;

    }

    console.log(content);

}

start();