import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import linspace from 'linspace';
import {chanceOfHit} from '../utils/functions';

export default class ContourPlot extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {velocity:70};
    this.updateVelocity =this.updateVelocity.bind(this);
  }
  updateVelocity(event)
  {
    let velocity = event.target.value;
    this.setState({velocity})
  }
  render()
  {
    const pitchData = this.props.pitchData;
    const size = 50;
    const playerPitchXValues = [];
    const playerPitchYValues = [];
    const xValues = linspace(-1,1,size);
    const yValues = linspace(1.6,3.4,size);
    const zMatrix = [];

    for(let i = 0; i < size; i++) 
    {
      zMatrix[i] = new Array(size); // defining mxn matrix
    }

    for(let i = 0; i < size; i++) 
    {
      for(let j = 0; j < size; j++) 
      {
        const plate_x = xValues[i];
        const plate_z = yValues[j];
        zMatrix[i][j] = chanceOfHit(this.state.velocity,plate_x,plate_z) // filling mxn matrix with chances
      }
    }

    const strikes = [];

    for(let i = 0; i < pitchData.length; i++)
    {
      let pitch = pitchData[i];
      playerPitchXValues[i] = pitch.plate_x;
      playerPitchYValues[i] = pitch.plate_z;

      if(['StrikeCalled','StrikeSwinging'].indexOf(pitch.pitch_call) >= 0)
      {
        strikes.push(i);
      }
      // console.log(pitch.plate_z)
    }

    // console.log('--------retainerrrrr---------');

    // alert(playerPitchXValues[0] + ' -- ' + playerPitchYValues[0])
    return (
      <div>
        <Plot
          data={[
            {
              x: xValues,
              y: yValues,
              z: zMatrix,
              type: 'contour',
              // mode: 'markers',
              autocontour: false,
              ncontours:30,
              // x0:-1,
              // dx:0.25,
              // x0: -1.5,
              // dx: 0.05,
              // dy: 0.05,
              // y0: 1.5,
              // xaxis: {range: [2, 5]},
              // yaxis: {range: [2, 5]},
              contours: {
                // start: -0.02,
                // end: 0.02,
                // size:0.5,
                // coloring:'fill'
                // coloring: 'lines'
            },
              hoverinfo:"none",
              // contours:{coloring:'heatmap'}
            },
            {
              x: playerPitchXValues,
              y: playerPitchYValues,
              // opacity:0.5,
              mode: 'markers',
              type: 'scatter',
              hoverinfo:"none",
              marker:{
                size: 3,
                color:"#000000",
                symbol:'circle-open'
              },
              // selectedpoints: strikes,
              selected: {
                marker: {
                  size: 2,
                  color:'purple',
                  symbol: 'diamond-open'
                },
              },
            }
          ]}
          layout={ {width: 500, height: 500, title: 'Hit Chance Contour Plot/Pitch Scatter Plot'} }
        />
        <div>
          <input min="70" max="100" type="number" value = {this.state.velocity} onChange={this.updateVelocity}/>
          <input onChange={this.updateVelocity} type="range" min="70" max="100" value={this.state.velocity} className="slider" id="myRange"></input>
        </div>
      </div>
    );
  }
}