import * as React from 'react'

import '@progress/kendo-theme-default/dist/all.css';
import {
    Chart,
    ChartTitle,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisTitle,
    ChartCategoryAxisItem
} from '@progress/kendo-react-charts';

import 'hammerjs';

const series = [
    {
        name: "time checks",
        data: [3.988, 3.733, 3.994 , 1]
    },    
]

const categories = ['google', 'facebook', 'twitter', 'apple'];
class BarChart extends React.Component {

    constructor(props)
    {
        super(props);
    }

    render () 
    {

        const categories = this.props.data ? Object.keys(this.props.data) : [];

        const series = [
            {
                name : "time checks" ,
                data : this.props.data ?  Object.values(this.props.data) : []
            },
        ]

        // const obj = JSON.parse(this.props.data);
        // console.log(Object.keys(obj));
        
        return (
            <Chart style ={{height : (series[0].data.length * 60) + 'px'}}>
                <ChartTitle role="BarChartTitle" text="favorite Links" />
                    <ChartCategoryAxis>
                        <ChartCategoryAxisItem categories={categories}>
                            <ChartCategoryAxisTitle />
                        </ChartCategoryAxisItem>
                    </ChartCategoryAxis>
                <ChartSeries>
                {series.map((item, idx) => (
                <ChartSeriesItem stack={true}
                  key={idx}
                  gap ={2}                  
                  spacing = {.25}
                  type="bar"
                  tooltip={{ visible: true }}
                  data={item.data}
                //   name={item.name}
                                />
                            ))}
                </ChartSeries>
                </Chart>
        );
    }
}

export default BarChart ;