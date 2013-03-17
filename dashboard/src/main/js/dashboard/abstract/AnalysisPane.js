define(["dojo/_base/declare", "dojo/i18n", "dojo/i18n!dashboard/nls/dashboard", "dashboard/logger/Logger",
    "dashboard/abstract/AbstractView"],

    function (declare, i18n, i18nString, Logger, AbstractView) {

        dashboard.classnames.AnalysisPane = "dashboard.abstract.AnalysisPane";

        var AnalysisPane = declare(dashboard.classnames.AnalysisPane, AbstractView, {

            "-chains-":{
                launch:"before" //method is called before calling its superclass method
            },

            tabList: [],

            launch: function() {

                dojo.style(dashboard.dom.CpCenterInnerBottom.domNode, "display", "block");
                dojo.style(dashboard.dom.CpCenterInnerBottom.domNode, "height",
                    (dashboard.dom.CpCenterInner[dashboard.pageTypes.dashboard].h/2)+"px");
                dashboard.dom.InnerBcSplit.resize();

                dashboard.dom.AnalysisPaneTC.destroyDescendants(false);

                for(var i=0; i<this.tabList.length; i++) {
                    dashboard.dom.AnalysisPaneTC.addChild(this.tabList[i]);
                }
                dashboard.dom.AnalysisPaneTC.startup();

                for(var i=0; i<this.tabList.length; i++) {
                    this.createInnerMenuAndPanes(this.tabList[i].domNode, true, this.tabList[i].title);
                    this.tabList[i].createHeading();
                    this.tabList[i].createMenuButtons();
                }

            }
        });

        AnalysisPane.LOG = Logger.addTimer(new Logger(dashboard.classnames.AnalysisPane));

        return AnalysisPane;
    });