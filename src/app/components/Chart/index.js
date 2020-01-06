import React from 'react';
import Constant from "../../constants/constants";

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.drowChart = this.drowChart.bind(this);
    }
    drowChart() {
        const google = window.google
        const data = google.visualization.arrayToDataTable([Constant.chartHeader].concat(this.props.data));
        const options = Constant.chartOptions;
        if (!document.getElementById('chartDiv')) { return }
        var chart = new google.visualization.BarChart(document.getElementById('chartDiv'));
        chart.draw(data, options);
    }
    render() {

        const google = window.google;
        google.charts.load('current', { packages: ['corechart', 'bar'] });
        google.charts.setOnLoadCallback(this.drowChart);
        return (
            <div className="chartDiv" id="chartDiv">
                chart
            </div>
        );
    }
}

export default Chart;