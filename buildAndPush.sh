ant -Dtest=jil/$1 build; adb push dist/unsigned/test-jil-$1.wgt /sdcard/wgt
