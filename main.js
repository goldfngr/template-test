const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
//const loader = document.getElementById('loader');

// Loading Spinner displaying
/*
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
*/
/*
// Remove Loading Spinner
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }    
}
*/
    // Get Quote fm API
    async function getQuote(){
    //loading();
    const proxyUrl = 'https://jacinto-cors-proxy.herokuapp.com/'
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';                    
    try {
        const response = await fetch(apiUrl);  // const isnt set until this finishs fetching
        const data = await response.json();  // data isn't set until response is finished returning in json format
     //   console.log(data);
     // Check if Author is blank, add 'Uknown
     if (data.quoteAuthor === '') {
         authorText.innerText = 'Unknown';
     } else {
         authorText.innerText = data.quoteAuthor;
     }
     // Reduce font size for long quotes
     if (data.quoteText.length > 120) {
         quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
      quoteText.innerText = data.quoteText;
      // Stop Loader and Display Quote
      complete();
    } catch (error) {
        getQuote();
        console.log('F*ck Me..errors fckn everywhere!', error);
    }
}
// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on Load
 getQuote();