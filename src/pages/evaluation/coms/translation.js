import _ from 'lodash'

export default (evalState, stuNum) => {
  const youMax = Math.floor(stuNum * 0.17)
  const youMin = 0
  const liangMax = Math.ceil(stuNum * 0.74)
  const liangMin = Math.floor(stuNum * 0.6)

  const zhongChaMax = Math.floor(stuNum * 0.23)
  const zhongChaMin = stuNum - liangMax - youMax

  const translatedState = ['德', '体', '能'].map(name => ({
    name,
    status: [
      {
        type: '优',
        checked: 0,
        max: youMax,
        min: youMin,
      },
      {
        type: '良',
        checked: 0,
        max: liangMax,
        min: liangMin,
      },
      {
        type: '中',
        checked: 0,
        max: zhongChaMax,
        min: zhongChaMin,
      },
      {
        type: '差',
        checked: 0,
        max: zhongChaMax,
        min: zhongChaMin,
      },
    ],
  }))

  _.mapKeys(evalState, (matrix) => {
    return matrix.map((row, rowIndex) => {
      return row.map((ele, eleIndex) => {
        if (ele) {
          translatedState[rowIndex]['status'][eleIndex].checked ++
        }
        return null
      })
    })
  })
  
  return translatedState
}