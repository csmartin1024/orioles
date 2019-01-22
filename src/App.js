import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Database from './data/Database';
import PlayerBreakdown from './components/PlayerBreakdown';
import ContourPlot2 from './components/ContourPlot2';

class Layout extends Component {
    constructor(props)
    {
        super(props);
        this.state = 
        {
          height:window.innerHeight, 
          width:window.innerWidth
        };
        this.updateDimensions = this.updateDimensions.bind(this);
    }
    
    componentDidMount()
    {
      window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount()
    {
      window.removeEventListener("resize", this.updateDimensions);
    }
    updateDimensions()
    {
      this.setState({height:window.innerHeight, width:window.innerWidth});
    }

    render() {

      const playerA_ID = '605164'; // this would ideally be able to be passed in from a page param
      const playerB_ID = '502171'; // ditto

      const playerA = Database.getPlayerData(playerA_ID);
      const playerB = Database.getPlayerData(playerB_ID);

      return (
        <div style={{display:'flex', backgroundColor:'',flexDirection:'row', flex:1, height:this.state.height}}>
          <div style={{backgroundColor:'#C9C9C9',flex:1, overflow: 'scroll'}}>
            <PlayerBreakdown player={playerA} />
              {/* <ContourPlot2 pitchData={playerA.pitchData} pitchData2={playerB.pitchData} /> */}
          </div>
          <div style={{backgroundColor:'#898989',flex:1, overflow: 'scroll'}}>
            <PlayerBreakdown player={playerB} />
          </div>
        </div>
      )
    }
}

class App extends Component {

  render() {
    return (
      <div className="App">
        <Layout />
      </div>
    );
  }
}

export default App;
