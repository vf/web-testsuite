# Webtestsuite (DRAFT)

## About
The _Webtestsuite_ was developed to create more visibility across multiple webrendering technologies (i.e. Desktop Browser, Mobile Browsers, Webruntimes for widgets, etc.). 
The idea was to create one set of tests as basis for all target platform to create comparability and transparency over these platforms.

## Contributing
We look for contributors from all sectors of mobile / web technologies. 
Wheater you work at Mobile Handset Vendors, Network companies, build Mobile or Desktop browsers or emulators, create standards or implement them... We look for you!
If you are interested in participating, download the testsuite, run it on your Software and submit your results! Every result helps us improving our testcoverage and brings us one step forward in becoming a serious database for browser capability difefrences!

If you like what we did, start joining our mailing list (LINK) and begin to discuss your result/our tests!

Provide patches, build your project on top of ours, etc. We need your help to become a serious testing entity and database!

## Example Tests

## Testphilosophie


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


