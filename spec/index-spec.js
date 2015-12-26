var path = require('path');
var expect = require('chai').expect;

describe('kernelDirsListing', () => {
  it('returns an array of kernel directories', () => {
    var ip = require('../');

    var homeDir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
    var userKernels = path.resolve(path.join(homeDir, '.ipython', 'kernels'))

    var dirs = ip.kernelDirsListing();
    expect(dirs).to.include(userKernels)
    if (process.platform !== 'win32') {
      expect(dirs).to.include('/usr/share/jupyter/kernels')
      expect(dirs).to.include('/usr/local/share/jupyter/kernels')
    } else {
      expect(dirs).to.include(path.resolve(
        path.join(process.env('PROGRAMDATA'), 'jupyter', 'kernels')));
    }
  });
});

describe('kernelDirs', () => {
  it('returns a promise of valid kernel directories', () => {
    var ip = require('../');

    var homeDir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
    var userKernels = path.resolve(path.join(homeDir, '.ipython', 'kernels'))

    var dirs = ip.kernelDirs();

    return ip.kernelDirs().then((dirs) => {
      expect(dirs).to.be.an('array');
    });
  });
});
