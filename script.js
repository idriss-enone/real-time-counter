const textInput = document.getElementById("text-input");


function getPostStats(text, wordsPerMinute=255){
    // 1. Calcul des caractères
    const charCount = text.length;
    // 2. Calcul des mots 
    //La regex /\s+/ détecte un ou plusieurs espaces,tabulation ou retours à la ligne.
    //Cela évite de compter les espaces doubles ou les sauts de page comme des mots.
    const words = text.trim() === '' ? [] : text.trim().split(/\s+/);
    const wordCount = words.length;
    console.log(wordCount);
    // Calcul du temps de lecture
    //INFO : Un adulte lit en moyenne entre 200 et 255 mots par minute.
    // Math.ceil() arrondit à l'entier supérieur pour ne jamais afficher "0 min" dès qu'un mot est écrit.
    const minutes = wordCount > 0 ? Math.ceil(wordCount / wordsPerMinute): 0;


    return {charCount,wordCount,minutes}
}

    
function updateReadingStats(containerSelector,text, wordsPerMinute=255){
    const container = document.querySelector(containerSelector);
    const {charCount,wordCount,minutes} = getPostStats(text,wordsPerMinute);

    container.innerHTML = `
        <p>Caractères: <span id="char-count">${charCount}</span></p>
        <p>Mots: <span id="word-count">${wordCount}</span></p>
        ${wordCount > 0 ? `<p>Temps de lecture: <span id="read-time">${minutes} min</span></p>` : '' } 
    `

}


textInput.addEventListener("input",() =>{
    const text = textInput.value;
    updateReadingStats(".stats",text);
})

document.addEventListener("DOMContentLoaded",() =>{
    updateReadingStats(".stats","");
})