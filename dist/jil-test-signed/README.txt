
What is a test-signed widget?
=============================

Widgets that are test signed by using jil.org are only valid
(if the widget runtime implements it properly) for about a week.
That means widgets that are in this folder might not work due to an expired certificate.

Make it work anyway
===================
In case you need to make this widget work anyways, you can set back the date on your device
to the date of the signing of the widget (the timestamp of the file, normally).
Make sure you also upload the widget to the device when the date has been manipulated,
that at least seemed to be necessary on the Nokia devices.