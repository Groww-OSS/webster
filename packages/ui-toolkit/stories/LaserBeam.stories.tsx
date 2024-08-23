import React from 'react';

import { StoryFn } from '@storybook/react';

import { Button, LaserBeam } from '../src/components/atoms';
import { Props as LaserBeamProps, LASER_BEAM_UI } from '../src/components/atoms/LaserBeam/LaserBeam';

export default {
  title: 'Laser Beam',
  component: LaserBeam,
  tags: [ 'autodocs' ]
};


const Template: StoryFn<LaserBeamProps> = (args) => {
  const [ active, setActive ] = React.useState(false);


  const alterActive = () => {
    setActive(!active);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <LaserBeam {...args}
        show={active}
      />

      <Button
        buttonText="Activate Laser Beam"
        isDisabled={active}
        onClick={alterActive}
      />
    </div>
  );
};

export const Dashed = {
  render: Template,

  args: {
    ccStyle: LASER_BEAM_UI.DASH,
    show: false
  }
};

export const Spread = {
  render: Template,

  args: {
    ccStyle: LASER_BEAM_UI.SPREAD,
    show: false
  }
};
