import { definePreset, PresetOrFactory } from 'unocss'

const propertyWithCustomValue = [
  "animation-delay$ms",
  "animation-duration$ms",
  "border-width$px",
  "bottom$px",
  "box-shadow$px",
  "color",
  "height$px",
  "left$px",
  "letter-spacing$px",
  "line-height$px",
  "margin$px",
  "margin-bottom$px",
  "margin-left$px",
  "margin-right$px",
  "margin-top$px",
  "max-height$px",
  "max-width$px",
  "min-height$px",
  "min-width$px",
  "padding$px",
  "padding-bottom$px",
  "padding-left$px",
  "padding-right$px",
  "padding-top$px",
  "right$px",
  "top$px",
  "transform$px",
  "transform-origin$px",
  "transition-delay$ms",
  "transition-duration$ms",
  "transition-timing-function$px",
  "width$px",
  "word-spacing$px",
  "z-index$px",
  "background-color",
  "border-color",
  "font-size$px",
  "font-weight$",
]

const propertyCommon = [
  "display: flex",
  "display: block",
  "display: inline",
  "display: inline-block",
  "display: grid",
  "display: none",
  "position: relative",
  "position: absolute",
  "position: fixed",
  "position: sticky",
  "float: left",
  "float: right",
  "clear: both",
  "outline: none",
  "overflow: hidden",
  "overflow: scroll",
  "overflow: auto",
  "visibility: visible",
  "visibility: hidden",
  "text-align: left",
  "text-align: center",
  "text-align: right",
  "font-weight: bold",
  "background-position: center",
  "background-repeat: no-repeat",
  "box-sizing: border-box",
  "cursor: pointer",
  "cursor: not-allowed",
  "cursor: move",
  "text-decoration: none",
  "text-decoration: underline",
  "white-space: nowrap",
  "visibility: visible",
  "transform-origin: center",
  "justify-content: center",
  "justify-content: space-between",
  "align-items: center",
  "align-self: flex-start",
  "resize: both",
  "user-select: none",
  "pointer-events: none",
  "backface-visibility: hidden",
  "scroll-behavior: smooth",
  "text-align-last: center",
  "table-layout: fixed",
  "word-break: break-all",
  "white-space: normal",
  "pointer-events: auto"
]
export function findBestMatch(input: string, customproperty: string[] = []) {
  // 将输入字符串转换为字符数组
  const inputChars = input.split('')

  let bestMatch: any = null
  let maxMatches = 0

  // 遍历所有目标字符串
  for (let keywordOrigin of customproperty.concat(propertyWithCustomValue.concat(propertyCommon))) {
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
      if (inputIndex < inputChars.length && keyword[i] === inputChars[inputIndex]
        && (input.includes(":") && keyword.includes(":") || (!input.includes(":")))) {
        matchCount++
        inputIndex++
      }
    }
    // 如果找到的匹配字符数大于等于 1，且比当前最大匹配数多
    if (matchCount >= 1 && matchCount > maxMatches) {
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
export default definePreset((customproperty: string[] = []): PresetOrFactory<object> => {
  return {
    name: 'my-preset',
    rules: [
      [
        /^[a-zA-Z]+(\d+)$/,
        ([a, d]) => {
          const [property, unit] = findBestMatch(a, customproperty)
          if (!property) return
          return { [property]: `${d || ''}${unit || ''}` }
        }
      ],
      [
        /^[a-zA-Z]+(\d+)+(vh|vw|px|rem|em|%)$/,
        ([a, d, u]) => {
          const [property] = findBestMatch(a, customproperty)
          if (!property) return
          return { [property]: `${d || ''}${u}` }
        }
      ],
      [
        /^[a-zA-Z-]+(#[a-zA-Z0-9]+)$/,
        ([a, c]) => {
          const [property] = findBestMatch(a, customproperty)
          if (!property) return
          return { [property]: c }
        }
      ],
      [
        /^[a-zA-Z]+:+[a-zA-Z]$/,
        ([a]) => {
          const [property] = findBestMatch(a, customproperty)
          if (!property) return
          const propertyName = property.split(':')[0]
          const propertyValue = property.split(':')[1]
          return { [propertyName]: propertyValue }
        }
      ],
    ]
  }
})
