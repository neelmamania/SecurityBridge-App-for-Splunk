import splunk
import splunk.admin as admin
import splunk.entity as en
import create_inputs as inputs_conf
import os
import splunk.appserver.mrsparkle.lib.util as splunk_lib_util

class ConfigApp(admin.MConfigHandler):
    
    def setup(self):
        if self.requestedAction == admin.ACTION_EDIT:
            for arg in ['monitor_directory_path', 'index', 'host', 'sourcetype']:
                self.supportedArgs.addOptArg(arg)
    
    def handleList(self, confInfo):
        confDict = self.readConf("user_input_setup")
        if confDict is not None:
            for stanza, settings in confDict.items():
                for key, val in settings.items():
                    confInfo[stanza].append(key, val)
    
    def handleEdit(self, confInfo):
        args = self.callerArgs.data
        for key, val in args.items():
            if val[0] is None:
                val[0] = ''
        
        monitor_dict_path = args['monitor_directory_path'][0]
        index = args['index'][0]
        host = args['host'][0]
        sourcetype = args['sourcetype'][0]
        
        inputs_conf.create_inputs(monitor_dict_path, host, index, sourcetype)
        
        self.writeConf('user_input_setup', 'input_configuration', self.callerArgs.data)
        
        splunk.rest.simpleRequest("/services/apps/local/_reload", self.getSessionKey(), postargs=None, method='POST', timeout=180)
        
# intialize the handler
admin.init(ConfigApp, admin.CONTEXT_NONE)