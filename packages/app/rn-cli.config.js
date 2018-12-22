const blacklist = require("metro-config/src/defaults/blacklist");
const getWorkspaces = require("get-yarn-workspaces");
const path = require("path");

function getConfig(from, options = {}) {
  const workspaces = getWorkspaces(from);

  function getProjectRoots() {
    return [
      // Keep your project directory.
      path.resolve(from),

      // Include your forked package as a new root.
      options.nodeModules || path.resolve(from, "../..", "node_modules"),
    ].concat(workspaces);
  }

  const config = {
    watchFolders: getProjectRoots(),
    resolver: {
      blacklistRE: blacklist(
        workspaces.map(
          workspacePath =>
            `/${workspacePath.replace(
              /\//g,
              "[/\\\\]",
            )}[/\\\\]node_modules[/\\\\]react-native[/\\\\].*/`,
        ),
      ),
      extraNodeModules: {
        "react-native": path.resolve(from, "node_modules/react-native"),
      },
    },
  };

  console.log("=-=================");
  console.log("=-=================");
  console.log("=-=================");
  console.log("=-=================");

  console.log(config);
  console.log("=-=================");
  console.log("=-=================");
  console.log("=-=================");

  return config;
}

module.exports = getConfig(__dirname);
