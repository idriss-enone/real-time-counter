const textInput = document.getElementById("text-input");
const charCount = document.getElementById("char-count"); 
const wordCount = document.getElementById("word-count"); 
const readTime = document.getElementById("read-time"); 

textInput.addEventListener("input",() =>{
    const text = textInput.value;

    // 1. Calcul des caractères
    const chars = text.length;
    charCount.textContent = chars ;

    // 2. Calcul des mots 
    //La regex /\s+/ détecte un ou plusieurs espaces,tabulation ou retours à la ligne.
    //Cela évite de compter les espaces doubles ou les sauts de page comme des mots.
    const words = text.trim() === '' ? [] : text.trim().split(/\s+/);
    wordCount.textContent = words.length;
    
    // Calcul du temps de lecture
    //INFO : Un adulte lit en moyenne entre 200 et 255 mots par minute.
    // Math.ceil() arrondit à l'entier supérieur pour ne jamais afficher "0 min" dès qu'un mot est écrit.
    const minutes = Math.ceil(words.length / 255);
    readTime.textContent = `${minutes} min`
})