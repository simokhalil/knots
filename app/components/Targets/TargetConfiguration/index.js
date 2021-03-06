/*
 * knots
 * Copyright 2018 data.world, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the
 * License.
 *
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * permissions and limitations under the License.
 *
 * This product includes software developed at
 * data.world, Inc.(http://data.world/).
 */

// @flow

import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';

import DataWorld from '../../../containers/DataWorld';
import Stitch from '../../../containers/Stitch';

type Props = {
  targetsStore: {
    selectedTarget: { name: string, image: string }
  }
};

export default class Target extends Component<Props> {
  selectedTarget = () => {
    const { selectedTarget } = this.props.targetsStore;
    switch (selectedTarget.name) {
      case 'target-datadotworld':
        return <DataWorld />;
      case 'target-stitch':
        return <Stitch />;
      default:
        return <div>Unknown Target</div>;
    }
  };

  render() {
    return (
      <div>
        <Container>
          <Row>{this.selectedTarget()}</Row>
        </Container>
      </div>
    );
  }
}
