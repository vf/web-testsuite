#!/bin/bash
grep -ro 'mqcExecutionOrderBaseOffset\s*:\s*[[:digit:]]\+' `pwd "$0"`/src/tests | sed -E 's/^(.+):mqcExecutionOrderBaseOffset\s*:\s*([0-9]+)/\2 \1/g' | sort -rn