import markdownpdf from "markdown-pdf";
import * as path from 'path';


/**
 * 
 * @param {string} mdFilePath 
 */
function convertMarkdownToPdf(mdFilePath) {
    const localPath = convertPathSep(mdFilePath)
    const pdfFileName = localPath.split(path.sep).pop().replace('.md', '.pdf')
    const pdfFilePath = path.resolve(pdfFileName)
    markdownpdf().from(localPath).to(pdfFilePath, () => {
        console.log('Converted pdf from markdown')
    })
}

/**
 * 
 * @param {string} filePath 
 * @returns {string} localPath
 */
function convertPathSep(filePath) {
    const {platform} = process
    const locale = path[platform === `win32`? `win32` : `posix`]
    const localPath = filePath.replaceAll(path.sep, locale.sep)
    return localPath
}

export default convertMarkdownToPdf