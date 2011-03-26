#Exporter

This exporter directory may contain various scripts to export the test data for adapting them to backends as needed.
The first one, the WAC exporter (inside the directory "wac") exports the data into the W3C format, which is used by WAC and allows the
test descriptions to be imported into WAC systems. Though it's W3C style there might be WAC adaptions to make the exported
data work in the WAC environment, that is exactly the reason why there have to be various exporters.
In order to maintain an independent view on the data the specific exporters are in this separate "exporter" directory.