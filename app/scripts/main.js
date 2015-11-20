var keys = {};
var parameterOptions = [];

$(document).ready(function () {
    // Load dialog on click
    $('.main-wrapper .configure-button').click(function (e) {
        e.preventDefault();
        openPopup();
    });

    $('.popup .close-icon').click(function (e) {
        e.preventDefault();
        closePopup();
    });

    $("#addParameter").click(function (e) {
        addParameterOption();
    });

    $("#remove-all-parameter").click(function (e) {
        e.preventDefault();
        resetAllParameters();
    });

    $("#generateChart").click(function (e) {
        e.preventDefault();
        generateChart();
    });

    $('body').on('click', '.rmv-parameter', function (e) {
        removeParameterOption($(this))
    });

    DashboardConstants.setConstants();
    updateContent();
});

function updateContent() {
    if (parameterOptions.length > 0) {
        $("#main-notification h1").html(keys.reConfigureNotification);
        $("#sub-notification").html(keys.reConfigureNotificationMessage);
        $("#config-button").html(keys.reConfigureButton);
        $(".configuration").addClass(keys.reConfigureSuccessClass);
        $("#config-button").removeClass(keys.configureClass);
        $("#config-button").addClass(keys.reConfigureClass);
    } else {
        $("#main-notification h1").html(keys.configureError);
        $("#sub-notification").html(keys.configureErrorMessage)
        $("#config-button").html(keys.configureButton);
        $(".configuration").addClass(keys.configureErrorClass);
        $("#config-button").removeClass(keys.reConfigureClass);
        $("#config-button").addClass(keys.configureClass);
    }
}

function openPopup() {
    $(".popup").addClass('modalPopup');
    $(".modal-background").css('display', 'block');
    updateParametersCount();
}

function closePopup() {
    $(".popup").removeClass('modalPopup');
    $(".modal-background").css('display', 'none');
    updateContent();
}

function addParameterOption() {
    $("#chart-params").append(buildAndGetParameterOptionTemplate());
    updateAddParameterMessage();
    updateParametersCount();
}

function removeParameterOption(ele) {
    ele.parent().parent().remove();
    removeFromArray();
    updateAddParameterMessage();
    updateParametersCount();
}

function resetAllParameters() {
    $("#chart-params").html(' <p>No Parameters configured. Click on Add Parameter to add parameters to the chart.</p>');
    emptyArray();
    updateAddParameterMessage();
    updateParametersCount();
}

function removeFromArray() {
    if (getParameterOptionsLength() > 0) {
        parameterOptions.splice(0, 1)
    }
}

function emptyArray() {
    parameterOptions = [];
}

function getParameterOptionsLength() {
    return parameterOptions.length
}

function updateParametersCount() {
    $('.count').html(getParameterOptionsLength())
}

function updateAddParameterMessage() {
    getParameterOptionsLength() > 0 ? $("#chart-params p").css('display', 'none') : $("#chart-params p").css('display', 'block');
}

function buildAndGetParameterOptionTemplate() {
    var template = "";

    template += '<div class="parameters"><div class="params"><div class="config-panel">' +
        '<div class="name"><label>Parameter Name</label><input type="text" width="200" />' +
        '</div><div class="units"><label>Parameter Units</label><input type="text" width="50" /></div>' +
        '<div class="graph-type"><label>Graph Type</label>' +
        '<input type="radio" value="line" name="graphType' + (getParameterOptionsLength() + 1) + '" checked/> Line Graph' +
        '<input type="radio" value="column" name="graphType' + (getParameterOptionsLength() + 1) + '"/> column Graph</div></div>' +
        '<div class="config-panel"><div class="value"><label class="param-value">Parameter Value</label>' +
        '<textarea rows="3" cols="130"></textarea></div></div><div class="clear"></div><div class="rmv-parameter" title="remove">X</div></div>' +
        '<div class="clear"></div></div>';

    parameterOptions.push(template);

    return template;
}