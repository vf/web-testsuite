# Webtestsuite (DRAFT)

## Links
[Wiki](https://github.com/vf/web-testsuite/wiki)  
[twitter](https://twitter.com/webtestsuite)  
[google groups](http://groups.google.com/group/webtestsuite?hl=de)


## About
The _Webtestsuite_ was developed to create more visibility across multiple webrendering technologies (i.e. Desktop Browser, Mobile Browsers, Webruntimes for widgets, etc.). 
The idea is to create a practical relevant set of tests as basis for all platform, targetable by web technologies, to create comparability and transparency over these platforms.
HTML5 is still a new kid on the block and not all the features are available on all platforms, but to know what exists where and what is useable you still need deep knowledge. This _Webtestsuite_ aims to create visibility (first) on the practically relevant items.
The _Webtestsuite_ itself is only a building block of this entire vision. In order to realize the full visibility not only the hereby provided tests need to be run, but the results need to be stored and visualized. Which is not part of this project (yet!!!). 
See the [Roadmap](https://github.com/vf/web-testsuite/wiki/Roadmap) for more details on future planning.

## What is provided
This project aims to create the technical platform to build an HTML5 App Test suite that aims not only on the HTML5 capabilities but also all extended functionality such as device APIs as provided by WAC (formerly JIL) APIs, PhoneGap, or any other project that allows to go well beyond HTML5.
The set of tests provided within this test suite initially focused strongly on JIL 1.2.2 (which became WAC1.0) but the structure is designed that way that PhoneGap, Appcelerator's Titanium, WebOS, WebWorks, etc. fit perfectly in here.
The major goals of this project are to provide a technical setup where it is easy to write tests, no matter if fully automatic (such as unit tests) or half automatic or completely manual (like an Accelerometer tests, where you still have to move the device manually).
The test suite is structured into multiple modules, which can be built as individual applications (into W3C/JIL/WAC Widgets for now as ".wgt" files) and also as a website which can be hosted in some place and shared through a link to enable crowdsourcing the test execution. The results are reported to a unique URL in order to collect as many possible results and build a good market overview. Hopefully a very complete one, some day.

## Contributing
We look for contributors from all sectors of mobile / web technologies. 
Whether you work at Mobile Handset Vendors, Network companies, build mobile/ desktop browsers or emulators, create standards or implement them... __We look for you!__

If you are interested in participating, download the testsuite, run it on your Software and submit your results! Every result helps us improving our testcoverage and brings us one step forward in becoming a serious datasource for browser capability difefrences!

If you like what we did, start joining our mailing list <http://groups.google.com/group/webtestsuite?hl=de> and begin to discuss your result/our tests!

Provide patches, pull requests, fork away, build your project on top of ours, etc. We need your help to become a serious testing entity and database!

## Example Tests

## Test philosophy
The core of the webtestsuite is to make everything as transparent as possible, the core principles of the suite, as of most test sets are:
* good reproducability - means: a test shall try to be as simple as possible that the real cause of an issue can be reproduced and reported to the runtime provider in order to have it fixed asap
* little to no dependencies - means: a test should try to ONLY use the smallest set of functionality to get to a result, in order to not depend on other functionality that could fail and blur the actual test result. This does also mean to find the best trade off between automation and manual testing
* 


# Start using it

## Have a deeper look!
You have two possibilities to checkout the source of our testsuite in order to build your dedicated tests:

### Clone it!
If you use Git already:

	git clone git://github.com/vf/web-testsuite.git
	
This will create a local copy on your machine. 

### Download it!
Choose a prebuild package of tests to download by clicking on the "Downloads" link on top of the [projects homepage](https://github.com/vf/web-testsuite).

## Building the Testsuite
### Setting up the build system
In order to build your tests, you need ant for building these. We use ant to build the suite for multiple targets (i.e. specific tests only, a full suite of HTML5 tests or build the tests as widgets).
Ant is open source and can be obtained here: [Ant binary downloads](http://ant.apache.org/bindownload.cgi). 

To setup ant on your machine follow this guide: [Install Ant](http://ant.apache.org/manual/install.html). 
You don't need to go beyond step 4 and YES, you need Java...

### Building a distibution
Open a commandline on your developer machine and cd to your source directory:

	cd ~/path/to/local/source
	
In the source root directory you can simply type:
	ant
	
to build all tests simply hit return, otherwise chosse a specific test to be build by providing the testname to the prompt and hitting return.
The built tests will be stored in the dist directory. 

