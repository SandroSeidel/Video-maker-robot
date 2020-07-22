const readline = require('readline-sync');//input data lib
const robots = {
    text: require('./robots/text.js')
};

async function start() {
   
    const content = {};

    content.searchTerm = askAndReturnSearchTerm();
    content.prefix = askAndReturnPrefix();

    await robots.text(content);//wait for text robot finish his job

    function askAndReturnSearchTerm() {

        return readline.question('Type the term for the wikipedia search: ');
    
    };

    function askAndReturnPrefix() {

        const prefixes = ['who is', 'what is', 'history of'];
        const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choose one option: ');
        const selectedPrefixText = prefixes[selectedPrefixIndex];
    
        return selectedPrefixText;
    
    };

    console.log(content);

};

start();
