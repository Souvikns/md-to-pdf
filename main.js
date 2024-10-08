import arv from 'minimist'
import convertToPdf from './convertor.js'


const input = arv(process.argv.slice(2))
convertToPdf(input._[0])