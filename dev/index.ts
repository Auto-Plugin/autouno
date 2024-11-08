import 'virtual:uno.css'
const MaximumMatchKeyWordList = [
  'font-size$px',
  'line-height',
  'font-weight',
  'font-family',
  'display:flex',
  'bottom$px',
  'left$px',
  'right$px',
  'top$px',
  'display:flex',
  'width$px',
  'height$px',
  'margin$px',
  'padding$px',
  'border-radius$px',
  'border-width$px',
  'color',
  'background-color',
  'align-items:center'
]
export default function findBestMatch(input: string, customMaximumMatchKeyWordList: string[] = []) {
  // 将输入字符串转换为字符数组
  const inputChars = input.split('')

  let bestMatch: any = null
  let maxMatches = 0

  // 遍历所有目标字符串
  for (let keywordOrigin of MaximumMatchKeyWordList.concat(customMaximumMatchKeyWordList)) {
    const keyword = keywordOrigin.split('$')[0]
    // 用来记录目标字符串的字符序列是否匹配
    let matchCount = 0
    let inputIndex = 0

    // 遍历目标字符串
    for (let i = 0; i < keyword.length; i++) {
      // 如果第一个字符就不匹配，直接跳过
      if (i === 0 && keyword[i] !== inputChars[0]) {
        break
      }
      if (inputIndex < inputChars.length && keyword[i] === inputChars[inputIndex]) {
        matchCount++
        inputIndex++
      }
    }

    // 如果找到的匹配字符数大于等于 2，且比当前最大匹配数多
    if (matchCount >= 2 && matchCount > maxMatches) {
      maxMatches = matchCount
      bestMatch = keywordOrigin
    }
  }
  let unit: any = ''
  // 用正则匹配单位，最后一个数字的后面的字符
  const unitMatch = input.match(/(\d+)([a-zA-Z%]+)/)
  unit = unitMatch && unitMatch[2]
  if (!unit && bestMatch && bestMatch.split('$')[1]) {
    unit = bestMatch.split('$')[1]
  }
  return [bestMatch && bestMatch.split('$')[0], unit]
}