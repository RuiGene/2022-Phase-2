import axios from "axios";
import { Pokemon } from "pokenode-ts";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./App.css";
import { Box, Button, Grid, Paper, Skeleton } from "@mui/material";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonInfo, setPokemonInfo] = useState<any>(
    undefined
  );
  const CRYPTO_BASE_API_URL = "https://api.coincap.io/v2/assets";
  return (
    <div>
      <div className="search-field">
        <h1>Cryptocurrency Coin Search</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextField
            id="search-bar"
            className="text"
            value={pokemonName}
            onChange={(prop) => {
              setPokemonName(prop.target.value);
            }}
            label="Enter a Pokémon Name..."
            variant="outlined"
            placeholder="Search..."
            size="medium"
          />
          <Button
            onClick={() => {
              search();
            }}
          >
            <SearchIcon style={{ fill: "blue" }} />
            Search
          </Button>
        </div>
      </div>

      {pokemonInfo === undefined ? (
        <div></div>
      ) : (
        <div
          id="pokemon-result"
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "100px 10px 0px 10px",
          }}
        >
          <Paper>
            <Grid
              container
              direction="row"
              spacing={5}
              sx={{
                justifyContent: "center",
              }}
            >
              <Grid item>
                <Box>
                  {pokemonInfo === undefined || pokemonInfo === null ? (
                    <h1> Pokemon not found</h1>
                  ) : (
                    <div>
                      <p>
                        <br />
                        Height: {pokemonInfo.data[0].rank}
                        <br />
                        Weight: {pokemonInfo.data[0].supply}
                        <br />
                      </p>
                    </div>
                  )}
                </Box>
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
          </Paper>
        </div>
      )}
    </div>
  );

  function search() {
    axios
      .get(CRYPTO_BASE_API_URL + '?search=' + pokemonName)
      .then((res) => {
        console.log(res.data);
        setPokemonInfo(res.data);
      })
      .catch(() => {
        return
      });
  }
}

export default App;