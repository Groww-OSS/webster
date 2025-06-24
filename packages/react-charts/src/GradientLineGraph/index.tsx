import React, { useMemo, useState } from 'react';

import { min, max, bisector } from 'd3-array';
import { localPoint } from '@visx/event';
import { area } from '@visx/shape';

import {
  DragData,
  LineGraphProps,
  LinePathData,
  Point,
  ToolTipData,
  ToolTipSeriesData
} from './lineGraphTypes';
import { isEmpty } from '../utils/helpers';

const DefaultStrokeMultiplier = 1.5;


const CustomLineGraph = (props: LineGraphProps) => {
  const [tooltipData, setToolTipData] = useState<ToolTipData | null>(null);
  const [dragPoints, setDragPoints] = useState<DragData | null>(null);

  const {
    paddingVert,
    paddingHorz,
    height,
    width,
    linePaths,
    onMouseLeave
  } = props;

  const scaleValues = useMemo(() => {
    if (isEmpty(linePaths)) {
      return null;
    }


    const getXaxisValue = (d: Point) => d?.[0];


    const getYaxisValue = (d: Point): number => d?.[1];

    let minY: number = Number.MAX_SAFE_INTEGER;
    let maxY: number = Number.MIN_SAFE_INTEGER;
    let minX = Number.MAX_SAFE_INTEGER;
    let maxX = Number.MIN_SAFE_INTEGER;

    linePaths.forEach(lp => {
      if (lp.isSeriesToScale) {
        const tempMinY = min(lp.series, getYaxisValue);
        const tempMaxY = max(lp.series, getYaxisValue);
        const tempMinX = min(lp.series, getXaxisValue);
        const tempMaxX = max(lp.series, getXaxisValue);

        if (tempMinY !== undefined) { minY = Math.min(minY, tempMinY); }

        if (tempMaxY !== undefined) { maxY = Math.max(maxY, tempMaxY); }

        if (tempMinX !== undefined) { minX = Math.min(minX, tempMinX); }

        if (tempMaxX !== undefined) { maxX = Math.max(maxX, tempMaxX); }
      }
    });

    return {
      scaleX: {
        domain: [minX, maxX],
        range: [0 + paddingHorz, width - paddingHorz]
      },
      scaleY: {
        domain: [minY, maxY],
        range: [height - paddingVert, paddingVert]
      }
    };
  }, [linePaths, width, height, paddingHorz, paddingVert]);

  const lineCenterPoint = useMemo(() => {
    if (!scaleValues || isEmpty(linePaths) || !linePaths[0]?.series || linePaths[0].series.length === 0) {
      return { x: width / 2, y: height / 2 };
    }

    const { scaleX, scaleY } = scaleValues;


    const getXScaleValue = (xVal: number): number => {
      return (
        scaleX.range[0] +
        (xVal - scaleX.domain[0]) * (scaleX.range[1] - scaleX.range[0]) / (scaleX.domain[1] - scaleX.domain[0])
      );
    };


    const getYScaleValue = (yVal: number): number => {
      return (
        scaleY.range[0] +
        (yVal - scaleY.domain[0]) * (scaleY.range[1] - scaleY.range[0]) / (scaleY.domain[1] - scaleY.domain[0])
      );
    };

    const points = linePaths[0].series;
    let sumX = 0;
    let sumY = 0;
    let validPointCount = 0;

    points.forEach((point: Point) => {
      const xVal = point[0];
      const yVal = point[1];

      if (typeof xVal === 'number' && typeof yVal === 'number') {
        const screenX = linePaths[0].isSeriesToScale ? getXScaleValue(xVal) : xVal;
        const screenY = linePaths[0].isSeriesToScale ? getYScaleValue(yVal) : yVal;

        sumX += screenX;
        sumY += screenY;
        validPointCount++;
      }
    });

    if (validPointCount > 0) {
      return {
        x: sumX / validPointCount,
        y: sumY / validPointCount
      };
    }

    return { x: width / 2, y: height / 2 };
  }, [scaleValues, linePaths, width, height]);

  if (isEmpty(linePaths) || !scaleValues) {
    return null;
  }

  const { scaleX, scaleY } = scaleValues;


  function getYScaleValue(yVal: number) {
    return (
      scaleY.range[0] +
      (yVal - scaleY.domain[0]) * (scaleY.range[1] - scaleY.range[0]) / (scaleY.domain[1] - scaleY.domain[0])
    );
  }


  function getXScaleValue(xVal: number): number {
    return (
      scaleX.range[0] +
      (xVal - scaleX.domain[0]) * (scaleX.range[1] - scaleX.range[0]) / (scaleX.domain[1] - scaleX.domain[0])
    );
  }


  const getXaxisValue = (d: Point) => d?.[0];


  const getYaxisValue = (d: Point): number => d?.[1];


  const invertX = (x: number): number => {
    return (
      scaleX.domain[0] +
      ((x - scaleX.range[0]) * (scaleX.domain[1] - scaleX.domain[0]) / (scaleX.range[1] - scaleX.range[0]))
    );
  };


  const invertY = (y: number): number => {
    return (
      scaleY.domain[0] +
      ((y - scaleY.range[0]) * (scaleY.domain[1] - scaleY.domain[0]) / (scaleY.range[1] - scaleY.range[0]))
    );
  };


  const getIndexFromScaledPoint = (x: number, series: Point[]) => {
    const bisectXAxis = bisector(getXaxisValue).left;

    return bisectXAxis(series, invertX(x), 0);
  };


  const getDragColor = (lp: LinePathData) => {
    const { startPoint, endPoint } = dragPoints ?? {};
    const { fill = lp?.color, lineColor, negativeLineColor } = lp?.draggableConfig ?? {};

    if (startPoint === undefined || endPoint === undefined) return lp?.color;

    const lpStart = lp?.series?.[getIndexFromScaledPoint(startPoint, lp.series)]?.[1];
    const lpEnd = lp?.series?.[getIndexFromScaledPoint(endPoint, lp.series)]?.[1];
    const line = lineColor ?? fill;
    const negativeLine = negativeLineColor ?? lineColor ?? fill;

    if (startPoint < endPoint) return lpStart < lpEnd ? line : negativeLine;
    return lpStart > lpEnd ? line : negativeLine;
  };

  // Calculate dot pattern origin based on interaction state
  const getDotPatternOrigin = () => {
    if (dragPoints?.startPoint !== undefined && dragPoints?.endPoint !== undefined) {
      // During drag: center of selected area
      const startX = Math.min(dragPoints.startPoint, dragPoints.endPoint);
      const endX = Math.max(dragPoints.startPoint, dragPoints.endPoint);
      const centerX = (startX + endX) / 2;

      return { x: centerX, y: height / 8 };

    } else if (tooltipData?.seriesData?.[0]?.intersectionPointOnLine?.coords) {
      return {
        x: tooltipData.seriesData[0].intersectionPointOnLine.coords.x,
        y: tooltipData.seriesData[0].intersectionPointOnLine.coords.y
      };
    }

    // Default: center of graph
    return lineCenterPoint;
  };

  // Generate dot pattern definitions
  const getDotPatternDefs = () => {
    const lp = linePaths[0];
    const origin = getDotPatternOrigin();

    // Calculate minX and maxX for the current path
    const xValues = lp.series.map((d: Point) => lp.isSeriesToScale ? getXScaleValue(d[0]) : d[0]);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);

    // Calculate minY and maxY for the current path
    const yValues = lp.series.map((d: Point) => lp.isSeriesToScale ? getYScaleValue(d[1]) : d[1]);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);


    const patternId = `dotPattern-${lp.key}`;
    const gradientId = `dotGradient-${lp.key}`;
    const maskId = `dotMask-${lp.key}`;

    return (
      <React.Fragment key={`patterns-${lp.key}`}>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <rect width="6"
            height="6"
            fill="black"
          /> {/* Black background = hidden */}
          <circle
            cx="6"
            cy="6"
            r="1.5"
            fill="white" // White = visible through mask
          />
        </pattern>

        {/* Mask element that uses the dot pattern */}
        <mask id={maskId}>
          <rect width="100%"
            height="100%"
            fill={`url(#${patternId})`}
          />
        </mask>

        <radialGradient
          id={gradientId}
          cx={maxX - minX === 0 ? 0.5 : Math.max(0, Math.min(1, (origin.x - minX) / (1.75 * (maxX - minX))))}
          cy={maxY - minY === 0 ? 0.5 : Math.max(0, Math.min(1, ((origin.y - minY) / (maxY - minY)) / 4))}
          r={maxY - minY === 0 ? 0.3 : Math.max(0.1, Math.min(0.8, ((maxY - origin.y) / (maxY - minY)) / 3.5))}
          gradientUnits="objectBoundingBox"
          gradientTransform={'scale(1.75,4)'}
        >
          <stop offset="0%"
            stopColor={lp.color}
            stopOpacity="1"
          />
          <stop offset="40%"
            stopColor={lp.color}
            stopOpacity="0.8"
          />
          <stop offset="70%"
            stopColor={lp.color}
            stopOpacity="0.4"
          />
          <stop offset="100%"
            stopColor={lp.color}
            stopOpacity="0"
          />
        </radialGradient>
      </React.Fragment>
    );
  };


  const onMouseDown = (e: any) => {
    props.onMouseDown?.();
    if (!props.isDragAllowed) return;

    const { x } = localPoint(e) || { x: 0 };

    setDragPoints({ startPoint: x });
  };


  const onMouseUp = () => {
    props.onMouseUp?.();
    setDragPoints(null);
  };


  const onMouseOut = () => {
    onMouseLeave?.();
    setToolTipData(null);
  };


  const handleTooltip = (e: any) => {
    e.preventDefault();
    const { onMouseEnter } = props;

    const { x, y } = localPoint(e) || { x: 0, y: 0 };
    const x0 = invertX(x);
    const y0 = invertY(y);

    const toolTipSeriesData: Array<ToolTipSeriesData> = [];

    linePaths?.map((lp: LinePathData) => {
      const { isDraggable } = lp;
      const series = [...lp.series];
      const seriesLen = series.length;

      let index = getIndexFromScaledPoint(x, series);
      const isPerfectIntersection = index !== 0 && !isEmpty(series?.[index]?.[0]) && series?.[index]?.[0] >= x0;

      if (index === seriesLen) {
        index = seriesLen - 1;
      }

      const nextPoint: Point = series[index];
      const prevPoint: Point = series[index > 0 ? index - 1 : index];
      const slope = (nextPoint[1] - prevPoint[1]) / (nextPoint[0] - prevPoint[0]);
      const calculatedYAtHoveredPoint = slope * (x0 - prevPoint[0]) + prevPoint[1];

      const tempTooltipData = {
        point: nextPoint,
        tooltipLeft: lp?.isSeriesToScale ? getXScaleValue(getXaxisValue(nextPoint)) : getXaxisValue(nextPoint),
        tooltipTop: lp?.isSeriesToScale ? getYScaleValue(getYaxisValue(nextPoint)) : getYaxisValue(nextPoint),
        isPerfectIntersection: isPerfectIntersection,
        intersectionPointOnLine: {
          coords: { x: getXScaleValue(x0), y: getYScaleValue(calculatedYAtHoveredPoint) },
          invertedValues: { x: x0, y: calculatedYAtHoveredPoint }
        }
      };

      if (isDraggable && dragPoints) {
        const dragStartPoint = series[getIndexFromScaledPoint(dragPoints?.startPoint, series)];

        toolTipSeriesData.push({
          ...tempTooltipData,
          dragStartPoint,
          dragTooltipLeft: dragPoints?.startPoint
        });

        if (!dragStartPoint) {
          setDragPoints(null);
        }

        if (x0 < seriesLen - 1 && dragPoints.startPoint !== undefined) {
          setDragPoints({
            ...dragPoints,
            endPoint: x
          });
        }

      } else {
        toolTipSeriesData.push(tempTooltipData);
      }
    });

    const toolTipData: ToolTipData = {
      seriesData: toolTipSeriesData,
      otherData: {
        coords: { x: x as number, y: y as number },
        invertedValues: { x: x0, y: y0 }
      }
    };

    onMouseEnter?.(toolTipData);
    setToolTipData(toolTipData);
  };


  const getDragLinePoints = (series: Point[]) => {
    let { startPoint, endPoint } = dragPoints ?? {};

    if (startPoint === undefined || endPoint === undefined) return [];
    if (startPoint > endPoint) {
      [startPoint, endPoint] = [endPoint, startPoint];
    }

    endPoint += 1;

    const startIndex = getIndexFromScaledPoint(startPoint, series);
    const endIndex = getIndexFromScaledPoint(endPoint, series);

    return series?.slice(startIndex, endIndex);
  };


  const showBlinkingPointUI = (lp: LinePathData) => {
    const hoverPointStrokeMultiplier = lp.hoverPointStrokeMultiplier ?? DefaultStrokeMultiplier;
    const lastPoint = lp.series[lp.series.length - 1];
    const lastPointY = getYScaleValue(getYaxisValue(lastPoint));
    const lastPointX = getXScaleValue(getXaxisValue(lastPoint));

    if (!lp.showLastPointBlinking) {
      return null;
    }

    return (
      <g>
        <circle
          cx={lastPointX}
          cy={lastPointY}
          r={lp.strokeWidth * hoverPointStrokeMultiplier}
          fill={lp.color}
          stroke='var(--dangerouslySetPrimaryBg)'
          strokeWidth={lp.strokeWidth * hoverPointStrokeMultiplier / 2}
          pointerEvents="none"
          style={lp.style}
        >
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    );
  };


  const showHighlightedPoints = (lp: LinePathData) => {
    if (!lp.hasHighlightedPoints) return;
    const strokeMultiplier = lp.highlightPointStrokeMultiplier ?? DefaultStrokeMultiplier;

    return (
      <g>
        {
          lp.series.map((point: Point, idx: number) => {
            if (point?.[3]?.highlightPoint) {
              return (
                <circle
                  key={`highlight-${idx}`}
                  cx={getXScaleValue(getXaxisValue(point))}
                  cy={getYScaleValue(getYaxisValue(point))}
                  r={lp.strokeWidth * strokeMultiplier}
                  fill={lp.color}
                  stroke={lp.color}
                  strokeWidth={lp.strokeWidth * strokeMultiplier / 2}
                  pointerEvents="none"
                />
              );
            }

            return null;
          })
        }
      </g>
    );
  };


  const getToolTipUI = () => {
    const {
      getTooltipUI,
      toolTipLeftUpdated,
      toolTipTopUpdated,
      isDragAllowed
    } = props;

    const tooltipStyle: React.CSSProperties = {
      top: 0,
      left: 0,
      boxShadow: 'none',
      padding: 0,
      backgroundColor: 'transparent',
      position: 'absolute',
      borderRadius: '3px',
      transform: `translate(${toolTipLeftUpdated}px, ${toolTipTopUpdated}px)`
    };

    if (!tooltipData || !getTooltipUI) {
      return null;
    }

    if (isDragAllowed && dragPoints?.endPoint) {
      return getTooltipUI(tooltipData);
    }

    return (
      <div style={tooltipStyle}>
        {getTooltipUI(tooltipData)}
      </div>
    );
  };


  const getHoveredPointUI = (x: number, y: number, color: string, strokeWidth: number, hoverPointStrokeMultiplier?: number) => {
    const strokeMultiplier = hoverPointStrokeMultiplier ?? DefaultStrokeMultiplier;

    return (
      <>
        <circle
          cx={x}
          cy={y}
          r={strokeWidth * strokeMultiplier}
          fill={color}
          stroke='var(--dangerouslySetPrimaryBg)'
          strokeWidth={strokeWidth}
          pointerEvents="none"
        />
        <circle
          cx={x}
          cy={y}
          r={strokeWidth * strokeMultiplier}
          fill='rgba(0, 0, 0, 0)'
          stroke={color}
          strokeWidth={strokeWidth * strokeMultiplier / 2}
          pointerEvents="none"
          opacity="0.3"
        />
      </>
    );
  };


  const showDraggedPoints = (lp: LinePathData) => {
    if (!lp.allowToolTip || !dragPoints?.endPoint) {
      return null;
    }

    const { hoverPointStrokeMultiplier, strokeWidth } = lp;
    const x = dragPoints?.startPoint;
    const y = getYScaleValue(lp.series?.[getIndexFromScaledPoint(dragPoints.startPoint, lp?.series)]?.[1]);
    const color = getDragColor(lp);

    if (scaleX.range[0] <= x && x <= scaleX.range[1] && scaleY.range[1] <= y && y <= scaleY.range[0]) {
      return getHoveredPointUI(x, y, color, strokeWidth, hoverPointStrokeMultiplier);
    }
  };


  const showHoveredPoints = (lp: LinePathData, idx: number) => {
    if (!lp.allowToolTip || isEmpty(tooltipData)) {
      return null;
    }

    const { hoverPointStrokeMultiplier, strokeWidth } = lp;
    const hoverExactPoint = lp.hoverExactPoint;
    const currTooltipData = tooltipData?.seriesData?.[idx];
    let x = 0, y = 0;

    if (hoverExactPoint) {
      if (currTooltipData?.isPerfectIntersection) {
        x = currTooltipData.intersectionPointOnLine.coords.x;
        y = currTooltipData.intersectionPointOnLine.coords.y;

      } else {
        return null;
      }

    } else {
      x = currTooltipData?.tooltipLeft as number;
      y = currTooltipData?.tooltipTop as number;
    }

    const color = dragPoints?.endPoint ? getDragColor(lp) : lp?.color;

    if (scaleX.range[0] <= x && x <= scaleX.range[1] && scaleY.range[1] <= y && y <= scaleY.range[0]) {
      return getHoveredPointUI(x, y, color, strokeWidth, hoverPointStrokeMultiplier);
    }
  };

  // Generate the area path for dot pattern fill
  const getDotPatternArea = (lp: LinePathData) => {
    const x = (d: Point) => lp.isSeriesToScale ? getXScaleValue(getXaxisValue(d)) : getXaxisValue(d);


    const y = (d: Point) => lp.isSeriesToScale ? getYScaleValue(getYaxisValue(d)) : getYaxisValue(d);

    const areaPath = area({
      x: x as any,
      y0: height, // Bottom of chart
      y1: y as any // Line path
    });

    return areaPath(lp.series) || '';
  };

  return (
    <>
      <svg
        width={width}
        height={height}
        onTouchMove={handleTooltip}
        onMouseMove={handleTooltip}
        onTouchStart={handleTooltip}
        onTouchEnd={onMouseOut}
        onMouseLeave={onMouseOut}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
      >
        <defs>
          {props.getDefs?.()}
          {getDotPatternDefs()}
        </defs>

        <g>
          {
            linePaths.map((lp, lpIndex) => {
              const x = (d: Point) => lp.isSeriesToScale ? getXScaleValue(getXaxisValue(d)) : getXaxisValue(d);


              const y = (d: Point) => lp.isSeriesToScale ? getYScaleValue(getYaxisValue(d)) : getYaxisValue(d);

              const { areaProps } = lp || {};
              const toShowArea = areaProps && (!isEmpty(areaProps?.toX) || !isEmpty(areaProps?.toY));
              const areaPath = area({});
              const linePath = area({ x, y });

              const { toX, toY } = areaProps || {};

              if (!isEmpty(toX)) {
                areaPath.y(y as any);
                areaPath.x0(getXScaleValue(toX ?? 0));
                areaPath.x1(x as any);

              } else if (!isEmpty(toY)) {
                areaPath.x(x as any);
                areaPath.y0(getYScaleValue(toY ?? 0));
                areaPath.y1(y as any);
              }

              const toShowDrag = lp.isDraggable && dragPoints?.endPoint;
              const dragLinePoints = toShowDrag ? getDragLinePoints(lp?.series) : [];
              const dragLineColor = getDragColor(lp);
              const dragPath = area({});

              const {
                showLabel,
                labelText,
                labelRefs,
                rectSvgProps,
                textSvgProps,
                labelPosition
              } = lp?.labelData ?? {};

              const { underlyinglabelTextRef, underlyinglabelRectRef } = labelRefs ?? {};

              if (lp?.draggableConfig?.toY) {
                dragPath.y(x as any);
                dragPath.x0(width);
                dragPath.x1(y as any);

              } else {
                dragPath.x(x as any);
                dragPath.y0(height);
                dragPath.y1(y as any);
              }

              const gradientId = `dotGradient-${lp.key}`;
              const dotAreaPath = lpIndex === 0 ? getDotPatternArea(lp) : '';

              return (
                <React.Fragment key={lp.key}>
                  {/* Dot pattern area fill */}
                  {
                    lpIndex === 0 &&
                    <path
                      d={dotAreaPath}
                      fill={`url(#${gradientId})`}    // Gradient as fill
                      mask={`url(#dotMask-${lp.key})`}  // Dot pattern as mask
                      opacity="0.6"
                    />
                  }
                  {
                    toShowArea && (
                      <path
                        d={areaPath(lp.series) || ''}
                        fill={areaProps?.fill}
                        opacity={areaProps?.opacity}
                        style={{ ...areaProps.style }}
                      />
                    )
                  }
                  {/* Main line path */}
                  <path
                    d={linePath(lp.series) || ''}
                    opacity={areaProps?.opacity}
                    stroke={lpIndex === 0 ? 'url(#lineGradient)' : lp.color}
                    style={{ ...lp.style }}
                    strokeOpacity={lp.strokeOpacity}
                    shapeRendering="geometricPrecision"
                    strokeWidth={lp.strokeWidth}
                    fill='none'
                  />

                  {/* Label */}
                  {
                    showLabel && (
                      <g>
                        <rect
                          ref={underlyinglabelRectRef}
                          {...rectSvgProps}
                        />
                        <text
                          x={getXScaleValue(labelPosition?.x ?? 0)}
                          y={getYScaleValue(labelPosition?.y ?? 0)}
                          ref={underlyinglabelTextRef}
                          {...textSvgProps}
                        >
                          {labelText}
                        </text>
                      </g>
                    )
                  }

                  {/* Drag area and line */}
                  {
                    toShowDrag && (
                      <>
                        <path
                          d={dragPath(dragLinePoints) || ''}
                          fill={lp?.draggableConfig?.fill}
                        />
                        <path
                          d={linePath(dragLinePoints) || ''}
                          stroke={dragLineColor}
                          style={{ ...lp.style }}
                          strokeOpacity={lp.strokeOpacity}
                          shapeRendering="geometricPrecision"
                          strokeWidth={lp.strokeWidth}
                          fill="none"
                        />
                      </>
                    )
                  }
                </React.Fragment>
              );
            })
          }

          {/* Interactive points */}
          {
            linePaths.map((lp, idx) => (
              <React.Fragment key={`points-${lp.key}`}>
                {showBlinkingPointUI(lp)}
                {showHighlightedPoints(lp)}
                {showHoveredPoints(lp, idx)}
                {showDraggedPoints(lp)}
              </React.Fragment>
            ))
          }
        </g>
      </svg>
      {getToolTipUI()}
    </>
  );
};

export default CustomLineGraph;
