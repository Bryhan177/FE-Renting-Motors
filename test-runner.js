#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Running Angular tests with Jest...\n');

const jestProcess = spawn('npx', ['jest', '--verbose', '--coverage', '--watchAll=false'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd()
});

jestProcess.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ All tests passed!');
  } else {
    console.log('\n❌ Some tests failed.');
    process.exit(code);
  }
});

jestProcess.on('error', (error) => {
  console.error('Error running tests:', error);
  process.exit(1);
});
