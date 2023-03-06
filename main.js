const letters = document.querySelectorAll(".box");

let boxNumber=0;
let numberOfChances=5;
let secretWord="";
let arrayOfSecretWord;
async function fetchWord()
{
    const result=await fetch("https://words.dev-apis.com/word-of-the-day");
    let {word:inp} =await result.json();
    secretWord=inp.toUpperCase();
    arrayOfSecretWord=secretWord.split("");
}

fetchWord();

document.addEventListener("keydown",function handleKeyPress(event){
    const pressed=event.key;
    
    if(pressed==="Enter") ent();
    else if(pressed==="Backspace")backspace();
    else if(isLetter(pressed)){
        addLetter(pressed.toUpperCase());
    }
});

currentWord="";
let addLetter=value =>{


    if(currentWord.length<5)        
    {
    letters[boxNumber].innerText=value;
        currentWord +=value;

    boxNumber++;

    }else {
        
        letters[boxNumber-1].innerText=value;
        currentWord=currentWord.substring(0,currentWord.length-1);
        currentWord +=value;

    }
}


let isLetter=value =>
{
    return /^[a-zA-Z]$/.test(value);
}


let ent=value =>
{
    if(currentWord==secretWord)
    {
        alert("you win");
        
    }else if(currentWord.length==5) {   
            if(numberOfChances==0) alert("you lose");
            numberOfChances--;
            let loop=boxNumber-5;
            let currentWordArray=currentWord.split("");
            for(loop;loop<boxNumber;loop++)
            {
                if(arrayOfSecretWord[loop%5]==currentWordArray[loop%5])
                {
                    letters[loop].style.backgroundColor="green";
                }else 
            letters[loop].style.backgroundColor="grey";
            }
            currentWord="";

    }
}
let backspace=value =>
    {
    if(currentWord.length<1)
    {
        return;
    }else 
    {
        currentWord=currentWord.substring(0,currentWord.length-1);
        letters[boxNumber-1].innerText="";
        if(boxNumber!==0)boxNumber--;
    }
    }

