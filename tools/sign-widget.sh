#!/bin/bash
outname=signature1.xml
identifier=""
author=0
# rsa by default http://www.w3.org/TR/widgets-digsig/#signature-algorithms
KEYTYPE="rsa"

if [ $# -eq 0 ]
then
    echo "Usage $0 [xmlsec options] [options] widget"
    echo "	-o filename	Set signature filename (default: $outname)"
    echo "	-i ID		Set dsp:Identifier value (default: <random>)"
    echo "	-a  Set signature type to author"
    echo "	-d  Set key type to DSA"
    echo "	-u  Update digests and signature (in signature specified by -o), don't regenerate"
    echo "	-c  Specify the X509 certificate"
    echo "	-x  Don't verify after signing"
    echo "	widget may be a directory or .wgt file"
    echo
    echo "Useful xmlsec options:"
    echo "	--pkcs12 /absolute/path/to/keycert.p12"
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

certfile=""
validate=1
update=0
while getopts "o:i:aduc:x" o
do
	case "$o" in
	(o) outname=$OPTARG;;
	(i) identifier="--identifier $OPTARG";;
	(a) author=1;;
	(d) KEYTYPE="dsa";;
	(u) update=1;;
	(c) certfile=$OPTARG;;
	(x) validate=0;;
	(*)  break;;
	esac
done
shift $((OPTIND - 1))

echo Key type $KEYTYPE

if ! test -e "$1"
then
	echo $1 does not exist
	exit
fi

#temp=$(readlink -f "$1")
temp="$1"
WD=$(dirname "$temp")
#BASE=$(readlink -f `dirname $0`)
BASE=$(dirname $0)
WIDGET=$(basename "$1" .wgt)

if [ -d "$1" ]
then
    echo "Widget is a directory"
    wgtdir="$1"
else
    wgtdir="/tmp/.$$/$WIDGET"
    echo "Working in $wgtdir"
    mkdir -p $wgtdir
    unzip "$1" -d $wgtdir
fi

cd "$wgtdir"

template=`mktemp -t wgt`
tempsig=`mktemp -t wgt`

if [ $author -eq 1 ]
then
	outname="author-signature.xml"

    if [ $update -eq 0 ]
    then
    	$BASE/signing-template.sh --method $KEYTYPE --role author $identifier $(find . -type f -not -name 'signature*.xml' -not -name 'author-signature.xml' -not -name '*.wgt' -exec basename "{}" \;) > $template
    else
        template=$outname
    fi
	xmlsec1 sign $XMLSECOPTIONS --output $tempsig $template
else
    if [ $update -eq 0 ]
    then
        $BASE/signing-template.sh --method $KEYTYPE --role distributor $identifier $(find . -type f -not -name 'signature*.xml' -not -name '*.wgt' -exec basename "{}" \;) > $template
    else
        template=$outname
    fi
	xmlsec1 sign $XMLSECOPTIONS --output $tempsig $template
fi

if [ "$certfile" != "" ]
then
    # Get the certificate and remove the header/footer
    cert=`openssl x509 -in $certfile | grep -v -- "-----"`
    xmlstarlet ed -P -N sig=http://www.w3.org/2000/09/xmldsig# -i "//sig:X509Data/node()" -t elem -n "X509Certificate" -v "$cert" $tempsig > $outname
else
    mv $tempsig $outname
fi

if [ $update -eq 1 ]
then
    echo "Updated $outname"
else
    echo "Signed $outname"
fi

if [ $validate -eq 1 ]
then
    echo -n "Validating... "
    validatecmd="$BASE/validate-widget.sh $XMLSECOPTIONS $PWD"
    $validatecmd > /dev/null 2> /dev/null
    if [ "$?" -ne 0 ]
    then
        echo "FAILED with command:"
        echo "$validatecmd"
    else
        echo "SUCCESS"
    fi
    echo
fi

cd $WD
if [ -f "$1" ]
then
    echo "Zipping widget..."
    rm -f "$1"
    zip -jr $WD/$WIDGET.wgt $wgtdir
    rm -rf $wgtdir
fi

echo Signed $1
