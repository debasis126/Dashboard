define(['require', "dojo/_base/declare", "dojo/i18n", "dijit/TitlePane", "dojox/layout/GridContainer",
    "dijit/layout/ContentPane",
    "dojo/i18n!dashboard/noc/nls/noc", "dashboard/noc/NocUtility", "dashboard/noc/NocConstants", "dashboard/logger/Logger"],

    function (require, declare, i18n, TitlePane, GridContainer, ContentPane, i18nString, NocUtility, NOCCONSTANTS, Logger) {

        var TopologyPage = declare(NOCCONSTANTS.CLASSNAME.PAGES.TOPOLOGYPAGE, null, {

            loadPage:function (pageNumber, pageName) {
                TopologyPage.CP = noc.PageLoader.CpCenter[pageNumber];
                TopologyPage.CP.domNode.style.border=0;

                var paneWidth = TopologyPage.CP.w;
                var paneHeight = TopologyPage.CP.h;
                var styleString = "width: " + paneWidth + "; height: " + paneHeight + ";"

                TopologyPage.TitlePane = new ContentPane({
                    region:"center",
                    splitter:false,
                    style:styleString
                });

                var gridContainer = new GridContainer({nbZones:1, isAutoOrganized:true,
                    style:"width: 100%; height: 100%;"});
                TopologyPage.CP.addChild(gridContainer);
                gridContainer.disableDnd();

                gridContainer.addChild(TopologyPage.TitlePane, 0);
                gridContainer.startup();
                gridContainer.resize();

                var innerPane = dojo.query(".dijitContentPane", gridContainer.domNode);
                //console.log("inner len = " + innerPane.length);
                for (var i = 0; i < innerPane.length; i++) {
                    innerPane[i].style.padding = 0;
                }

                var xpos = 0, ypos = 0;
                var viewMeta = {
                    id:pageName,
                    name:pageName,
                    type:NOCCONSTANTS.TYPE.TOPOLOGY,
                    subtype:NOCCONSTANTS.SUBTYPE.TOPOLOGY.NODES,
                    dimensions:[paneWidth, paneHeight],
                    position:[xpos, ypos],
                    custom:[]
                };

                NocUtility.xhrPostCentral(NOCCONSTANTS.ACTION.TOPOLOGY.NODES, viewMeta);

            }
        });

        // static variables of this class
        TopologyPage.LOG = Logger.addTimer(new Logger(NOCCONSTANTS.CLASSNAME.PAGES.TOPOLOGYPAGE));

        TopologyPage.CP = null;
        TopologyPage.TitlePane = null;

        return TopologyPage;
    });