Dojo Object Harness v2
======================

History
-------
I was on the search for a JavaScript unit testing package,
and kind of by accident (LOL) I stumbled across DOH, the
actual dojo object harness, contained in dojo (at least currently).
I started happily using it, but as you know it always comes
one thing and then another which you need. So I started
adding and adding and felt that the (old) doh was just
not flexible enough and had some drawbacks. Therefore
I pulled out the best pieces and glued it back together
and out came this.

Features
--------
The features the (old) doh provides and doh2 does too:
* asynchronous tests 
* assert functions

Features doh2 added or fixed
* streamlined synch and asynch test writing, no notable difference
  for the test writer anymore - much easier
* no need to know about doh.Deferred anymore, it's all wrapped
  in the test object passed to the test function, just use assert*()
  everywhere
* make doh.pause() work again
* doh.pause() can also be used inside a test to stop
  the test run from within a test
* allow returning values, such as test results for the good case
* namespaced all doh functionalities, and separated them into multiple files
  doh, doh.assert, doh.util, doh.Deferred

Examples
--------
See the file "selftests.js" it provides tests with extensive explaination.
