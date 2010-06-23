#!/bin/bash
grep -rho 'mqcExecutionOrderBaseOffset\s*:\s*[[:digit:]]\+' `pwd "$0"`/src/tests | sed s/[^0-9]//g | sort -rn
