
/**
 * This is an example using pure react, with no JSX
 * If you would like to use JSX, you will need to use Babel to transpile your code
 * from JSK to JS. You will also need to use a task runner/module bundler to
 * help build your app before it can be used in the browser.
 * Some task runners/module bundlers are : gulp, grunt, webpack, and Parcel
 */

import * as Setup from "./setup_page.js";

define(["react", "splunkjs/splunk"], function(react, splunk_js_sdk){
  const e = react.createElement;

  class SetupPage extends react.Component {
    constructor(props) {
      super(props);

      this.state = {
		stanza: 'securitybridge_configuration',
        api_url: '',
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({ ...this.state, [event.target.name]: event.target.value})
    }

    async handleSubmit(event) {
      event.preventDefault();

      await Setup.perform(splunk_js_sdk, this.state)
    }

	render() {
		return e("div", null, [
			e("div", {class:"row"}, [
				e("link",{rel:"stylesheet",href:"https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"}),
				e("form", { autoComplete:"off", class :"",onSubmit: this.handleSubmit }, [
					e("div", {class:"form-group"}, [
						e("label", {class:"col-md-2"}, "Incident Dictionary Host"),
						e("div", {class:"col-md-4 autocomplete"},[
							e("input", { type: "text", name: "api_url", id:"api_url", value: this.state.api_url, onChange: this.handleChange,class:"form-control" })
						])
					]),
					e("div",{class:"clearfix"}),
					e("div",{class:"clearfix"}),
					e("div", {class:"col-md-2"}, ""),
					e("div", {class:"col-md-6"}, "Put in your SecurityBridge Incident Dictionary Host in http://<host>:<port> format"),
					e("div",{class:"clearfix"}),
					e("div",{class:"clearfix"}),
					e("div", {class:"form-group"}, [
						e("div", {class:"col-md-offset-2 col-md-10"}, [
							e("input", { type: "submit", value: "Submit" })
						])
					]),
				])
			])
		]);
	}

  }

  return e(SetupPage);
});
