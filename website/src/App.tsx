import axios from "axios";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./App.css";
import { Box, Button, Grid, Paper } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

function App() {
  const [cryptoName, setcryptoName] = useState("");
  const [cryptoInfo, setcryptoInfo] = useState<any>(
    undefined
  );
  const CRYPTO_BASE_API_URL = "https://api.coincap.io/v2/assets";
  return (
    <div>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <CurrencyBitcoinIcon sx={{ marginRight: '10px' }}>
              </CurrencyBitcoinIcon>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Cryptocurrency Coin Search
              </Typography>
              <a href='https://github.com/RuiGene/2022-Phase-2/tree/main/website' target='_blank'>
                <Button color="inherit">
                  Code
                </Button>
              </a>
            </Toolbar>
          </AppBar>
        </Box>
      </div>

      <div className="search-field">
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
          id="crypto-result"
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "100px 10px 0px 10px",
          }}
        >
          <Paper
            sx={{ border: "2px solid black" }}>
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
                  {cryptoInfo === undefined || cryptoInfo.data || cryptoInfo === null ? (
                    <h1> Coin not found</h1>
                  ) : (
                    <div>
                      <p>
                        NAME: {cryptoInfo.data[0].id}
                        <br />
                        RANK: {cryptoInfo.data[0].rank}
                        <br />
                        SUPPLY: {parseInt(cryptoInfo.data[0].supply)} coins
                        <br />
                        PRICE: ${parseFloat(cryptoInfo.data[0].priceUsd).toFixed(6)} USD
                        <br />
                        CHANGE IN LAST 24HR: {parseFloat(cryptoInfo.data[0].changePercent24Hr).toFixed(8)}%
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