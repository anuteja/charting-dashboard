/**
 * Created by Anuteja on 9/26/2015.
 */
var graphTypeCollator = {};
var availableGraphTypes = [];
var parametersArray = [];
var categories = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
var chartConfigObj = {};
var graphUnitsCollator = {};

function getNewParameterInstance() {
    return {
        type: '',
        units: '',
        values: '',
        name: ''
    };
}

function generateChart() {
    createParameterObjectsArray();
    collateArrayByGraphType();
    collateArrayByUnits();
    closePopup();
    buildChartConfigurationObject();
    generateGraph();
}


function collateArrayByGraphType() {
    availableGraphTypes = _.union(_.pluck(parametersArray, 'type'));
    graphTypeCollator = {};
    for (var i in availableGraphTypes) {
        graphTypeCollator[availableGraphTypes[i]] = _.where(parametersArray, {type: availableGraphTypes[i]});
    }
}

function collateArrayByUnits() {
    var availableGraphTypes = _.union(_.pluck(parametersArray, 'units'));
    graphUnitsCollator = {};
    for (var i in availableGraphTypes) {
        graphUnitsCollator[availableGraphTypes[i]] = _.where(parametersArray, {units: availableGraphTypes[i]});
    }
}

function createParameterObjectsArray() {
  parametersArray = [];
    $("#chart-params").find('.parameters').each(function(){
        parametersArray.push(fillParameterObject($(this)));
    });
}


function fillParameterObject(elem) {
    var paramObj = getNewParameterInstance();
    addNameToParameterObject(paramObj, elem);
    addUnitsToParameterObject(paramObj, elem);
    addValuesToParameterObject(paramObj, elem);
    addTypeToParameterObject(paramObj, elem);
    return paramObj;
}

function addNameToParameterObject(paramObj, ele) {
    var nameElem = ele.find('.name')[0];
    paramObj.name = $(nameElem).find('input').val();
}

function addUnitsToParameterObject(paramObj, ele) {
    var unitsElem = ele.find('.units')[0];
    paramObj.units = $(unitsElem).find('input').val();

}

function addValuesToParameterObject(paramObj, ele) {
    var valuesElem = ele.find('.value')[0];
    var values = $(valuesElem).find('textarea').val()
    paramObj.values = formatValuesArray(values.split(','));
}

function addTypeToParameterObject(paramObj, ele) {
    var valuesElem = ele.find('.graph-type')[0];
    paramObj.type = $(valuesElem).find('input:checked').val();
}

function formatValuesArray(valArray) {
    var temp = [];
    for (var val in valArray) {
        if (valArray[val] != "") {
            temp.push(parseFloat(valArray[val]));
        }
    }
    return temp;
}


function getChartTitle(){
    return $("#chart-title").val();
}

function buildChartConfigurationObject() {
    chartConfigObj.chartTitle = getChartTitle();
    chartConfigObj.categories = categories;
    chartConfigObj.axisData = generateAxisData();
    chartConfigObj.seriesData = generateSeriesDataByType();
}


function generateGraph() {
    $('#graphCanvas').highcharts({
        chart: {
            zoomType: 'x'
        },
        title: {
            text: chartConfigObj.chartTitle
        },
        xAxis: [
            {
                categories: chartConfigObj.categories
            }
        ],
        yAxis: chartConfigObj.axisData,
        tooltip: {
            shared: true
        },
        exporting: {
            sourceWidth: 2000,
            sourceHeight: 600,
            // scale: 2 (default)
            chartOptions: {
                subtitle: null
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'bottom',
            x: 400,
            y: 10,
            floating: false,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: chartConfigObj.seriesData
    });
}

function generateSeriesDataByType() {
    var seriesData = [];
    var count = 1;
    for (var type in graphTypeCollator) {
        for (var i in  graphTypeCollator[type]) {
            var temp = {};
            temp.name = graphTypeCollator[type][i].name;
            temp.type = graphTypeCollator[type][i].type;
            temp.data = graphTypeCollator[type][i].values;
            temp.labels = {align: 'right', style: {font: 'normal 18px Verdana, sans-serif', color: 'black'}}
            if (parametersArray.length != count) {
                temp.yAxis = count;
            }
            temp.tooltip = {valueSuffix: graphTypeCollator[type][i].units};
            seriesData.push(temp);
            count++;
        }
    }
    return seriesData;
}

function generateAxisData() {
    var axisData = [];
    for (var i in parametersArray) {

        var temp = {};
        temp.labels ={style: {color: 'red'}};
        temp.title = {text: parametersArray[i].name};
        if (i % 2 === 0) {
            temp.opposite = true;
        }
        axisData.push(temp);
    }
    return axisData;
}
