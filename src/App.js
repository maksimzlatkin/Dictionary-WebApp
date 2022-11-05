import React, { useState } from 'react';
import { useEffect } from 'react';
//import Word from './Word';

const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

class Word{
    constructor(word, data){
        this.word = word;
        //console.log(data);

        let meanings = [];

        data = JSON.stringify(data);
        const obj = JSON.parse(data);
        //console.log(obj);
        for (let i = 0; i < obj.length; i++){

            let definitions = JSON.parse(JSON.stringify(obj[i]['meanings']));

            let temp = [];
            temp[0] = definitions[0]['partOfSpeech'] + ":";

            //This will only iterate once most of the time
            for (let j = 0; j < definitions.length; j++){

                let newDefinitions = definitions[j]['definitions'];

                for (let k = 0; k < newDefinitions.length; k++){
                    temp[k + 1] = newDefinitions[k]['definition'];
                }

            }

            meanings[i] = temp;
        }

        //console.log(meanings);
        this.meanings = meanings;
    }
    getMeanings(){
        return this.meanings;
    }
}

const App = () => {

    const [word, setWord] = useState('');
    const [w, setW] = useState([]);
    const [oldWord, setOld] = useState('');
    
    //const [data, setData] = useState('');
    //let w = ['James', 'Paul', 'John', 'George', 'Ringo'];

    const searchWord = async (word) => {
        if (word === oldWord){
            return;
        }
        //console.log(word + ' ' + oldWord + '/ Fetching data...');
        const response = await fetch(API_URL + word);
        const data = await response.json();
        const status = await response.status;

        if (status !== 200){
            setW([[''],['Error: ' + status]]);
        }
        else{
            //console.log(data);
            setW(new Word(word, data).getMeanings());
        }
        setOld(word);
    }

    useEffect(() => {
        searchWord(word);
    })

    return (
        <div className='app'>
            <h1>Dictionary</h1>

            <div className='search'>
                <input
                    type = 'text'
                    required
                    value = {word}
                    onChange = {(e) => setWord(e.target.value)}
                />
            </div>

            <div>
                {w?.map(arr => (
                    //<h1>{arr}</h1>
                    arr?.map(d => (
                        !(d === arr[0]) ?
                        <li>{d}</li> :
                        <h1>{arr[0]}</h1>
                    ))
                ))}
            </div>

        </div>
    );
}

export default App;