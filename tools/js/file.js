importPackage(java.io); // So we can use FileWriter, FileReader.
importPackage(java.util);

var file = {
	
	appendFile:function(fromFileName, toFileName){
		var r = new Scanner(new FileReader(fromFileName));
		var w = new FileWriter(toFileName, true); // 2nd param true, means append new stuff.
		w.write(fromFileName.replace(config.rootDirectory, ""));
		var text;
		// repeat until all lines is read
		while (r.hasNextLine()){
			w.write(r.nextLine()+"\n");
		}
		w.close(); // Make sure to flush, thats what close() does, otherwise we loose lines :).
	},
	
	write:function(fileName, content){
		var f = new FileWriter(fileName);
		f.write(content);
		f.close();
	},
	
	exists:function(fileName){
		return new File(fileName).exists();
	},
};
