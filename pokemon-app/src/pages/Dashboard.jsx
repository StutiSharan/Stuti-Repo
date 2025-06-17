import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonList } from "../features/pokemon/pokemonSlice";
import Loader from "../components/Loader";
import ErrorBanner from "../components/ErrorBanner";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { pokemons, loading, error } = useSelector(state => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemonList());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <ErrorBanner message={error} />
  if (!pokemons.length) return <div>No Pokemon found.</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Pokemon Dashboard</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 20 }}>
        {pokemons.map(poke => (
          <Link key={poke.id} to={`/details/${poke.id}`} style={{
            border: "2px solid #ccc",
            padding: 10,
            backgroundColor: poke.base_experience > 100 ? "#e0ffe0" : "#fff",
            borderColor: poke.types.some(t => t.type.name === "fire") ? "red" :
                         poke.types.some(t => t.type.name === "water") ? "blue" : "#ccc",
            color: "black",
            textDecoration: "none"
          }}>
            <img src={poke.sprites.front_default} alt={poke.name} width="80" />
            <div><strong>{poke.name} {poke.base_experience > 100 && "⚡"}</strong></div>
            <div>XP: {poke.base_experience}</div>
            <div>Weight: {poke.weight}</div>
            <div>Types: {poke.types.map(t => t.type.name).join(", ")}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
