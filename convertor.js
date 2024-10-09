const path = require('path')
const fs = require('fs')
const markdownpdf = require('markdown-pdf')
const { exec } = require('child_process')


/**
 * 
 * @param {string} mdFilePath 
 */
async function convertMarkdownToPdf(mdFilePath) {
    const localPath = convertPathSep(mdFilePath)
    const pdfFileName = localPath.split(path.sep).pop().replace('.md', '.pdf')
    const pdfFilePath = path.resolve(pdfFileName)
    markdownpdf().from(localPath).to(pdfFilePath, () => {
        console.log('Converted pdf from markdown')
    })
    return pdfFilePath.split(path.sep).pop()
}

/**
 * 
 * @param {string} filePath 
 * @returns {string} localPath
 */
function convertPathSep(filePath) {
    const { platform } = process
    const locale = path[platform === `win32` ? `win32` : `posix`]
    const localPath = filePath.replaceAll(path.sep, locale.sep)
    return localPath
}

/**
 * 
 * @param {string} pdfFilePath 
 */
exports.copyPdfToClipboard = async function(pdfFilePath) {

    const command = `type ${pdfFilePath} | clip`;
    const pdfBytes = fs.readFileSync(pdfFilePath)
    console.log(pdfBytes)
    await exec(command, (err, stdout, stderr) => {
        if (!err) {
            return 'PDF coppied to clipboard!!'
        }
    })
}

module.exports = convertMarkdownToPdf

