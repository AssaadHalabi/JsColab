import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // Handle root entry file of 'index.js'
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: 'index.js', namespace: 'a' };
      });

      // Handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        let resolveDir = args.resolveDir;
        if(args.resolveDir.includes("/react@")) resolveDir = "/react@17.0.1"
        if(args.resolveDir.includes("/react-dom@")) resolveDir = "/react-dom@17.0.1"
        if(args.resolveDir.includes("react.production.js")) resolveDir = resolveDir.replace(".production.js", ".production.min.js")
        if(args.resolveDir.includes("react-dom.production.js")) resolveDir = resolveDir.replace(".production.js", ".production.min.js")
        return {
          namespace: 'a',
          path: new URL(args.path, 'https://unpkg.com' + resolveDir + '/')
            .href,
        };
      });

      // Handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        let path = args.path;
        if(args.path.includes("react.production.js")) path = path.replace(".production.js", ".production.min.js")
        if(args.path.includes("react-dom.production.js")) path = path.replace(".production.js", ".production.min.js")
        return {
          namespace: 'a',
          path: `https://unpkg.com/${path}`,
        };
      });
    },
  };
};
