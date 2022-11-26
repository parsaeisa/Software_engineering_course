import {
    Chart,
    ChartTitle,
    ChartSeries,
    ChartLegend,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem
} from '@progress/kendo-react-charts';

import 'hammerjs';
import '@progress/kendo-theme-default/dist/all.css';
import React from 'react';
  
const categories = [
'Sat','Sun','Mon','Tue','Wen','Thu','Fri'
];

const data = [
    {
        name : "yesterday" ,
        data : [
            // 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 
            21, 4 , 6, 6, 9, 12, 11,
            // 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
        ]
    },
    // {
    //     name : "2 days ago " ,
    //     data : [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    //         10, 4 , 3, 1, 2, 2, 1,
    //         0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 
    //         ]
    // },
    // {
    //     name : "3 days ago" ,
    //     data : [10, 4 , 3, 1, 2, 2, 1,
    //         0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    //         0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ]
    // },
]

class LineChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data : []
        }
    }

    componentDidMount()
    {
        console.log(this.props.data);        
        this.setState({
            data : [{
                name : 'hours' ,
                data : this.props.data ? Object.values(this.props.data) : []
            }]
        });
    }

    render(){
        

        return (
            <Chart style={{height : "300px" }}>
                <ChartTitle role="lineChartTitle" text="Activity" />
                {/* <ChartLegend position="top" orientation="horizontal" /> */}
                <ChartCategoryAxis>
                    <ChartCategoryAxisItem title={{ text: 'Hours' }} categories={categories} />
                </ChartCategoryAxis>
                <ChartSeries>
                    {this.state.data && this.state.data.map((item, idx) => (
                    <ChartSeriesItem
                    key={idx}
                    type="line"
                    tooltip={{ visible: true }}
                    data={item.data}
                    name={item.name}
                                    />
                                ))}
                </ChartSeries>
            </Chart>
        );
    }
}

export default LineChart ;
