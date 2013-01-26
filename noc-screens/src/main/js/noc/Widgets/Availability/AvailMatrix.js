define(['require', "dojo/_base/declare", "dojo/i18n",
    "dojo/i18n!noc/nls/noc", "noc/Constants"],

    function (require, declare, i18n, i18nString, CONSTANTS) {

        var AvailMatrix = declare("noc.Components.Availability.AvailMatrix", null, {

            create:function (input, payload) {
                console.log("in create avail matrix gridtype = " + input.subtype);
                try {
                    var data = new Array();
                    var gridItemWidth = parseInt(input.custom[0]);
                    var gridItemHeight = gridItemWidth; // for square boxes

                    var length = payload.times.length;
                    var sub = payload.times;

                    var xpos = 0;
                    for (var i = 0; i < length; i++) {
                        xpos += gridItemWidth;
                        data[i] = new Array();
                        var columnSet;
                        switch (input.subtype) {
                            case CONSTANTS.SUBTYPE.AVAILABILITY.COMPONENT:
                                columnSet = sub[i].cluster;
                                break;

                            case CONSTANTS.SUBTYPE.AVAILABILITY.CLUSTER:
                                columnSet = sub[i].instances;
                                break;

                            case CONSTANTS.SUBTYPE.AVAILABILITY.INSTANCE:
                                columnSet = sub[i].kpi;
                                break;
                        }


                        for (var j = 0; j < columnSet.length; j++) {
                            data[i][j] = {
                                name:columnSet[j].name,
                                value:columnSet[j].value,
                                width:gridItemWidth,
                                height:gridItemHeight,
                                x:input.position.xpos,
                                y:input.position.ypos
                            };
                            xpos += gridItemWidth;
                        }
                    }
                    this.renderGrid(data, input.name, input.dimensions.width, input.dimensions.height);
                } catch (e) {
                    console.log("exception " + e);
                }
            },

            renderGrid:function (data, id, width, height) {
                //console.log(data);

                var grid = d3.select("#" + id).append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("class", "chart");

                var row = grid.selectAll(".row")
                    .data(data)
                    .enter().append("svg:g")
                    .attr("class", "row");

                var color = d3.scale.category20c();

                var col = row.selectAll(".cell")
                    .data(function (d) {
                        return d;
                    })
                    .enter().append("svg:rect")
                    .attr("class", "cell")
                    .attr("x", function (d) {
                        return d.x;
                    })
                    .attr("y", function (d) {
                        return d.y;
                    })
                    .attr("width", function (d) {
                        return d.width;
                    })
                    .attr("height", function (d) {
                        return d.height;
                    })
                    .style("fill", function (d) {
                        return color(d.value);
                    })
                    .style("stroke", '#555');
            }
        });

        return AvailMatrix;

    });