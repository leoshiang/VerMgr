const { program } = require('commander')
const fs = require('fs')

program
    .option('-p, --printOnly', '只顯示本版號碼，不遞增版號。')
    .argument('<jsonFileName>', '版本設定檔案名稱(*.json)。')
    .action(function(jsonFileName, options) {
        main(jsonFileName, options)
    })
    .parse(process.argv);

function main (jsonFileName, options) {
    if (!fs.existsSync(jsonFileName)) {
        console.error(`檔案 ${jsonFileName} 不存在!`)
        process.exit(1)
    }
    fs.readFile(jsonFileName, function (err, content) {
        if (err) throw err
        const metadata = JSON.parse(content.toString())
        if (!options.printOnly) {
            metadata.buildRevision = metadata.buildRevision + 1
        }
        const now = new Date()
        metadata.buildTime = [
            now.getFullYear(),
            ('0' + (now.getMonth() + 1)).slice(-2),
            ('0' + now.getDate()).slice(-2)
        ].join('')

        const currentVersionNumber = `${metadata.buildMajor}.${metadata.buildMinor}.${metadata.buildRevision}-${metadata.buildTag}-${metadata.buildTime}`

        if (options.printOnly) {
            console.log(currentVersionNumber)
        } else {
            fs.writeFile(jsonFileName, JSON.stringify(metadata), function (err) {
                if (err) throw err
                const currentVersionNumber = `${metadata.buildMajor}.${metadata.buildMinor}.${metadata.buildRevision}-${metadata.buildTag}-${metadata.buildTime}`
                console.log(currentVersionNumber)
            })
        }
    })
}