<?xml version="1.0" encoding="utf-8"?>
<widget xmlns="http://www.w3.org/ns/widgets" xmlns:jil="http://www.jil.org/ns/widgets1.2"
	id="http://jil.org/wid/cc4b75128e6bc033fb7f40e7a8818a7c5311dff8c8b6a8b69f0376214ae8d0b1/{widgetIdSuffix}" version="{versionString}"
	width="800" height="600" viewmodes="all">
	<width>800</width>
	<height>1000</height>
	<name>{widgetName}</name>
	<icon src="img/icon.png"/>
	<jil:maximum_display_mode height="800" width="600"/>
	<author href="http://vodafone.com" email="wk@uxebu.com">Wolfram Kriesing</author>
	<description>This widget tests the following: {widgetName}</description>

	<access network="true" localfs="true"/> <!-- until JIL 1.1 this was enough -->
	<jil:access network="true" localfs="true" remote_scripts="true"/> <!-- this is needed for JIL1.2 -->
	
</widget>
