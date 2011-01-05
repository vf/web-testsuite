//
// This file writes the resulting XML into the appropriate "config.xml" file.
//

file.write(config.destinationFile, (config.addXmlHeader ? xmlHelper.header : "") + "\n" + xml);
