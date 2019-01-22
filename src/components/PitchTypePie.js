import React, { Component } from 'react';
import Plot from 'react-plotly.js';

export default class PitchTypePie extends Component
{
  constructor(props)
  {
    super(props);
  }
  render()
  {
    const pitchData = this.props.pitchData;
    const pitchTypeCount = {};    // a map of type of pitches to the number of them thrown eg: Fastball:22

    for(let i = 0; i < pitchData.length; i++)
    {
      let pitch = pitchData[i];
      let count = pitchTypeCount[pitch.tagged_pitch_type];
      
      if(count === undefined)
      {
        count = 0;
      }
      
      count += 1;
      pitchTypeCount[pitch.tagged_pitch_type] = count;
    }

    const pitchTypes = Object.keys(pitchTypeCount);        // A list of the types of pitches thrown eg: Fastball, Curveball, etc...
    const pitchTypeCounts = Object.values(pitchTypeCount);   // A flat list of the counts of pitches eg: 22, 10, etc... (this aligns with the types above)
    const pitchTypeAverages = [];

    for(let i = 0; i < pitchTypeCounts.length; i++)
    {
      pitchTypeAverages[i] = (pitchTypeCounts[i] / pitchData.length) * 100;
    }

    return (
      <div>
        <Plot
          data={[
            {
              // x:pitchTypes,
              // y:pitchTypeAverages,
              values: pitchTypeAverages,
              // marker:{
              //   symbol:"none"
              // },
              labels: pitchTypes,
              hoverinfo:"percent+label",
              showlegend:false,
              type: 'pie',
              // type: 'bar',
              hole: .4,
              textinfo: 'label'
            }
          ]}
          layout={ {width: 500, height: 500, title:'Pitch Type Percentage'} }
          />
      </div>
    );
  }
}