#!/bin/bash
# hendry@aplix.co.jp

if [ $# -eq 0 ]
then
    echo "Usage $0 [xmlsec options] [options]  widget"
    echo "	widget may be a directory or .wgt file"
    echo
    echo "Useful xmlsec options:"
    echo " --trusted-pem /absolute/path/to/cert.pem"
    echo " --untrusted-pem /absolute/path/to/cert.pem"
    echo "	--pkcs12 /absolute/path/file.p12"
    echo "	--pwd password"
    exit;
fi

while [[ $1 == --* ]]; do
	XMLSECOPTIONS="$XMLSECOPTIONS $1"
	if [[ $2 != --* ]]
	then
		XMLSECOPTIONS="$XMLSECOPTIONS $2"
		shift 2
	else
		echo Missing argument
		exit
	fi
done

shift $((OPTIND - 1))

BASE=$(readlink -f `dirname $0`)

if [ -d "$1" ]
then
    echo "Widget is a directory"
    wgtdir="$1"
else
    wgtdir="/tmp/.$$"
    echo "Working in $wgtdir"
    mkdir -p $wgtdir
    unzip -q "$1" -d $wgtdir
fi

cd "$wgtdir"

if test "x$XMLSECOPTIONS" == "x" # Try extract key from the author signature to validate the widget with
then
	OUTPUT=$(tempfile)
	cat signature1.xml | xmlstarlet sel -N ds=http://www.w3.org/2000/09/xmldsig#  -t -m "//ds:X509Certificate" -v . | base64 -d > $OUTPUT
	if ! cat $OUTPUT | openssl x509 -text -inform DER
	then
		echo Could not find public key from ds:X509Certificate
		exit
	fi
	#XMLSECOPTIONS="--pubkey-cert-der $OUTPUT $ROOT"
	XMLSECOPTIONS="--enabled-key-data $ROOT"
fi

result=0
signedwidget=0
for i in $(find . -name author-signature.xml -o -name 'signature*.xml')
do
    signedwidget=1
	if ! rnv $BASE/xmldsig.rnc $i
	then
		echo $i FAILED widget digsig schema check
		result=1
	fi

	# http://www.w3.org/TR/widgets-digsig/#signature-algorithms
	SIGMETHOD=$(xmlstarlet sel -N sig=http://www.w3.org/2000/09/xmldsig#  -t -m "//sig:SignatureMethod/@Algorithm" -v . $i)
	case "$SIGMETHOD" in
		(http://www.w3.org/2001/04/xmldsig-more#rsa-sha256)
			echo Signature method RSA
			;;
		(http://www.w3.org/2000/09/xmldsig#dsa-sha1)
			echo Signature method DSA
			;;
		(http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha256)
			echo Signature method ECDSA
			;;
		(*) echo Unknown Signature Method && continue;;
	esac

	echo if xmlsec1 verify $XMLSECOPTIONS $i
	if xmlsec1 verify $XMLSECOPTIONS $i
	then
		echo VALID SIGNATURE: $i
	else
		echo INVALID SIGNATURE: $i
		result=1
	fi
done

if [ $signedwidget -eq 0 ]
then
    echo "UNSIGNED WIDGET"
fi

exit $result
