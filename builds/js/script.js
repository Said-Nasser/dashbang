// dropdown toggle
document
    .querySelector(".top-header button.dropdown-toggle")
    .addEventListener("click", function (e) {
        document
            .querySelector(".top-header .dropdown-menu")
            .classList.toggle("show");
    });

// Apply chart themes
am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_kelly);
// define chart
let chart = {}
function drawChart1(id) {

    chart = am4core.create(id, am4charts.XYChart3D)
    chart.data = [{
        "country": "Lithuania",
        "litres": 501.9,
        "units": 250
    }, {
        "country": "Czech Republic",
        "litres": 301.9,
        "units": 222
    }, {
        "country": "Ireland",
        "litres": 201.1,
        "units": 170
    }, {
        "country": "Germany",
        "litres": 165.8,
        "units": 122
    }, {
        "country": "Australia",
        "litres": 139.9,
        "units": 99
    }, {
        "country": "Austria",
        "litres": 128.3,
        "units": 85
    }, {
        "country": "UK",
        "litres": 99,
        "units": 93
    }, {
        "country": "Belgium",
        "litres": 60,
        "units": 50
    }, {
        "country": "The Netherlands",
        "litres": 50,
        "units": 42
    }];
    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.title.text = "Countries";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Litres sold (M)";

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries3D());
    series.dataFields.valueY = "litres";
    series.dataFields.categoryX = "country";
    series.name = "Sales";
    series.tooltipText = "{name}: [bold]{valueY}[/]";

    let series2 = chart.series.push(new am4charts.ColumnSeries3D());
    series2.dataFields.valueY = "units";
    series2.dataFields.categoryX = "country";
    series2.name = "Units";
    series2.tooltipText = "{name}: [bold]{valueY}[/]";

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
};

function drawChart2(id) {
    chart = am4core.create(id, am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.paddingRight = 20;

    let data = [];
    let open = 100;
    let close = 250;

    for (let i = 1; i < 120; i++) {
        open += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 4);
        close = Math.round(open + Math.random() * 5 + i / 5 - (Math.random() < 0.5 ? 1 : -1) * Math.random() * 2);
        data.push({ date: new Date(2018, 0, i), open: open, close: close });
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.openValueY = "open";
    series.dataFields.valueY = "close";
    series.tooltipText = "open: {openValueY.value} close: {valueY.value}";
    series.sequencedInterpolation = true;
    series.fillOpacity = 0.3;
    series.defaultState.transitionDuration = 1000;
    series.tensionX = 0.8;

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.dateX = "date";
    series2.dataFields.valueY = "open";
    series2.sequencedInterpolation = true;
    series2.defaultState.transitionDuration = 1500;
    series2.stroke = chart.colors.getIndex(6);
    series2.tensionX = 0.8;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.scrollbarX = new am4core.Scrollbar();
}

function drawChart3(id) {
    chart = am4core.create(id, am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
        {
            country: "Lithuania",
            litres: 501.9
        },
        {
            country: "Czech Republic",
            litres: 301.9
        },
        {
            country: "Ireland",
            litres: 201.1
        },
        {
            country: "Germany",
            litres: 165.8
        },
        {
            country: "Australia",
            litres: 139.9
        },
        {
            country: "Austria",
            litres: 128.3
        }
    ];

    chart.innerRadius = am4core.percent(40);
    chart.depth = 120;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "litres";
    series.dataFields.depthValue = "litres";
    series.dataFields.category = "country";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 3;

}

document.querySelector('#chart1').drawFn = drawChart1
document.querySelector('#chart2').drawFn = drawChart2
document.querySelector('#chart3').drawFn = drawChart3


drawChart1('chart1');
drawChart2('chart2');
drawChart3('chart3');

// drag and drop
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    let id = ev.dataTransfer.getData("text");
    ev.target.innerHTML = "";
    if (ev.target.classList.contains("widget")) {
        document.getElementById(id).style.width = `${
            document.querySelector(".left").getBoundingClientRect().width - 32
            }px`;
        document.getElementById(id).style.height = "140px";
    }
    if (document.querySelector('#runningChart') !== null && document.querySelector('#runningChart') !== 'undefined') {
        chart.dispose()
        chart = {}
    } else {
        let runningChart = document.createElement('div')
        runningChart.id = 'runningChart'
        document.querySelector('#slot-content').innerHTML = ''
        document.querySelector('#slot-content').appendChild(runningChart)
        runningChart.style.left = `${ev.target.getBoundingClientRect().width - 2}px`;
        runningChart.style.height = `${ev.target.getBoundingClientRect().height}px`;
    }
    document.getElementById(id).drawFn('runningChart')
}

// resize charts
function resize(id) {
    [
        {
            id: "chart1",
            chart: chart1,
        },
        {
            id: "chart2",
            chart: chart2,
        },
        {
            id: "chart3",
            chart: chart3,
        },
    ].map((item) => {
        if (item.id === id) {
            item.chart.resize();
        }
    });
}

// resize slots
// ResizeObserver is used to detect the resize event on HTML elements, like onresize event for the window
const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
        document.querySelector('#resize').style.left = `${(entry.contentRect.width / 2) - 10}px`

        if (document.querySelector('#runningChart') !== null && document.querySelector('#runningChart') !== 'undefined') {
            document.querySelector('#runningChart').style.width = `${entry.contentRect.width - 2}px`;
            document.querySelector('#runningChart').style.height = `${entry.contentRect.height}px`;
        }
        if (
            entry.target.querySelector(".chart") !== null &&
            entry.target.querySelector(".chart") !== "undefined"
        ) {
            entry.target.querySelector(
                ".chart"
            ).style.width = `${entry.contentRect.width}px`;
            entry.target.querySelector(
                ".chart"
            ).style.height = `${entry.contentRect.height}px`;
        }
    }
});

// handle drag events
document.querySelectorAll(".widget .chart").forEach((chart) => {
    chart.addEventListener("dragstart", drag);
});
document.querySelectorAll(".slots .slot-content").forEach((slot) => {
    slot.addEventListener("dragover", allowDrop);
    slot.addEventListener("drop", drop);
    resizeObserver.observe(slot);
});

/* -------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------- */
//Make the DIV element draggagle:
dragElement(document.getElementById("resize"));

function dragElement(elmnt) {
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById('resize')) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById('resize').onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        console.log('EVENT: ', e)
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.parentElement.style.top = elmnt.parentElement.offsetTop - pos2 + "px";
        elmnt.parentElement.style.left = elmnt.parentElement.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
