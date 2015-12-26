# IPython paths

Fetches expected IPython paths for you, both system installed and user installed
kernels.

### Full listing, doesn't check validity or existence

```javascript
> require('.').kernelDirsListing()
[ '/usr/share/jupyter/kernels',
  '/usr/local/share/jupyter/kernels',
  '/Users/rgbkrk/.ipython/kernels' ]
```

### Promise that resolves to an array of valid kernel directories

```
> require('.').kernelDirs().then((dirs) => console.log(dirs))
Promise { <pending> }
> [ '/usr/local/share/jupyter/kernels' ]
```

