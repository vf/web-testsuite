try{
	
	print("\nConverting tests-all.csv to description-*.xml files.\n==============================");
	
	var csv = readFile("../../tests-all.csv");
	var lines = CSV.csvToArray(csv);
	print(lines.length + ' lines (tests) found in "../../tests-all.csv"');
	
	function openXmlFile(){
		default xml namespace = "";
		return new XML('<testsuite></testsuite>');
	}

	function writeXmlFile(xmlFile, fileName){
		print('Writing "' + fileName + '"...');
		var header = '<?xml version="1.0" encoding="UTF-8"?>';
		file.write(fileName, header + xmlFile);
	}
	
	//
	// Go through all the lines and group the tests by filenames (the widget file name, line[0]).
	var files = {};
	for (var i=1, l=lines.length, line; i<l; i++){
		var line = lines[i];
		if (typeof files[line[0]]=="undefined"){
			files[line[0]] = [];
		}
		files[line[0]].push(line);
	}
	
	// Go through all the files and write all tests into an XML file.
	for (var fileName in files){
		var lines = files[fileName];
		var testsuite = openXmlFile();
		for (var i=0, l=lines.length, lines; i<l; i++){
			line = lines[i];
			var text = (line[3] ? "Instructions:\n"+line[3]+"\n" : "") + (line[4] ? "\nExpected behaviour:\n"+line[4] : "");
			text = text ? "\n\n" + text : "";
			var tag = <test id="{id}">{line[2]}{text}</test>; // why the fuck does this not work for me? thought it replaces the literals {id} etc. but it doesn't
			tag.@id = line[1];
			tag.@src = line[0];
			var forAttribute = line[5];
			if (forAttribute) {
				tag.@["for"] = forAttribute;
			}
			testsuite.test += tag;
		}
		writeXmlFile(testsuite, "dist/description-" + (fileName.replace(/\.wgt$/, ".xml")));
	}

}catch(e){
	print(e);
}
