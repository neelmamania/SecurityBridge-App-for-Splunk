import shutil
from splunk.clilib.bundle_paths import make_splunkhome_path

SOURCE_FILE_PATH = make_splunkhome_path(
    ['etc', 'apps', 'TA-SecurityBridge', 'cert', 'cacert.pem'])
DESTINATION_FILE_PATH = make_splunkhome_path(
    ['etc', 'apps', 'TA-SecurityBridge', 'bin', 'ta_securitybridge','aob_py3','certifi', 'cacert.pem'])

try:
    shutil.copyfile(SOURCE_FILE_PATH, DESTINATION_FILE_PATH)
    print(f"Coppied {SOURCE_FILE_PATH} to {DESTINATION_FILE_PATH}.")
except Exception as e:
    print(f"Failed to copy {SOURCE_FILE_PATH} to {DESTINATION_FILE_PATH}.")
