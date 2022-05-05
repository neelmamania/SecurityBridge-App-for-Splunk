require([
    'underscore',
    'backbone',
    '../app/SecurityBridge_App_for_Splunk/components/ModalView',
    'splunkjs/mvc',
    'splunkjs/mvc/searchmanager',
    'splunkjs/mvc/simplexml/ready!'
], function(_, Backbone, ModalView, mvc, SearchManager) {

    var master = mvc.Components.get('table1');
    //console.log("Hello from Table Popup")
    api_url = ""
    var search = new SearchManager({
        id: "security_bridge_search_id",
	    search: "| rest /services/configs/conf-securitybridge_setup splunk_server=local | table api_url"
    });
    var results = search.data("results");
    results.on("data", function () {
        resultArray = results.data().rows;
        $.each(resultArray, function (index, value) {
            api_url_temp=value
        });

        if(api_url_temp[0].charAt(api_url_temp[0].length - 1)!="/"){
            api_url = api_url_temp[0].concat("/") 
        }else{
            api_url=api_url_temp[0];
        }
        console.log(api_url)
        master.on("click", function(e){
            e.preventDefault();

            var user_id = e.data['row.User'];
            //console.log(user_id);
            var guid = e.data['row.guid'];
            //console.log(guid);
            switch (e.field){
                case "Severity":
                    var alert_details = api_url+"sap/bc/ui5_ui5/abex/sefwmd/#/events/details/"+guid;
                    var tab = window.open(alert_details, "_blank");
                    tab.focus();
                    break;

                case "Listener":
                    var alert_details = api_url+"sap/bc/ui5_ui5/abex/sefwmd/#/events/details/"+guid;
                    var tab = window.open(alert_details, "_blank");
                    tab.focus();
                    break;

                case "Action":
                    var alert_details = api_url+"sap/bc/ui5_ui5/abex/sefwmd/#/events/details/"+guid;
                    var tab = window.open(alert_details, "_blank");
                    tab.focus();
                    break;

                case "User":
                    var alert_details = api_url+"sap/bc/ui5_ui5/abex/sefwmd/#/events/details/"+guid;
                    var tab = window.open(alert_details, "_blank");
                    tab.focus();
                    break;

                case "SID":
                    var alert_details = api_url+"sap/bc/ui5_ui5/abex/sefwmd/#/events/details/"+guid;
                    var tab = window.open(alert_details, "_blank");
                    tab.focus();
                    break;

                case "SAP Client":
                    var alert_details = api_url+"sap/bc/ui5_ui5/abex/sefwmd/#/events/details/"+guid;
                    var tab = window.open(alert_details, "_blank");
                    tab.focus();
                    break;

                case "Message":
                    var alert_details = api_url+"sap/bc/ui5_ui5/abex/sefwmd/#/events/details/"+guid;
                    var tab = window.open(alert_details, "_blank");
                    tab.focus();
                    break;

                case "Terminal":
                    var alert_details = api_url+"sap/bc/ui5_ui5/abex/sefwmd/#/events/details/"+guid;
                    var tab = window.open(alert_details, "_blank");
                    tab.focus();
                    break;

                case "Multiple_Logins":
                    var user_id = e.data['row.User'];
                    console.log("Hello from Table Popup");
                    console.log(user_id);
                    var detailSearch = new SearchManager({
                        id: Math.random(),
                        earliest_time: "-30d@d",
                        latest_time: "now",
                        preview: true,
                        cache: false,
                        search: "`sapsb` sourcetype=sapsb* duid="+user_id+" | eval src=if(src=\"\",\"<unknown>\",\'src\') | stats max(_time) as _time by src | sort - _time"}, {tokens: true, tokenNamespace: "submitted"});
                    var modal = new ModalView({ title: user_id,  search: detailSearch });
                    modal.show();
                    break;
            }
        });
    });

    
});
