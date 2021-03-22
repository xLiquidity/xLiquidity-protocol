import React, { PureComponent } from "react";

class ChartTick extends PureComponent {
  render() {
    const { x, y, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          className="text-xs leading-4 font-normal"
          x={0}
          y={0}
          dy={16}
          textAnchor="middle"
          fill="#E5E7EB"
        >
          {payload.value}
        </text>
      </g>
    );
  }
}

export default ChartTick;
