define(["dojo/_base/declare", "dojo/i18n", "dojo/i18n!noc/nls/noc", 'dgrid/Grid', "noc/Logger", "noc/Constants", "noc/Utility"],

    function (declare, i18n, i18nString, Grid, Logger, CONSTANTS, Utility) {

        var ApplicationGrid = declare(CONSTANTS.CLASSNAME.WIDGETS.INCIDENT.APPLICATIONGRID, null, {

            create: function(data, input) {

                var columnMeta = [{
                    field: "appName",
                    label: "Application Name"
                }];

                var metrics = input.applicationVO.metrics;
                for(var i=0;i<metrics.length;i++) {
                    var col = {};
                    col.field = metrics[i];
                    columnMeta.push(col);
                }

                // create blank grid
                var gridata = [];
                for(var i=0;i<input.applicationVO.applications.length;i++) {
                    var row = {};
                    var apps = input.applicationVO.applications;
                    row.appName = apps[i].name;
                    for(var j=0;j<metrics.length;j++) {
                        row[metrics[j]] = "";
                    }
                    gridata.push(row);
                }
                var grid = new Grid({columns: columnMeta}, data.name);
                grid.renderArray(gridata);

                var textNode = dojo.query(".dgrid-cell", grid.domNode);
                console.log("count of dgrid cells = " + textNode.length);
                for (var i = 0; i < textNode.length; i++) {
                    textNode[i].style.fontSize = "12px";
                }


                // assign ids to nodes
                for(var i=0;i<input.applicationVO.applications.length;i++) {
                    var apps = input.applicationVO.applications;
                    for(var j=0;j<metrics.length;j++) {
                        dojo.query("#IncidentGrid-row-" + i + " td.field-"+metrics[j]).forEach(function (node) {
                            node.id = apps[i].name + "_" + apps[i].id + "_" + metrics[j];
                        });
                    }
                }

                ApplicationGrid.POSTSET.type = CONSTANTS.TYPE.INCIDENT;
                ApplicationGrid.POSTSET.subtype = CONSTANTS.SUBTYPE.INCIDENT.DATA;
                ApplicationGrid.POSTSET.metricsJson = dojo.toJson(metrics);
                ApplicationGrid.POSTSET.dataset = [];

                for(var i=0;i<input.applicationVO.applications.length;i++) {
                    var apps = input.applicationVO.applications;
                    var datum = {};
                    datum.id = apps[i].id;
                    datum.name = apps[i].name;
                    ApplicationGrid.POSTSET.dataset.push(datum);
                }

                var period = 1;
                for (var i = 0; i < ApplicationGrid.POSTSET.dataset.length; i++) {
                    // first one launches after one second
                    // 2nd one at 4 sec, 3rd one at 7 sec and so on till --> 1 + (3*20) = 61 seconds
                    var timer = setTimeout(this.periodicApp, period * 1000);
                    period += ApplicationGrid.APP_STAGGER_PERIOD;
                    ApplicationGrid.TIMERS.push(timer);
                }

                // do the first time population immediately
                for(var i=0;i < ApplicationGrid.POSTSET.dataset.length; i++) {
                    this.periodicAppPost();
                }
            },

            periodicApp:function () {
                var timer = setInterval(noc.Widgets.Incident.ApplicationGrid.prototype.periodicAppPost,
                    ApplicationGrid.POSTSET.dataset.length * ApplicationGrid.APP_STAGGER_PERIOD * 1000);
                ApplicationGrid.TIMERS.push(timer);
            },

            periodicAppPost: function() {
                var appDataSet = ApplicationGrid.POSTSET.dataset[ApplicationGrid.APP_COUNTER];

                console.log("querying for app = " + appDataSet.name);

                var viewMeta = {
                    id:appDataSet.id,
                    name:appDataSet.name,
                    type:CONSTANTS.TYPE.INCIDENT,
                    subtype:CONSTANTS.SUBTYPE.INCIDENT.DATA,
                    dimensions:[0, 0],
                    position:[0, 0],
                    custom:[ApplicationGrid.POSTSET.metricsJson]
                };
                Utility.xhrPostCentral(CONSTANTS.ACTION.INCIDENT.APPLICATIONDATA, viewMeta);

                ApplicationGrid.APP_COUNTER++;
                if(ApplicationGrid.APP_COUNTER > (ApplicationGrid.POSTSET.dataset.length-1)){
                    ApplicationGrid.APP_COUNTER = 0;
                }
            }

        });

        ApplicationGrid.LOG = Logger.addTimer(new Logger(CONSTANTS.CLASSNAME.WIDGETS.INCIDENT.APPLICATIONGRID));

        ApplicationGrid.POSTSET = {};
        ApplicationGrid.APP_COUNTER = 0;
        ApplicationGrid.APP_STAGGER_PERIOD = 3;

        ApplicationGrid.TIMERS = [];

        return ApplicationGrid;
    });