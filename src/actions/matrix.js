import { post } from '../utils/request'
import _ from 'lodash'

export const updateMatrix = (payload) => {
  return { type: 'update_matrix', payload }
}

export const matrixSubmit = (matrix, stuList, token) => async (dispatch) => {
  const stuIDs = _.keys(matrix)
  const subInfo = []
  stuIDs.map(stuId => {
    const singleStu = { sid: stuId }
    const stuMatrix = matrix[stuId]
    stuMatrix.map((row, rIndex) => {
      row.map((ele, eIndex) => {
        if (ele) {
          let score = 85
          switch (eIndex) {
            case 0:
              score = 95
              break;
            case 1:
              score = 85
              break;
            case 2:
              score = 70
              break;
            case 3:
              score = 60
              break;
            default:
              break;
          }
          switch (rIndex) {
            case 0:
              singleStu.morality = score
              break;
            case 1:
              singleStu.physical = score
              break;
            case 2:
              singleStu.ability = score
              break;
          
            default:
              break;
          }
        }
        return null
      })
      return null
    })
    subInfo.push(singleStu)
    return null
  })

  const emptyStu = subInfo.filter(singleStu => !singleStu.morality || !singleStu.physical || !singleStu.ability)[0]
  
  if (emptyStu) {
    const emptyStuName = _.find(stuList, function(stu) { return JSON.stringify(stu.id) === emptyStu.sid }).name
    return {
      success: false,
      message: `${emptyStuName} 没有填写完全`,
    }
  }

  const res = await post({
    path: '/api/student/evaluate',
    params: { Authorization: token },
    data: JSON.stringify(subInfo),
    type: 'json',
  })
  if (res.success) {
    dispatch({ type: 'empty_matrix' })
  }
  return res
}
