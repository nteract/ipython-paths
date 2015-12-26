# IPython paths

Fetches expected IPython paths for you, both system installed and user installed
kernels.

Only works on IPython 3.x. For 4.x, you'll need [`jupyter-paths`](https://github.com/nteract/jupyter-paths).

For anything earlier, send a PR.

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

