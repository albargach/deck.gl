// Copyright (c) 2015 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import test from 'tape-catch';
import * as FIXTURES from 'deck.gl/test/data';
import {
  testCreateLayer,
  testCreateEmptyLayer,
  testNullLayer,
  testLayerUpdates
} from 'deck.gl/test/test-utils/layer-utils';

import {PolygonLayer} from 'deck.gl';

test('PolygonLayer#constructor', t => {
  const LayerComponent = PolygonLayer;
  const data = FIXTURES.polygons;

  const TEST_CASES = {
    INITIAL_PROPS: {
      data,
      getPolygon: f => f
    },
    UPDATES: [
      {
        updateProps: {
          filled: false
        },
        assert: (layer, oldState) => {
          t.ok(layer.state, 'should update layer state');
          const subLayers = layer.renderLayers();
          t.ok(subLayers.length, 'subLayers rendered');
        }
      },
      {
        updateProps: {
          data: data.slice(0, 10)
        },
        assert: (layer, oldState) => {
          t.ok(layer.state.paths.length !== oldState.paths.length, 'should update state.paths');
        }
      }
    ]
  };

  testCreateLayer(t, LayerComponent, {data, pickable: true});
  testCreateEmptyLayer(t, LayerComponent);
  testNullLayer(t, LayerComponent);
  testLayerUpdates(t, {LayerComponent, testCases: TEST_CASES});

  t.end();
});
