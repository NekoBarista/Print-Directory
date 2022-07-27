#!/usr/bin/env node 

import fs from "fs";
import path from "path"

import chalk from "chalk";
const { lstat } = fs.promises

const targetDir = process.argv[2] || process.cwd()

fs.readdir(targetDir, async (err, fileNames)=> {
if (err) {
console.log(err)
}

const statPromises = fileNames.map(fileName => {

return lstat(path.join(targetDir,fileName))
})

const allStats = await Promise.all(statPromises)


for (let stats of allStats) {
const index = allStats.indexOf(stats)

if(stats.isFile()) {
    console.log(chalk.blue(fileNames[index]))
}
else {
    console.log(chalk.green(fileNames[index]))
}
}
}
)


