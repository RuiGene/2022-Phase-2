import axios from "axios";
import { Pokemon } from "pokenode-ts";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./App.css";
import { Box, Button, Grid, Paper, Skeleton } from "@mui/material";

function App() {
  const [cryptoName, setcryptoName] = useState("");
  const [cryptoInfo, setcryptoInfo] = useState<any>(
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
            value={cryptoName}
            onChange={(prop) => {
              setcryptoName(prop.target.value);
            }}
            label="Enter a crypto coin ticker..."
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

      {cryptoInfo === undefined ? (
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
                  {cryptoInfo === undefined || cryptoInfo === null ? (
                    <h1> Pokemon not found</h1>
                  ) : (
                    <div>
                      <p>
                        <br />
                        NAME: {cryptoInfo.data[0].id}
                        <br />
                        RANK: {cryptoInfo.data[0].rank}
                        <br />
                        SUPPLY: parseInt({cryptoInfo.data[0].supply})
                        <br />
                        PRICE: {cryptoInfo.data[0].priceUsd} USD
                        <br />
                        CHANGE IN LAST 24HR: {cryptoInfo.data[0].changePercent24Hr}%
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
      .get(CRYPTO_BASE_API_URL + '?search=' + cryptoName)
      .then((res) => {
        console.log(res.data);
        setcryptoInfo(res.data);
      })
      .catch(() => {
        return
      });
  }
}

export default App;