#!/bin/bash
role="distributor"
method="rsa"
identifier=`uuidgen`
usage() {
cat <<EOL
Options:
	--role distributor (default: $role)
	--method dsa (default: $method)
	--identifier dsa (default: <random>)
EOL
}
while [[ $1 == -* ]]; do
	case "$1" in
		-h|--help|-\?) usage; exit 0;;
		--role) role=$2; shift 2;;
		--method) method=$2; shift 2;;
		--identifier) identifier=$2; shift 2;;
		--) shift; break;;
		-*) echo "invalid option: $1"; usage; exit 1;;
	esac
done

case "$method" in
	rsa) method="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";;
	dsa) method="http://www.w3.org/2000/09/xmldsig#dsa-sha1";;
	ecdsa) method="http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha256";;
	*) echo invalid signature method $method; usage; exit 1;;
esac

target=`echo $role | sed 's/\([a-z]\)\([a-zA-Z0-9]*\)/\u\1\2/g'`Signature

cat << EOL
<?xml version="1.0" encoding="UTF-8"?>
<Signature xmlns="http://www.w3.org/2000/09/xmldsig#" Id="${target}">
 <SignedInfo>
  <CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#" />
  <SignatureMethod Algorithm="$method" />
EOL

for i in "$@"
do
cat << EOL
  <Reference URI="$i">
   <DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256" />
   <DigestValue></DigestValue>
  </Reference>
EOL
done

cat << EOL
  <Reference URI="#prop">
   <Transforms>
    <Transform Algorithm="http://www.w3.org/2006/12/xml-c14n11"/>
   </Transforms>
   <DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256" />
   <DigestValue></DigestValue>
  </Reference>
 </SignedInfo>
 <SignatureValue>
 </SignatureValue>
 <KeyInfo>
  <X509Data>
  </X509Data>
 </KeyInfo>
 <Object Id="prop">
  <SignatureProperties
   xmlns:dsp="http://www.w3.org/2009/xmldsig-properties">
   <SignatureProperty Id="profile" Target="#${target}">
    <dsp:Profile URI="http://www.w3.org/ns/widgets-digsig#profile"/>
   </SignatureProperty>
   <SignatureProperty Id="role" Target="#${target}">
    <dsp:Role
      URI="http://www.w3.org/ns/widgets-digsig#role-${role}"/>
   </SignatureProperty>
   <SignatureProperty Id="identifier" Target="#${target}">
    <dsp:Identifier>${identifier}</dsp:Identifier>
   </SignatureProperty>
  </SignatureProperties>
 </Object>
</Signature>
EOL
