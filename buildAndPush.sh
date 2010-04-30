ant -Dtest=jil/$1 buildSingleTest; adb push dist/test-jil-$1.wgt /sdcard/wgt
