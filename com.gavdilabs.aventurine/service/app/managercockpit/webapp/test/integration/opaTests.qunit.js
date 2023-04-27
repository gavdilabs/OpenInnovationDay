sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/gavdilabs/aventurine/managercockpit/test/integration/FirstJourney',
		'com/gavdilabs/aventurine/managercockpit/test/integration/pages/UserList',
		'com/gavdilabs/aventurine/managercockpit/test/integration/pages/UserObjectPage'
    ],
    function(JourneyRunner, opaJourney, UserList, UserObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/gavdilabs/aventurine/managercockpit') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheUserList: UserList,
					onTheUserObjectPage: UserObjectPage
                }
            },
            opaJourney.run
        );
    }
);