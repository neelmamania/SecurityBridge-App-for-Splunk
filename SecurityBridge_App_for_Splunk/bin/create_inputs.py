import splunk
import splunk.appserver.mrsparkle.lib.util as splunk_lib_util

def create_inputs(dic_path, index, host, sourcetype):

	inputs_conf = splunk_lib_util.make_splunkhome_path(["etc","apps","SecurityBridge_App_for_Splunk","local", "inputs.conf"])
	monitor = "[monitor://"+dic_path+"]"
	
	wr = open(inputs_conf, "w")
	wr.write(monitor+"\n")
	wr.write("index = "+index+"\n")
	wr.write("host = "+host+"\n")
	wr.write("sourcetype = "+sourcetype+"\n")
	wr.write("crcSalt=<SOURCE>")
	wr.close()