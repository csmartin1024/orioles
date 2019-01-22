import React, { Component } from 'react';
import ContourPlot from './ContourPlot';
import PitchTypePie from './PitchTypePie';
import PitchTypeStrikePie from './PitchTypeStrikePie';
import PitchScatter from './PitchScatter';

export default class PlayerBreakdown extends Component
{
  render()
  {
    const {name, pitchData} = this.props.player;

    return (
      <div>
        <h1>{name}</h1>
        <ContourPlot pitchData={pitchData} />
        <PitchScatter pitchData={pitchData} />
        <PitchTypePie pitchData={pitchData} />
        <PitchTypeStrikePie pitchData={pitchData} />
      </div>
    );
  }
}