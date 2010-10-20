The test widgets in this directory are meant for testing various aspects of the update mechanism of a widget.
Use cases will be around the following things:
* test cases to test update, (period=0 this means check on every start
  see"Format And Packaging Spec" 2.14 <update> element (JIL Extension))
* period=1: every day, which tells the runtime to only check for an update once a day
* widgets to test that a proper update URL is used even if wrong one is configured
  (since for now in the vodafone environment the update URL in the config.xml is overruled by the backend servers)
* wgt for testing update with wrong widget (id)
