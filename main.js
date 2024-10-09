const arv = require('minimist')
const convertToPdf = require('./convertor.js')
const { exec } = require('child_process')
const path = require('path')


async function main() {

    const input = arv(process.argv.slice(2))
    const pdfFilePath = await convertToPdf(input._[0])
    console.log(pdfFilePath)

    const command = `echo ${path.resolve(pdfFilePath)} | ${path.resolve('./file2clip.exe')}`
    console.log(command)
    await exec(command, (err, stdout, stderr)=> {
        console.log(err, stdout, stderr)

        if(!err) {
            console.log('pdf coppied to clipboard!!')
        }

    })

    await exec(command,{maxBuffer: 1024*1024}, (err, stdout, stderr) => {
        console.log(err, stdout, stderr)
    })
}

main().catch(e => console.error(e))