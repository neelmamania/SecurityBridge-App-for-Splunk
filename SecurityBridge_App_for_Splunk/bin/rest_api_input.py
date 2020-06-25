import requests
import splunk
import splunk.appserver.mrsparkle.lib.util as splunk_lib_util

if __name__ == '__main__':

	setup_conf = splunk_lib_util.make_splunkhome_path(["etc","apps","SecurityBridge_App_for_Splunk","local", "user_input_setup.conf"])

	f_read = open(setup_conf, "r")
	api_details = f_read.readlines()
	f_read.close()

	#querystring = {"$format":"json"}#, "$filter":"qFrom eq datetime'2010-07-05T16:07:00' and qTo eq datetime'2018-07-05T17:57:00'"}

	line_number = [i for i, s in enumerate(api_details) if s.startswith("rest_api =")][0]
	rest_api = api_details[line_number].replace("rest_api = ","").strip()
	print (rest_api)

	line_number = [i for i, s in enumerate(api_details) if s.startswith("username =")][0]
	username = api_details[line_number].split("=")[1].strip()
	print (username)

	line_number = [i for i, s in enumerate(api_details) if s.startswith("password =")][0]
	password = api_details[line_number].replace("password = ","").strip()
	print (password)

	response = requests.request("GET",rest_api, params={}, auth=(username, password))
	print (response.text)