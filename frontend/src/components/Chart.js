import React from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import ChartTick from "./ChartTick";

const Chart = ({ data }) => {
    const renderLineChart = (
        <div className="h-96 flex items-center justify-center relative">
            <ResponsiveContainer>
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#1A202E" stopOpacity={0.2} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="time" interval={2} tick={<ChartTick />} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#0F172A",
                            borderRadius: "5px",
                            width: "150px",
                            justifyContent: "center",
                            color: "#F1F5F9",
                            fontSize: "16px",
                            border: "#CBD5E1",
                            borderWidth: "5px",
                        }}
                        labelStyle={{ color: "#CBD5E1", fontSize: "14px" }}
                        itemStyle={{ color: "#ffff", fontSize: "16px" }}
                        offset={5}
                        cursor={false}
                    />
                    <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#06B6D4"
                        fillOpacity={0.6}
                        fill="url(#colorFill)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );

    return <>{renderLineChart}</>;
};

export default Chart;
