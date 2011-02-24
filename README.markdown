# Webtestsuite (DRAFT)

## Links
[Wiki](https://github.com/vf/web-testsuite/wiki)  
[twitter](https://twitter.com/webtestsuite)  
[google groups](http://groups.google.com/group/webtestsuite?hl=de)


## About
The _Webtestsuite_ was developed to create more visibility across multiple webrendering technologies (i.e. Desktop 
Browser, Mobile Browsers, Webruntimes for widgets, etc.). 
The idea is to create a practical relevant set of tests as basis for all platform, targetable by web technologies, to create comparability and transparency over these platforms.
HTML5 is still a new kid on the block and not all the features are available on all platforms, but to know what exists where and what is useable you still need deep knowledge. This _Webtestsuite_ aims to create visibility (first) on the practically relevant items.
The _Webtestsuite_ itself is only a building block of this entire vision. In order to realize the full visibility not only the hereby provided tests need to be run, but the results need to be stored and visualized. Which is not part of this project (yet!!!). 
See the [Roadmap](https://github.com/vf/web-testsuite/wiki/Roadmap) for more details on future planning.

## What is provided
This project aims to create the technical platform to build an HTML5 App Test suite that aims not only on the HTML5 capabilities but also all extended functionality such as device APIs as provided by WAC (formerly JIL), PhoneGap, or any other project that allows to go well beyond HTML5.
The set of tests provided within this test suite initially focused strongly on JIL 1.2.2 (which became WAC1.0) but the structure is designed in a way that PhoneGap, Appcelerator's Titanium, WebOS, WebWorks, etc. fit perfectly in here.
The major goals of this project are to provide a technical setup where it is easy to write tests, no matter if fully automatic (such as unit tests) or half automatic or completely manual (like an Accelerometer tests, where you still have to move the device manually).
The test suite is structured into multiple modules, which can be built as individual applications (into W3C/JIL/WAC 
Widgets for now as ".wgt" files) and also as a website which can be hosted in some place and shared through a link to
 enable crowd sourced test execution. The results are reported to a unique URL in order to collect as many possible results and build a good market overview. Our aim is to create a very complete one... some day.

## Contributing
We look for contributors from all sectors of mobile / web technologies. 
Whether you work at mobile handset vendors, network companies, build mobile/desktop browsers or emulators, create standards or implement them... __We look for you!__
Find details here: [[contribute]]


## Example Tests

## Test philosophy
The core of the webtestsuite is to make everything as transparent as possible while following the core principles of 
our testsuite: [[Core principles]]


# Start using it

If you like to run the tests on a device, check examples of testpieces to see how we actually did things or simply 
start playing around with the _webtestsuite_, check out our [[getting started]] HOWTO to ramp up quickly!
