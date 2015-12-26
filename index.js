/**
 * @module ipython-paths
 *
 * @description Module `ipython-paths` provides path helpers for IPython 3.x
 */

var path = require('path');

function systemKernelDirs() {
  // System wide paths
  var systemPaths = [];
  if (process.platform == 'win32') {
    var sysKernels = path.resolve(path.join(process.env('PROGRAMDATA'), 'jupyter', 'kernels'));
    systemPaths.push(sysKernels);
  } else {
    systemPaths.push('/usr/share/jupyter/kernels');
    systemPaths.push('/usr/local/share/jupyter/kernels');
  }

  return systemPaths;
}

function userKernelDirs() {
  var homeDir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
  var userKernels = path.resolve(path.join(homeDir, '.ipython', 'kernels'))
  return [userKernels]
}

function kernelDirs() {
  return systemKernelDirs().concat(userKernelDirs());
}

module.exports = {
  systemKernelDirs,
  userKernelDirs,
  kernelDirs,
}
