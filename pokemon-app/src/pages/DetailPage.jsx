import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        let data = await res.json();
        setPokemon(data);
      } catch {
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <Loader />;
  if (!pokemon) return <div>Error loading Pokemon.</div>;

  return (
    <div style={{ padding: 20,  textAlign:"center", border:"2px solid", width:"fit-content", marginLeft:"30vw"}}>
      <button onClick={() => navigate("/")}>Back to Dashboard</button>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p><strong>Height:</strong> {pokemon.height}</p>
      <p><strong>Weight:</strong> {pokemon.weight}</p>
      <p><strong>Moves:</strong> {pokemon.moves.slice(0,5).map(m => m.move.name).join(", ")}</p>
      <p><strong>Abilities:</strong> {pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
    </div>
  );
}
