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

rm -Rf tmp-mqcbuild 2> /dev/null
mkdir tmp-mqcbuild

cp dist/test* tmp-mqcbuild
cp ReleaseNotes.txt tmp-mqcbuild
mkdir tmp-mqcbuild/test-audio
mkdir tmp-mqcbuild/test-video
mkdir tmp-mqcbuild/test-photo
cp -R src/audio/* tmp-mqcbuild/test-audio
cp -R src/video/* tmp-mqcbuild/test-video
cp -R src/photo/* tmp-mqcbuild/test-photo

cd tmp-mqcbuild
zip -r ../mqc-widget-suite-$1.zip *
cd ..

echo ""
echo "Created 'mqc-widget-suite-$1.zip' you can attach this file in MQC now."

# cleanup
rm -Rf tmp-mqcbuild 2> /dev/null
