define(["dojo/_base/declare", "dojo/i18n", "dijit/TitlePane", "dojox/layout/GridContainer",
    "dijit/layout/TabContainer", "dijit/layout/ContentPane", "dijit/form/Button", "dijit/Toolbar",
    "noc/Logger",
    "dashboard/config/ConfigUtility", "dashboard/config/ConfigConstants", "dojo/i18n!dashboard/config/nls/config"],

    function (declare, i18n, TitlePane, GridContainer, TabContainer, ContentPane, Button, Toolbar,
              Logger, ConfigUtility, CONFIGCONSTANTS, i18nString) {

        var RenderAttributes = declare(CONFIGCONSTANTS.CLASSNAME.RENDERATTRIBUTES, null, {

            renderConfigParameters: function(data, pageObj) {
                console.log("renderConfigParameters data = " + dojo.toJson(data));

                var tc = this.createTabs();

                this.createTitlePaneGrid(pageObj.getAttrib(data), pageObj.getAttribIgnoreList());
                this.createToolbarButtons();

                // all the title panes have been rendered - now render the innards
                RenderAttributes.PAGEOBJ = pageObj;
                pageObj.renderAttributes(data);

                this.cleanupRendering(tc);
                dashboard.STANDBY.hide();
            },

            cleanupRendering: function(tc) {
                // make the tab buttons larger
                var innerPane = dojo.query(".dijitTabInner", tc.domNode);
                for (var i = 0; i < innerPane.length; i++) {
                    innerPane[i].style.width = 300;
                }

                // remove the boundary and padding of inner center pane
                dashboard.DashboardContainers.CpCenterInner.domNode.style.padding=0;
                dashboard.DashboardContainers.CpCenterInner.domNode.style.border=0;

                dashboard.DashboardContainers.CpTopInner.domNode.style.padding=0;
                dashboard.DashboardContainers.TopBc.resize();
            },

            createTabs: function() {
                dashboard.DashboardContainers.CpCenterInner.destroyDescendants(false);

                var tc = new TabContainer({style: "height: 100%; width: 100%;"});
                dashboard.DashboardContainers.CpCenterInner.addChild(tc);

                RenderAttributes.LOOKNFEELPANE = new ContentPane({title: "Look and Feel", style: "height: 100%; width: 100%;"});
                tc.addChild(RenderAttributes.LOOKNFEELPANE);

                RenderAttributes.DATAPANE = new ContentPane({title: "Data", style: "height: 100%; width: 100%;"});
                tc.addChild(RenderAttributes.DATAPANE);

                tc.startup();
                tc.resize();
                return tc;
            },

            createTitlePaneGrid: function(attribContainer, ignoreList) {
                var paneWidth = RenderAttributes.LOOKNFEELPANE.domNode.offsetWidth;
                var paneHeight = RenderAttributes.LOOKNFEELPANE.domNode.offsetHeight;
                var styleString = "width: " + paneWidth + "; height: " + paneHeight + ";";
                console.log("style string = " + styleString);

                var gridContainer = new GridContainer({nbZones:1, isAutoOrganized:true,
                    style:"width: 100%; height: 100%;"});
                RenderAttributes.LOOKNFEELPANE.addChild(gridContainer);
                gridContainer.disableDnd();

                for(var attribute in attribContainer) {
                    if(ignoreList[attribute]!=null) {
                        continue;
                    }
                    var titlePane = new TitlePane({
                        splitter:false,
                        style:"width:"+paneWidth,
                        content:this.getInnerDivString(attribute),
                        title:i18nString[attribute],
                        toggleable:true
                    });
                    gridContainer.addChild(titlePane, 0);
                    titlePane.toggle();
                }

                gridContainer.startup();
                gridContainer.resize();
            },

            getInnerDivString: function(attribute) {
                var divString = "<div class='tabbable tabs-left'>";
                divString += "<ul class='nav nav-tabs'>";
                for(var i=0;i<3;i++) {
                    switch(i) {
                        case 0: divString += "<li class='active'><a href='#" + attribute+CONFIGCONSTANTS.DIVTYPE.USER + "' data-toggle='tab'>User Config</a></li>";
                            break;
                        case 1: divString += "<li><a href='#" + attribute+CONFIGCONSTANTS.DIVTYPE.ADMIN + "' data-toggle='tab'>Admin Config</a></li>";
                            break;
                        case 2: divString += "<li><a href='#" + attribute+CONFIGCONSTANTS.DIVTYPE.FACTORY + "' data-toggle='tab'>Factory Config</a></li>";
                            break;
                    }
                }
                divString += "</ul>";
                divString += "<div class='tab-content'>";
                for(var i=0;i<3;i++) {
                    divString += "<div id='";
                    divString += attribute;
                    switch(i) {
                        case 0:
                            divString += CONFIGCONSTANTS.DIVTYPE.USER;
                            divString += "' class='tab-pane active'"; // this is coming from bootstrap
                            break;

                        case 1:
                            divString += CONFIGCONSTANTS.DIVTYPE.ADMIN;
                            divString += "' class='tab-pane fade'";
                            break;

                        case 2:
                            divString += CONFIGCONSTANTS.DIVTYPE.FACTORY;
                            divString += "' class='tab-pane fade'";
                            break;
                    }
                    //divString += " style='width: 100%; height: 100%;'";
                    divString += ">";
                    divString += "</div>";
                }
                divString += "</div>";
                return divString;
            },

            createToolbarButtons: function() {
                dashboard.DashboardContainers.CpTopInner.destroyDescendants(false);

                var toolbar = new Toolbar({});
                dashboard.DashboardContainers.CpTopInner.addChild(toolbar);

                var button = new Button({
                    showLabel: true,
                    label: "Save",
                    iconClass:'dijitEditorIcon dijitEditorIconSave',
                    onClick: function(){
                        RenderAttributes.PAGEOBJ.saveValues();
                    }
                });
                toolbar.addChild(button);
            }
        });

        RenderAttributes.LOG = Logger.addTimer(new Logger(CONFIGCONSTANTS.CLASSNAME.RENDERATTRIBUTES));

        RenderAttributes.LOOKNFEELPANE = null;
        RenderAttributes.DATAPANE = null;

        RenderAttributes.PAGEOBJ = null;

        return RenderAttributes;
    });