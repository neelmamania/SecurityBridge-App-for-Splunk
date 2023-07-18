import logging
import json
import os
from splunk.clilib.bundle_paths import make_splunkhome_path
from splunk.persistconn.application import PersistentServerConnectionApplication

log_file_path = make_splunkhome_path(
    ['var', 'log', 'splunk', 'TA-SecurityBridge_certupload.log'])
new_file_path = make_splunkhome_path(
    ['etc', 'apps', 'TA-SecurityBridge', 'cert', 'cacert.pem'])


def log(level, message):
    with open(log_file_path, "a") as log_file:
        log_file.write(f"\n{level}: {message}")


class UploadCSRHandler(PersistentServerConnectionApplication):
    def __init__(self, command_line, command_arg):
        PersistentServerConnectionApplication.__init__(self)

    def handle(self, in_string):
        try:
            request_info = json.loads(in_string)
            req_payload = json.loads(request_info.get("payload", {}))
            file_content = req_payload.get("fileContent", "")
            with open(new_file_path, "w") as f:
                f.write(file_content)
            return {"payload": "File upload successful.", "status": 201}
        except Exception as e:
            log("ERROR", e)
            return {"payload": None, "status": 500}
