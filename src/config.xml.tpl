<?xml version="1.0" encoding="utf-8"?>
<widget xmlns="http://www.w3.org/ns/widgets" xmlns:jil="http://www.jil.org/ns/widgets1.2"
	id="http://jil.org/wid/cc4b75128e6bc033fb7f40e7a8818a7c5311dff8c8b6a8b69f0376214ae8d0b1/{widgetIdSuffix}" version="{versionString}"
	width="9999" height="9999" viewmodes="all">
	<name>{widgetName}</name>
	<icon src="img/icon.png"/>
	<jil:maximum_display_mode height="9999" width="9999"/>
	<author href="http://vodafone.com" email="wk@uxebu.com">Wolfram Kriesing</author>
	<description>This widget tests the following: {widgetName}</description>

	<!-- until JIL 1.1 this was enough -->
	<access network="true" localfs="true"/>
	
	<!-- this is needed for JIL1.2 -->
	<jil:access network="true" localfs="true" remote_scripts="true"/>
	
	<!--<update href="http://www.jil.org/widgets/" period="0"/>    -->
</widget>
