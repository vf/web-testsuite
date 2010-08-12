# Create the ZIP file which we attach to the MQC test lab.
# It must contain all the widgets and some media files, which
# the tester must put in the proper directory on the device before 
# running certain tests.

echo "Building MQC bundle"
echo ""

if [ $# = 0 ]; then
	echo "Please give the version number as a parameter. E.g. 1.1 or 1.2"
	exit;
fi

rm dist/test-SelfTest.wgt 2> /dev/null
rm mqc-widget-suite-$1.zip 2> /dev/null # Remove an already generated bundle.

rm -Rf tmp-mqcbuild 2> /dev/null
mkdir tmp-mqcbuild

cp dist/test* tmp-mqcbuild
cp -R dist/developer-signed tmp-mqcbuild
cp ReleaseNotes.txt tmp-mqcbuild
cp -R src/test-audio tmp-mqcbuild/
cp -R src/test-video tmp-mqcbuild/
cp -R src/test-photo tmp-mqcbuild/

cd tmp-mqcbuild
zip -r ../mqc-widget-suite-$1.zip *
cd ..

echo ""
echo "Created 'mqc-widget-suite-$1.zip' you can attach this file in MQC now."

# cleanup
rm -Rf tmp-mqcbuild 2> /dev/null
