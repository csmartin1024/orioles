import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import linspace from 'linspace';
import {chanceOfHit} from '../utils/functions';

export default class PitchScatter extends Component
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
  
    const pitchTypePlotMap = {};

    for(let i = 0; i < pitchData.length; i++)
    {
      let pitch = pitchData[i];
      let pitchCall = pitch.tagged_pitch_type;

      let pitchTypePlot = pitchTypePlotMap[pitchCall];

      if(pitchTypePlot === undefined)
      {
        pitchTypePlot = {xValues:[],yValues:[], name:pitchCall};
      }

      pitchTypePlot.xValues[i] = pitch.plate_x;
      pitchTypePlot.yValues[i] = pitch.plate_z;
      pitchTypePlotMap[pitchCall] = pitchTypePlot;
    }

    const pitchScatters = [];
    // const pitchTypePlotMapKeys = Object.keys(pitchTypePlotMap);

    for (const key of Object.keys(pitchTypePlotMap)) 
    {
      // console.log(key, obj[key]);
      let pitchTypePlot = pitchTypePlotMap[key];

      const pitchScatter =             
      {
          x: pitchTypePlot.xValues,
          y: pitchTypePlot.yValues,
          mode: 'markers',
          type: 'scatter',
          name: pitchTypePlot.name,
          // text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
          marker: { size: 5 }
      };
      pitchScatters.push(pitchScatter);
  }

    return (
      <div>
        <Plot
          data={pitchScatters}
          layout={ {width: 500, height: 500, title: 'Pitch Location By Pitch Type'} }
        />
      </div>
    );
  }
}