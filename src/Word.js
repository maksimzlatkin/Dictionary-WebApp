//IGNORE THIS FILE

const word = class Word{
    constructor(word, data){
        this.word = word;
        //this.meanings = meanings
        //this.setDataFromJSON(data);

        const obj = JSON.parse(data);
        console.log(obj);
    }

    setDataFromJSON(data){
        const obj = JSON.parse(data);
        console.log(obj);
    }
}

export default word;