#! /bin/bash

function assert_files(){
  local actual=$1
  local expected=$2
  local message=$3

  diff $actual $expected
  status=$?
  isPassed="PASS"

  if [[ ${status} != 0 ]] ; then
    isPassed="FAIL"
  fi

  echo "${isPassed} | ${message}"
}

prompts=$(node main.js << EOF
premkumar
1111-11-11
a,b
1111111111
EOF
);

assert_files 'formData.json' 'exp.json' 'Should write responses to file'
