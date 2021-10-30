import './App.css';
import { useState } from 'react';

// const movies = [
//   {
//     name: 'Avengers: Endgame',
//     rating: 9.0,
//     image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQA_-tL18_rj9zEcjN6n41NEaJm-kRNF9UeOtvksZ4z_OW6jRA9',
//     summary: 'Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe'
//   }
// ]

const movies = [
  {
    name: "Interstellar",
    image:
      "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    summary: `Earth's future has been riddled by disasters, famines, and droughts. There is only one way to ensure mankind's survival: Interstellar travel. A newly discovered wormhole in the far reaches of our solar system allows a team of astronauts to go where no man has gone before, a planet that may have the right environment to sustain human life`,
    rating: "8.6"
  },
  {
    name: "Geetha Govindham",
    image:
      "https://m.media-amazon.com/images/M/MV5BOTE1ZDA3NDEtMDZlNS00MjlkLWFmNzAtYzVmYWJmMzEwMDVlXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg",
    summary: `Vijay Govind, a young college lecturer who dreams of marriage falls for Geetha, a level-headed woman who's wary of strangers and isn't easy to convince. While things seem to go smoothly, Vijay makes a terrible mistake which not only derails any hope for his love story, but also potential repercussions with his family`,
    rating: "7.7"
  },
  {
    name: "Avenger",
    image:
      "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
    summary: `Earth's future has been riddled by disasters, famines, and droughts. There is only one way to ensure mankind's survival: Interstellar travel. A newly discovered wormhole in the far reaches of our solar system allows a team of astronauts to go where no man has gone before, a planet that may have the right environment to sustain human life`,
    rating: "8.4"
  },
  {
    name: "Titanic",
    image:
      "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
    summary: `84 years later, a 100 year-old woman named Rose DeWitt Bukater tells the story to her granddaughter Lizzy Calvert, Brock Lovett, Lewis Bodine, Bobby Buell and Anatoly Mikailavich on the Keldysh about her life set in April 10th 1912, on a ship called Titanic when young Rose boards the departing ship with the upper-class passengers and her mother, Ruth DeWitt Bukater, and her fiancé, Caledon Hockley. Meanwhile, a drifter and artist named Jack Dawson and his best friend Fabrizio De Rossi win third-class tickets to the ship in a game. And she explains the whole story from departure until the death of Titanic on its first and last voyage April 15th, 1912 at 2:20 in the morning`,
    rating: "7.8"
  },
  {
    name: "Matrix",
    image:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    summary: `Thomas A. Anderson is a man living two lives. By day he is an average computer programmer and by night a hacker known as Neo. Neo has always questioned his reality, but the truth is far beyond his imagination. Neo finds himself targeted by the police when he is contacted by Morpheus, a legendary computer hacker branded a terrorist by the government. As a rebel against the machines, Neo must confront the agents: super-powerful computer programs devoted to stopping Neo and the entire human rebellion`,
    rating: "8.7"
  }
];
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div className="movie-list">
        {movies.map((item, index) => {
          return <Movie key={item?.name+index} index {...item} />
        })}
      </div>
      

    </div>
  );
}

const LikeButton = () => {
  const [like, setLike] = useState(0)
  const [dislike, setDislike] = useState(0)
  return <div className="counter-container">
    <button onClick={() => setLike(like + 1)}>👍 Like {like}</button>
    <button onClick={() => setDislike(dislike + 1)}>👎 Dislike {dislike}</button>
  </div>
}

const Movie = (props) => {
  const { name, image, rating, summary } = props
  return <div className="movie-container">
    <img className="movie-poster" src={image} alt="img" />
    <div className="movie-specs">
      <h3 className="movie-name">
        {name}
      </h3>
      <p className="movie-rating">
        ⭐️ {rating}
      </p>
    </div>
    <p className="movie-summary">
      {summary}
    </p>
    <div style={{ display: 'flex' }}>
        <LikeButton />
      </div>
  </div>
}

export default App;
