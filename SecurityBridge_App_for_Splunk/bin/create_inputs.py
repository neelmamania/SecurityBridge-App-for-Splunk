import splunk
import os
import splunk.appserver.mrsparkle.lib.util as splunk_lib_util

def create_monitor_input(dic_path,host,index,sourcetype):

	inputs_conf = splunk_lib_util.make_splunkhome_path(["etc","apps","SecurityBridge_App_for_Splunk","local", "inputs.conf"])
	monitor = "[monitor://"+dic_path+"]"

	if not os.path.exists(os.path.dirname(inputs_conf)):
		os.makedirs(os.path.dirname(inputs_conf))
	
	wr = open(inputs_conf, "w")
	wr.write(monitor+"\n")
	wr.write("index = "+index+"\n")
	wr.write("host = "+host+"\n")
	wr.write("sourcetype = "+sourcetype+"\n")
	wr.write("crcSalt=<SOURCE>")
	wr.close()

def create_api_input(incident_dict_host,interval,host,index,sourcetype):

	inputs_conf = splunk_lib_util.make_splunkhome_path(["etc","apps","SecurityBridge_App_for_Splunk","local", "inputs.conf"])

	if not os.path.exists(os.path.dirname(inputs_conf)):
		os.makedirs(os.path.dirname(inputs_conf))

	dashboard = splunk_lib_util.make_splunkhome_path(["etc","apps","SecurityBridge_App_for_Splunk","default","data","ui","views","event_analysis.xml"])

	wr = open(inputs_conf, "w")
	wr.write("[script://$SPLUNK_HOME/etc/apps/SecurityBridge_App_for_Splunk/bin/rest_api_input.py]\n")
	wr.write("index = "+index+"\n")
	wr.write("sourcetype = "+sourcetype+"\n")
	wr.write("interval = "+interval+"\n")
	wr.write("disabled = 0\n")
	if host!="":
		wr.write("host = "+host)
	wr.close()

	if incident_dict_host != "":
		rd = open(dashboard,"r")
		xml_lines = rd.readlines()
		rd.close()

		line_number = [i for i, s in enumerate(xml_lines) if "drilldown" in s][0]
		xml_lines[line_number] = "\n<option name=\"drilldown\">cell</option>\n<drilldown>\n<link target=\"_blank\">"+incident_dict_host+"/sap/bc/ui5_ui5/abex/sefwmd/#/events/details/$row.guid$</link>\n</drilldown>"

		wr = open(dashboard, "w")
		wr.writelines(xml_lines)
		wr.close()