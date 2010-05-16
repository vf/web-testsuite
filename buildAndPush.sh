ant -Dtest=jil/$1 build; adb push dist/test-jil-$1.wgt /sdcard/wgt
