const algorithmia = require('algorithmia');
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey;//My api from the Algorithmia 
const sentenceBoundaryDetection = require('sbd');//Used to break content in to sentences 

async function robot(content) {
    
    await fetchContentFromWikipedia(content);//wait for content to be cached in the wikipedia
    sanitizeContent(content);
    breakContentIntoSentences(content);

    async function fetchContentFromWikipedia(content) {

        const algorithmiaAutenticated = algorithmia(algorithmiaApiKey);
        const wikipediaAlgorithm = algorithmiaAutenticated.algo('web/WikipediaParser/0.1.2');
        const wikipediaResponde = await wikipediaAlgorithm.pipe(content.searchTerm);
        const wikipediaContent = wikipediaResponde.get();
        
        content.sourceContentOriginal = wikipediaContent.content;

    };//Search the content in the wikipedia 

    function sanitizeContent(content) {

        const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(content.sourceContentOriginal);
        const withoutDatesInParenthes = removeDatesInParenthes(withoutBlankLinesAndMarkdown); 

        content.sourceContentSanitized = withoutDatesInParenthes;

        function removeBlankLinesAndMarkdown(text) {
            
            const allLines = text.split('\n');
            
            const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
                if (line.trim().length === 0 || line.trim().startsWith('=') ){
                    return false;
                }
                return true;
            }); 
            return withoutBlankLinesAndMarkdown.join(' '); 
        };//remove the trash from the text

        function removeDatesInParenthes(text) {

            return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ');

        };//remove dates and odd spaces 
    };

    function breakContentIntoSentences(content) {

        content.sentences = [];

        const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized);//uses the 'sbd' lib to break the content in to sentences
        sentences.forEach((sentence) => {

            content.sentences.push({
                text: sentence,
                keywords: [],
                images: []
            });
        });
    };
};

module.exports = robot;