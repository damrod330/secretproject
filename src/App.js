import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

        <div>
          <Grid container spacing={50}>
            <Grid item >
              <Paper>
                <Button variant="fab" color="red"> Test</Button>
                <Button variant="flat" color="green"> Test11</Button>
                <Button variant="outlined" color="blue"> Test2</Button>
                <Button variant="raised" color="primary"> Test4</Button>
              </Paper>
            </Grid>
            <Grid item md>
              <Paper>
              <Button variant="fab" color="red"> Test</Button>
                <Button variant="flat" color="green"> Test11</Button>
                <Button variant="outlined" color="blue"> Test2</Button>
                <Button variant="raised" color="primary"> Test4</Button>
              </Paper>
            </Grid>

          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
