/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable flowtype/require-valid-file-annotation */
import cp from "child_process";
import path from "path";

import fse from "fs-extra";

async function copyFile(file) {
  const buildPath = path.resolve(__dirname, "../dist/", path.basename(file));
  await fse.copy(file, buildPath);
}

async function createPackageFile() {
  const packageData = await fse.readFile(path.resolve(__dirname, "../package.json"), "utf8");
  const { name, version, dependencies } = JSON.parse(packageData);
  const newPackageData = {
    name,
    version,
    dependencies,
    main: "./index.js",
    private: true,
  };
  const buildPath = path.resolve(__dirname, "../dist/package.json");

  await fse.writeFile(buildPath, JSON.stringify(newPackageData, null, 2), "utf8");

  return newPackageData;
}

async function run() {
  const distDir = path.resolve(__dirname, "../dist/");
  await cp.exec("find . -name '*.spec.js*' -delete", { cwd: distDir });
  await cp.exec("find . -name '*.snap' -delete", { cwd: distDir });
  await cp.exec("find . -name '*.md' -delete", { cwd: distDir });
  await cp.exec("find . -name '__snapshots__' -delete", { cwd: distDir });
  await fse.remove(path.resolve(__dirname, "../dist/utils/mocks"));
  await Promise.all(["README.md", "CHANGELOG.md"].map(file => copyFile(file)));
  const packageData = await createPackageFile();
  await cp.exec("npm pack", { cwd: distDir });
  console.info(
    `\n\nTo upload to s3, run:\n\ngrail-aws tickets/eng/dev/aws s3 cp dist/grail-server-lib-${
      packageData.version
    }.tgz s3://grail-ui/${packageData.version}/\n\n`,
  );
}

run();
