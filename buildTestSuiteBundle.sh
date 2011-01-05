# Create the ZIP file which we attach to the MQC test lab.
# It must contain all the widgets and some media files, which
# the tester must put in the proper directory on the device before 
# running certain tests.

TMP_DIR=_tmp-suite-bundle_

echo "Building test suite bundle"
echo ""

if [ $# = 0 ]; then
	echo "Please give the version number as a parameter. E.g. 1.1 or 1.2"
	exit;
fi

rm dist/test-SelfTest.wgt 2> /dev/null
rm release/widget-testsuite-$1.zip 2> /dev/null # Remove an already generated bundle.

rm -Rf $TMP_DIR 2> /dev/null
mkdir $TMP_DIR

#cp dist/jil-test-signed/test* $TMP_DIR
cp dist/unsigned/test* $TMP_DIR
cp dist/unsigned/util* $TMP_DIR
cp ReleaseNotes.txt $TMP_DIR
cp all-tests.xls $TMP_DIR
cp -R src/test-audio $TMP_DIR/
cp -R src/test-video $TMP_DIR/
cp -R src/test-photo $TMP_DIR/

cd $TMP_DIR
zip -r ../release/widget-testsuite-$1.zip *
cd ..

echo ""
echo "Created 'widget-testsuite-$1.zip', ready to distribute."

# cleanup
rm -Rf $TMP_DIR 2> /dev/null
