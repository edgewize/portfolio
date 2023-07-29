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

const calcDelta = (report, interval) => {
    const delta = report["delta"][interval]
    const diff = delta["current"] - delta["previous"]
    const pct_diff = Math.round((diff / delta["current"]) * 100, 2)
    return pct_diff
}

const api_url = document.getElementById("apiUrl").value;
if (api_url) {
    const start_date = new Date()
    start_date.setDate(start_date.getDate() - 21)
    const url_params = new URLSearchParams({start_date: formatDate(start_date)})
    fetch(`${api_url}/report/13206000?` + url_params, {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((report) => {
        const timeline_loader = document.getElementById("timeline-loader")
        timeline_loader ? timeline_loader.remove() : console.log("No timeline loader")
        const lineChartData = convertDataForLineChart(JSON.parse(report["timeline"]));
        Plotly.newPlot('timeline', [lineChartData], {
            title: 'River Flow Timeline',
            yaxis: {
                title: 'Cubic Feet Per Second (CFS)'
            }
        });
        const intervals = ["week", "month"]
        intervals.forEach((interval) => {
            const delta = document.getElementById(interval+"-delta")
            if (delta) {
                delta.innerHTML = calcDelta(report, interval) 
            }
        })

    })
    .catch((error) => {
        console.error('Error:', error)
    })
}    


// Continually reload page if we have a reload parameter.
// Reload is the number of MS between reloads. 
const url_params = new URLSearchParams(location.search);
const reload = url_params.get('reload');
if (reload) {
    setTimeout(function() {
        location.reload();
      }, reload);
}