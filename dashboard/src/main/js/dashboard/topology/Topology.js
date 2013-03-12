/**
 * This file is the application's main JavaScript file. It is listed as a dependency in run.js and will automatically
 * load when run.js loads.
 *
 * Our first dependency is to the `dojo/has` module, which allows us to conditionally execute code based on
 * configuration settings or environmental information. Unlike a normal conditional, these branches can be compiled
 * away by the build system; see `staticHasFeatures` in noc.profile.js for more information.
 *
 * Our second dependency is to the special module `require`; this allows us to make additional require calls using
 * module IDs relative to this module within the body of the define callback.
 *
 * In all cases, whatever function is passed to define() is only invoked once, and the returned value is cached.
 *
 * More information about everything described about the loader throughout this file can be found at
 * <http://dojotoolkit.org/reference-guide/loader/amd.html>.
 *
 *  * More details also in Dashboard.js
 */
define([ 'dojo/has', 'require' ], function (has, require) {

    if (has('host-browser')) {

        require(['dashboard/logger/Logger',
            "dashboard/noc/TopologyAccordion", "dashboard/helper/Helper",
            'dojo/domReady!' ],

            function (Logger, TopologyAccordion, Helper) {
                Logger.initialize();

                var topoAccordion = new TopologyAccordion();
                Helper.createDomAndShowPage(topoAccordion);
            });
    }
    else {
        // Eventually, will actually have a useful server implementation here :)
        console.log('AppsOne JavaScript server side code (if and when it is developed) will go here!');
    }

});
