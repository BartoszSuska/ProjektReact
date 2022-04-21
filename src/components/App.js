import React from 'react';
import * as Mui from '@material-ui/core';
import {MdCatchingPokemon} from 'react-icons/md';
import axios from 'axios';
import "./App.css";

const App = () => {
    const [img, setImg] = React.useState();
    const [name, setName] = React.useState();
    const [guess, setGuess] = React.useState();
    const [color, setColor] = React.useState();
    const [answer, setAnswer] = React.useState("");
    const [visible, setVisible] = React.useState(false);
    const [score, setScore] = React.useState(0);

    React.useEffect(() => {
        getPokemon();
    }, []);

    const getPokemon = () => {
        const max = 151;
        const rand = Math.floor(Math.random() * max) + 1;
        axios.get(`https://pokeapi.co/api/v2/pokemon/${rand}`)
            .then((response) => {
                const pokemon = response.data;
                setImg(pokemon.sprites.front_default);
                setName(pokemon.name);
                setGuess("");
                setColor("black");
                setAnswer("Who's that Pokémon?");
                setVisible(false);
                console.log(pokemon.name);
            });
    }

    const tryGuess = () => {

        if(guess === name){
            setAnswer(`Correct! It is ${name}`);
            setScore(score +1);
        }
        else{
            setAnswer(`Wrong! It is ${name}`);
            setScore(0);
        }

        setColor("white");
        setVisible(true);
    }

    return (
        <div className="main">
            <div className="answer"><h1>{answer}</h1></div>
            <div className={`image ${color}`}><img className="size" src={img} alt="1"></img></div>
            <div className="score"><p>Score: {score}</p></div>
            <div className="textField"><Mui.TextField id="outlined-basic" label="Pokemon" variant="outlined" disabled={visible} value={guess} onChange={e => setGuess(e.target.value)}/>
            <Mui.IconButton  onClick={tryGuess}  disabled={visible}>
                <MdCatchingPokemon />
            </Mui.IconButton></div>
            <div className="next">{visible && <button onClick={getPokemon}>Next</button>}</div>

        </div>
    );
}

export default App;