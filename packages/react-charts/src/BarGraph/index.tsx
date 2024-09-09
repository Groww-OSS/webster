import React, { ReactNode, useState } from 'react';
import { scaleBand } from '@visx/scale';
import { AxisBottom } from '@visx/axis';
import { isEmpty } from '../utils/helpers';
import './barGraph.css';


const BarGraph = (props: BarGraphProps) => {

  const {
    data,
    topMargin,
    bottomMargin,
    height,
    width,
    maxBarWidth,
    axisColor,
    axisLabelFontSize,
    axisLabelColor,
    getBarTopTextUI,
    getTooltipUI,
    showAxis,
    showTooltip,
    bottomAxisHeight
  } = props;

  const [ tooltip, setTooltip ] = useState<TooltipType>({
    show: false,
    x: 0,
    y: 0,
    barHeight: 0,
    selectedIndex: 0
  });


  const getXValue = (d: BarData) => d[0];


  const getYValue = (d: BarData) => d[1];


  const getBarColor = (d: BarData) => d[2];


  if (isEmpty(data)) return null;


  const graphHeight = height - bottomAxisHeight;
  let minValue = 0, maxValue = 0;

  data.forEach(d => {
    const yVal = getYValue(d);

    minValue = Math.min(minValue, yVal);
    maxValue = Math.max(maxValue, yVal);
  });
  const xMax = width;
  const yMin = topMargin;

  const yMax = graphHeight - topMargin - (minValue < 0 ? bottomMargin : 0);

  const xScale = scaleBand({
    range: [ 0, xMax ],
    round: true,
    domain: data.map(getXValue),
    padding: 0
  });

  const scaleYData = {
    domain: [ Math.min(0, minValue), maxValue ],
    range: [ yMax, yMin ]
  };


  const yScale = (yVal: number) => {
    return (
      scaleYData.range[0] +
            (yVal - scaleYData.domain[0]) * (scaleYData.range[1] - scaleYData.range[0]) / (scaleYData.domain[1] - scaleYData.domain[0])
    );
  };

  const yScale0 = yScale(0);


  const getBottomAxisUI = () => {
    return (
      <AxisBottom
        top={yMax + (minValue < 0 ? bottomMargin : 0)}
        scale={xScale}
        tickFormat={(d) => d}
        stroke={axisColor}
        orientation='bottom'
        hideTicks
        tickLabelProps={
          () => ({
            fill: axisLabelColor,
            fontSize: axisLabelFontSize,
            textAnchor: 'middle'
          })
        }
      />
    );
  };


  const handleMouseEnter = (textX: number, textY: number, barHeight: number, index: number) => {

    setTooltip({
      show: true,
      x: textX,
      y: textY,
      barHeight,
      selectedIndex: index
    });
  };


  const handleMouseOut = () => {
    setTooltip({
      ...tooltip,
      show: false
    });
  };

  return (
    <div className='pos-rel'>
      <svg width={width}
        height={height}
      >
        <rect width={width}
          height={height}
          fill="rgba(0, 0, 0, 0)"
          style={{ overflow: 'visible' }}
        />
        <g>
          {
            data.map((d, i) => {
              const y = getYValue(d);
              const yScaleY = yScale(y);
              const isNegative = y < 0;
              const xval = getXValue(d);

              let barBandwidth = xScale.bandwidth();

              let barX = xScale(xval) ?? 0;

              if (maxBarWidth && barBandwidth > maxBarWidth) {
                barX = barX + (barBandwidth - maxBarWidth) / 2;
                barBandwidth = maxBarWidth;
              }

              const barY = yScaleY;
              const barHeight = isNegative ? Math.abs(yScaleY - yScale0) : yScale0 - barY;
              const textX = barX + barBandwidth / 2;
              const textY = isNegative ? barY + 12 : barY - 5;

              return (
                <React.Fragment key={getXValue(d) + getYValue(d)}>
                  {getBarTopTextUI(textX, textY, d)}
                  <line
                    className='bar21animation'
                    x1={textX}
                    x2={textX}
                    y1={yScale0}
                    y2={barY}
                    strokeWidth={barBandwidth}
                    height={barHeight}
                    stroke={getBarColor(d)}
                    onMouseEnter={() => handleMouseEnter(textX, textY, barHeight, i)}
                    onMouseOut={handleMouseOut}
                  />
                </React.Fragment>
              );
            })
          }
          <line
            x1={0}
            y1={yScale0}
            x2={xMax}
            y2={yScale0}
            stroke={axisColor}
            strokeWidth={1}
          />
        </g>

        {showAxis && getBottomAxisUI()}
      </svg>
      {showTooltip && tooltip.show && getTooltipUI(tooltip.selectedIndex, tooltip.x, tooltip.y, tooltip.barHeight)}
    </div>
  );
};

export type BarData = [string, number, string]
 // xaxis value, yaxis value, bar color

type TooltipType = {
  show: boolean;
  x: number;
  y: number;
  barHeight:number;
  selectedIndex: number;
}


type DefaultProps = {
  axisColor: string;
  topMargin: number;
  bottomMargin: number;
  maxBarWidth: number;
  getBarTopTextUI: (textX : number, textY: number, barData: BarData) => SVGElement | null;
  getTooltipUI?: (index: number, x: number, y: number, barHeight: number) => ReactNode;
  showAxis: boolean;
  showTooltip?: boolean;
  axisLabelFontSize?: number;
  axisLabelColor?: string;
  bottomAxisHeight: number;
}


type RequiredProps = {
  data: BarData[];
  width: number;
  height: number;
}

BarGraph.defaultProps = {
  axisColor: 'var(--gray700)',
  topMargin: 0,
  bottomMargin: 0,
  maxBarWidth: 20,
  getBarTopTextUI: () => null,
  getTooltipUI: () => null,
  showAxis: false,
  showTooltip: false,
  axisLabelFontSize: 11,
  axisLabelColor: 'var(--gray900)',
  bottomAxisHeight: 22
} as DefaultProps;


export type BarGraphProps = RequiredProps & DefaultProps;

export default BarGraph;
