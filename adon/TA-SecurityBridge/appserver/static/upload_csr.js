let fileContent;

const SPLUNKD_PATH = Splunk.util.make_full_url(
  "/splunkd/__raw/services/data/TA-SecurityBridge/upload_csr"
);

$("#import-csr-input").change((event) => {
  const files = event.target.files;

  const fileReader = new FileReader();

  fileReader.onload = (event) => {
    fileContent = event.target.result;
  };

  if (files.length > 0) {
    fileReader.readAsText(files[0]);
  }
});

$("#upload").click(async () => {
  try {
    if (!fileContent) {
      $("#message").html("Please select a file to upload.");
      $("#message").css("color", "red");
      return;
    }

    const res = await fetch(SPLUNKD_PATH, {
      method: "POST",
      body: JSON.stringify({ fileContent }),
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "X-Splunk-Form-Key": getFormKey(),
      },
    });

    if (res.status !== 201) {
      throw "Something went wrong.";
    }

    $("#message").html("Successfully uploaded file.");
    $("#message").css("color", "green");
  } catch (err) {
    console.error(err);
    $("#message").html("Failed to upload file.");
    $("#message").css("color", "red");
  }
});

function getFormKey() {
  const prefix = `splunkweb_csrf_token_${window.$C.MRSPARKLE_PORT_NUMBER}=`;
  if (document.cookie) {
    for (const chunk of document.cookie.split(/;\s*/)) {
      const cookie = String(chunk).trim();
      if (cookie.startsWith(prefix)) {
        return decodeURIComponent(cookie.slice(prefix.length));
      }
    }
  }
}
