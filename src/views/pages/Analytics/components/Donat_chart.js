import * as React from 'react';
// import '@progress/kendo-theme-default/dist/all.css';
import "../../../styles/analytics.scss";

import {
  Chart,
  ChartTitle,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels
} from '@progress/kendo-react-charts';

import 'hammerjs';

const labelContent = (e) => (e.category);

class DonatChart extends React.Component {

    render(){
        
        const labelContent = (e) => (`${ e.category }`);        

        let data = [] ;
        const all =this.props.data ? Object.values(this.props.data).reduce((a,b) => a+b , 0 ): [] ;        
        
        if(this.props.data)
        {
          Object.keys(this.props.data).forEach(element => {
            const entry = {
              "tag" : element ,
              "count" : Math.round((this.props.data[element] / all) * 100)
            };
            data.push(entry);
          });
        }
         
        let checksPerTags = [{            
          "data": data
        }]        
        

        const mapSeries = (series, index, array) => (
            <ChartSeriesItem
              type="donut"
              startAngle={150}
              // name={series.name}
              data={series.data}
              tooltip={{ visible: true }}
              field="count"
              categoryField="tag"
              colorField="color"
              key = {index}
            >
              {
                index === array.length - 1
                && <ChartSeriesLabels
                  position="outsideEnd"
                  background="none"
                  content={labelContent} />
              }
            </ChartSeriesItem>
        );

        return (
            <div >
                <Chart style={{height : '260px'}} >
                    <ChartTitle role="DonatChartTitle" text="favorite topics" className = "Donat_chart_title"  />
                    <ChartSeries  >                        
                        {checksPerTags.map(mapSeries)}
                    </ChartSeries>
                    <ChartLegend visible={false} />
                </Chart>
            </div>
        )
    }
};

export default DonatChart ;