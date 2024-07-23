const canvas = document.getElementById('bar-graph');
const bar_graph = new Chart(canvas,{
    type: 'bar',
    data: {
        labels: ['March', 'April', 'May', 'June', 'July', 'August', 'September'],
        datasets: [
            {
                label: 'Sales',
                data: [150, 180, 120, 220, 166, 170, 180],
                backgroundColor: ['green'],
            },
            {
                label: 'Profit',
                data: [40, 58, 30, 60, 55, 57, 90],
                backgroundColor: ['orange'],
                
            },
        ]
    },
    // Options: {
    //     indexAxis: 'y',
    // }  


});

// Doughnut Chart

const canvasss = document.getElementById('doughnut-graph');
const doughnut_graph= new Chart(canvasss,{
    type: 'doughnut',
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: 'Sales',
                data: [150, 180, 120, 220, 166, 170, 180],
                backgroundColor: ['purple'],
                hoverOffset: 45,
            },
            {
                label: 'Profit',
                data: [40, 58, 30, 60, 55, 57, 90],
                backgroundColor: ['orange'],
                hoverOffset: 45,
                
                
            },
        ]
    }  


});

// Pie Graph
const canvass = document.getElementById('pie-graph');
const pie_graph= new Chart(canvass,{
    type: 'pie',
    data: {
        labels: ['Monday', ],
        datasets: [
            {
                label: 'Sales',
                data: [150,],
                backgroundColor: ['blue'],
                hoverOffset: 45,
            },
            {
                label: 'Profit',
                data: [40,],
                backgroundColor: ['orange'],
                hoverOffset: 45,
                
            },
        ]
    }, 

});



