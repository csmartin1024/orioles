import React, { Component } from 'react';
import Plot from 'react-plotly.js';

export default class PitchTypeStrikePie extends Component
{
  constructor(props)
  {
    super(props);
  }
  render()
  {
    const pitchData = this.props.pitchData;
    const playerPitchXValues = [];
    const playerPitchYValues = [];

    const pitchTypeCount = {};
    let strikeCount = 0;

    for(let i = 0; i < pitchData.length; i++)
    {
      let pitch = pitchData[i];
      let count = pitchTypeCount[pitch.tagged_pitch_type];
      
      if(count === undefined)
      {
        count = 0;
      }

      if(['StrikeCalled','StrikeSwinging'].indexOf(pitch.pitch_call) >= 0)
      {
        count += 1;
        strikeCount +=1;
        pitchTypeCount[pitch.tagged_pitch_type] = count;
      }
    }

    const pitchTypes = Object.keys(pitchTypeCount);        // A list of the types of pitches thrown eg: Fastball, Curveball, etc...
    const pitchTypeCounts = Object.values(pitchTypeCount);   // A flat list of the counts of pitches eg: 22, 10, etc... (this aligns with the types above)
    const pitchTypeStrikeAverages = [];

    for(let i = 0; i < pitchTypeCounts.length; i++)
    {
      pitchTypeStrikeAverages[i] = (pitchTypeCounts[i] / strikeCount) * 100;
    }

    // const pitchTypeKeys = Object.keys(pitchTypeCount);

    // for(var i = 0; i < pitchTypeKeys.length; i++)
    // {
    //   let pitchTypeKey = pitchTypeKeys[i];
    //   let pitchType = pitchTypeCount[pitchTypeKey];
    //   pitchTypes[i] = pitchTypeKey;
    //   pitchTypeCounts[i] = pitchType;
    // }

    return (
      <div>
        <Plot
          data={[
            {
              // x: pitchTypes,
              // y: pitchTypeStrikeAverages,
              values: pitchTypeStrikeAverages,
              showlegend:false,
              labels: pitchTypes,
              hoverinfo:"percent+label",
              // mode: 'markers',
              type: 'pie',
              textinfo: 'label'
            }
          ]}
          layout={ {width: 500, height: 500, title: 'Pitch Type Strike Percentage'} }
          />
      </div>
    );
  }
}