/**
 * Simple static template
 *
 * This simple template engine for static websites,
 * looks for html files in the reserved folder /t
 * and for each file in the current folder
 * replaces <!-- {TeampleFileName} --> {whatever} <!-- /{TemplateFileName} -->
 */
var fs = require('fs')

const replace = (targetContent, templateName, openMark, closeMark) => {
  const mark = new RegExp(`${openMark}((?:.|[\n\r])+)${closeMark}`, 'g')
  let template = fs.readFileSync(`t/${templateName}.html`, "utf8");
  template = `${openMark}
${template}
${closeMark}`
  return targetContent.replace(mark, template)
}

fs.readdirSync('./t').forEach(templateFile => {
  const templateName = templateFile.replace('.html', '')
  const openMark =`<!-- ${templateName} -->`
  const closeMark = `<!-- \/${templateName} -->`

  fs.readdirSync('./').forEach(targetFile=> {
    if(!targetFile.includes('.html')) return;
    let content = fs.readFileSync(targetFile, "utf8");
    if (content.includes(openMark) && content.includes(closeMark))  {
      replace(content, templateName, openMark, closeMark)
    }
  })
})
