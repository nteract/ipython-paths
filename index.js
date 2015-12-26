/**
 * @module ipython-paths
 *
 * @description Module `ipython-paths` provides path helpers for IPython 3.x
 */

var path = require('path');
var fs = require('fs');
var async = require('async');

function systemKernelDirs() {
  // System wide paths
  var systemPaths = [];
  if (process.platform === 'win32') {
    systemPaths.push(path.resolve(
      path.join(process.env('PROGRAMDATA'), 'jupyter', 'kernels')));
  }
  else {
    systemPaths.push('/usr/share/jupyter/kernels');
    systemPaths.push('/usr/local/share/jupyter/kernels');
  }

  return systemPaths;
}

function userKernelDirs() {
  var homeDir = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
  var userKernels = path.resolve(path.join(homeDir, '.ipython', 'kernels'));
  return [userKernels];
}

function validDirectory(p, cb) {
  fs.stat(p, (err, stat) => {
    // explicitly ignoring err, file doesn't exist or can't be reached
    if(err) {
      return cb(false);
    }
    return cb(stat.isDirectory());
  });
}

function kernelDirsListing() {
  return systemKernelDirs().concat(userKernelDirs());
}

function kernelDirs() {
  return new Promise((resolve, reject) => {
    async.filter(kernelDirsListing(), validDirectory, (results) => {
      resolve(results);
    });
  });
}

module.exports = {
  kernelDirsListing,
  kernelDirs,
};
