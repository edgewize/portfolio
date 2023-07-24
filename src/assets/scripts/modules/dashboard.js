import Plotly from 'plotly.js-dist-min'


function convertDataForLineChart(data) {
    const series = data[ Object.keys(data)[0]];
    const xValues = [];
    const yValues = [];
    for (const date in series) {
        xValues.push(date);
        yValues.push(series[date]);
    }  
    return {
      x: xValues,
      y: yValues,
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Water Flow',
    };
  }

const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
  
    return `${year}-${month}-${day}`
}

const apiUrl = document.getElementById("apiUrl").value;
if (apiUrl) {
    const start_date = new Date()
    start_date.setDate(start_date.getDate() - 14)
    const format_start_date = formatDate(start_date)
    console.log(format_start_date)
    fetch(`${apiUrl}/data/13206000?` + new URLSearchParams({start_date: format_start_date}), {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((data) => {
        const lineChartData = convertDataForLineChart(JSON.parse(data));
        Plotly.newPlot('line', [lineChartData], {
            title: 'Water Flow Over Time',
            xaxis: {
                title: 'Date'
            },
            yaxis: {
                title: 'Water Flow'
            }
            });
    })
    .catch((error) => {
        console.error('Error:', error)
    })
}    



