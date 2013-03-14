define(["dojo/_base/declare", "dojo/i18n", "dojo/i18n!dashboard/topology/nls/topology", "dojo/request/xhr", "dojo/keys", "dojo/on", "dijit/Dialog",
    "dashboard/topology/TopologyConstants", "dashboard/logger/Logger", "dashboard/helper/Helper"],

    function (declare, i18n, i18nString, xhr, keys, on, Dialog, TOPOLOGYCONSTANTS, Logger, Helper) {

        dashboard.classnames.TopologyUtility = "dashboard.topology.TopologyUtility";

        var TopologyUtility = declare(dashboard.classnames.TopologyUtility, null, {});

        TopologyUtility.JSON_HEADER = { 'Content-Type':'application/json' };

        TopologyUtility.xhrPostCentral = function (url, options) {
            xhr(url, {
                handleAs:"json",
                method:"POST",
                query:options,
                headers:TopologyUtility.JSON_HEADER
            }).then(function (data) {
                    // Do something with the handled data
                    TopologyUtility.manageView(data);
                }, function (err) {
                    // Handle the error condition
                    TopologyUtility.LOG.log(Logger.SEVERITY.SEVERE, "xhr error = " + err);
                }, function (evt) {
                    // Handle a progress event from the request if the
                    // browser supports XHR2
                    //TopologyUtility.LOG.log(Logger.SEVERITY.SEVERE, "xhr event = " + evt);
                });
        };

        TopologyUtility.manageView = function(input) {
            try {
                var data = Helper.parseInput(input);

                //TopologyUtility.addView(data);

                switch(data.type) {
                    case TOPOLOGYCONSTANTS.TYPE.TOPOLOGY:
                        TopologyUtility.manageTopologySubView(data, input);
                        break;
                    
                    default:
                        Logger.log("TopologyUtility","unknown data type = " + data.type);
                        break;
                }
            } catch ( e) {
                TopologyUtility.LOG.log(Logger.SEVERITY.SEVERE, "exception e = " + e);
            }
        };

        TopologyUtility.manageTopologySubView = function(data, input) {
            switch(data.subtype) {
                case TOPOLOGYCONSTANTS.SUBTYPE.TOPOLOGY.NODES:
                    require([TOPOLOGYCONSTANTS.getClassPath(dashboard.classnames.TopoWidgetRenderNodes)], function (TopoWidgetRenderNodes) {
                        new TopoWidgetRenderNodes().create(data, input);
                    });
                    break;

                case TOPOLOGYCONSTANTS.SUBTYPE.TOPOLOGY.CONNECTIVITY:
                    require([TOPOLOGYCONSTANTS.getClassPath(dashboard.classnames.TopoWidgetRenderConnectivity)], function (TopoWidgetRenderConnectivity) {
                        new TopoWidgetRenderConnectivity().create(data, input);
                    });
                    break;

                case TOPOLOGYCONSTANTS.SUBTYPE.TOPOLOGY.NODESTATUS:
                    require([TOPOLOGYCONSTANTS.getClassPath(dashboard.classnames.TopoWidgetNodeStatus)], function (TopoWidgetNodeStatus) {
                        new TopoWidgetNodeStatus().create(data, input);
                    });
                    break;

                case TOPOLOGYCONSTANTS.SUBTYPE.TOPOLOGY.CONNECTIONSTATUS:
                    require([TOPOLOGYCONSTANTS.getClassPath(dashboard.classnames.TopoWidgetConnectionStatus)], function (TopoWidgetConnectionStatus) {
                        new TopoWidgetConnectionStatus().create(data, input);
                    });
                    break;

                default:
                    Logger.log("TopologyUtility","unknown topology data sub type = " + data.subtype);
                    break;
            }
        };


        TopologyUtility.LOG = new Logger(dashboard.classnames.TopologyUtility);

        return TopologyUtility;
    });