define(['require', "dojo/_base/declare", "dojo/i18n", "dijit/TitlePane", "dojox/layout/GridContainer",
    "dojo/_base/lang",
    "dojo/i18n!dashboard/noc/nls/noc", "noc/timeSeries/OnlineTxTimeSeries", "noc/timeSeries/BatchTxTimeSeries",
    "noc/timeSeries/CompStaticTimeSeries", "dashboard/noc/NocConstants", "dashboard/noc/NocUtility", "dashboard/logger/Logger"],

    function (require, declare, i18n, TitlePane, GridContainer, lang, i18nString,
              OnlineTxTimeSeries, BatchTxTimeSeries, CompStaticTimeSeries, NOCCONSTANTS, NocUtility, Logger) {

        var TxTimeSeriesPage = declare(NOCCONSTANTS.CLASSNAME.PAGES.TXTIMESERIESPAGE, null, {

            loadPage:function () {

                TxTimeSeriesPage.LOG.log(Logger.SEVERITY.SEVERE, "in component load page");

                TxTimeSeriesPage.CP = noc.PageLoader.CpCenter[3];

                var paneWidth = TxTimeSeriesPage.CP.w;
                var paneHeight = TxTimeSeriesPage.CP.h/3;
                var styleString = "width: " + paneWidth + "; height: " + paneHeight + ";";

                var onlineTxTS = "onlineTxTS", batchTxTS = "batchTxTS", compStaticTS = "compStaticTS";

                var cpane1 = new TitlePane({ title:"Online Tx Time Series",
                    content: "<div id='"+onlineTxTS+"' style='width:100%;height:100%;'></div>",
                    style: styleString, "class": "soria", toggleable: false});
                var cpane2 = new TitlePane({ title:"Batch Tx Time Series",
                    content: "<div id='"+batchTxTS+"' style='width:100%;height:100%;'></div>",
                    style: styleString, "class": "soria", toggleable: false});
                var cpane3 = new TitlePane({ title:"Components (static threshold) Time Series",
                    content: "<div id='"+compStaticTS+"' style='width:100%;height:100%;'></div>",
                    style: styleString, "class": "soria", toggleable: false});

                var gridContainer = new GridContainer({nbZones: 1, isAutoOrganized: true,
                    style: "width: 100%; height: 100%;", "class": "soria"});
                TxTimeSeriesPage.CP.addChild(gridContainer);
                gridContainer.disableDnd();

                gridContainer.addChild(cpane1);
                gridContainer.addChild(cpane2);
                gridContainer.addChild(cpane3);

                gridContainer.startup();
                gridContainer.resize();

                this.createSeries(1, onlineTxTS, paneWidth - 100, paneHeight - 60, cpane1);
                this.createSeries(3, compStaticTS, paneWidth - 100, paneHeight - 60, cpane3);
            },

            createSeries: function(type, id, width, height, cpane) {
                var xpos = cpane.domNode.offsetLeft + 40, ypos = 0;
                TxTimeSeriesPage.LOG.log(Logger.SEVERITY.SEVERE, "xpos = " + xpos + " ypos = " + ypos);

                switch(type) {
                    case 1:
                        var ots = new OnlineTxTimeSeries();
                        ots.createTimeSeries("./data/timeSeries/onlineTxTimeSeries.json", id, width, height, xpos, ypos);
                        break;

                    case 2:
                        var bts = new BatchTxTimeSeries();
                        bts.createTimeSeries("./data/timeSeries/batchTxTimeSeries.json", id, width, height, xpos, ypos);
                        break;

                    case 3:
                        var cts = new CompStaticTimeSeries();
                        cts.createTimeSeries("./data/timeSeries/compStaticTimeSeries.json", id, width, height, xpos, ypos);
                        break;

                    default:
                        TxTimeSeriesPage.LOG.log(Logger.SEVERITY.SEVERE, "unhandled type of time series");
                        return;
                }
            }

        });

        // static variables of this class
        TxTimeSeriesPage.LOG = Logger.addTimer(new Logger(NOCCONSTANTS.CLASSNAME.PAGES.TXTIMESERIESPAGE));

        TxTimeSeriesPage.CP = null;

        return TxTimeSeriesPage;
    });