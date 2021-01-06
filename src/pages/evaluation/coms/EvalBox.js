import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import * as actions from '../../../actions'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';



export default function EvalBox(props) {
  const { name, stuId } = props
  const classes = useStyles();
  const dispatch = useDispatch()
  const [boxesState, setBoxesState] = useState([
    [false, true, false, false],
    [false, true, false, false],
    [false, true, false, false],
  ])

  // 初始化数据
  useEffect(() => {
    dispatch(actions.updateMatrix({ [stuId]: [
      [false, true, false, false],
      [false, true, false, false],
      [false, true, false, false],
    ] }))
  }, [stuId, dispatch])

  const handleClick = (e, coords) => {
    const status = e.target.checked
    const x = coords[0]
    const y = coords[1]
    let _boxesState = [...boxesState]
    if (!status) {
      _boxesState[x][y] = false
      setBoxesState(_boxesState)
      dispatch(actions.updateMatrix({ [stuId]: _boxesState }))
    }
    else {
      _boxesState[x] = _boxesState[x].map((s, i) => i === y ? true : false)
      setBoxesState(_boxesState)
      dispatch(actions.updateMatrix({ [stuId]: _boxesState }))
    }
  }

  return (
    <div className={classes.evalBox}>
      <div className={classes.firstColumn}>
        <div className={classes.firstName}>{name}</div>
        <div className={classes.firstTitle}>德</div>
        <div className={classes.firstTitle}>体</div>
        <div className={classes.firstTitle}>能</div>
      </div>
      <div className={classes.evalColumn}>
        <div className={classes.evalTitle}>优</div>
        <div><GreenCheckbox checked={boxesState[0][0]} onChange={e => handleClick(e, [0, 0])} icon={<CheckCircleOutlineRoundedIcon />} checkedIcon={<CheckCircleRoundedIcon />} /></div>
        <div><GreenCheckbox checked={boxesState[1][0]} onChange={e => handleClick(e, [1, 0])} icon={<CheckCircleOutlineRoundedIcon />} checkedIcon={<CheckCircleRoundedIcon />} /></div>
        <div><GreenCheckbox checked={boxesState[2][0]} onChange={e => handleClick(e, [2, 0])} icon={<CheckCircleOutlineRoundedIcon />} checkedIcon={<CheckCircleRoundedIcon />} /></div>
      </div>
      <div className={classes.evalColumn}>
        <div className={classes.evalTitle}>良</div>
        <div><BlueCheckbox checked={boxesState[0][1]} onChange={e => handleClick(e, [0, 1])} icon={<CheckCircleOutlineRoundedIcon />} checkedIcon={<CheckCircleRoundedIcon />} /></div>
        <div><BlueCheckbox checked={boxesState[1][1]} onChange={e => handleClick(e, [1, 1])} icon={<CheckCircleOutlineRoundedIcon />} checkedIcon={<CheckCircleRoundedIcon />} /></div>
        <div><BlueCheckbox checked={boxesState[2][1]} onChange={e => handleClick(e, [2, 1])} icon={<CheckCircleOutlineRoundedIcon />} checkedIcon={<CheckCircleRoundedIcon />} /></div>
      </div>
      <div className={classes.evalColumn}>
        <div className={classes.evalTitle}>中</div>
        <div><YellowCheckbox checked={boxesState[0][2]} onChange={e => handleClick(e, [0, 2])} icon={<CheckCircleOutlineRoundedIcon />} checkedIcon={<CheckCircleRoundedIcon />} /></div>
        <div><YellowCheckbox checked={boxesState[1][2]} onChange={e => handleClick(e, [1, 2])} icon={<CheckCircleOutlineRoundedIcon />} checkedIcon={<CheckCircleRoundedIcon />} /></div>
        <div><YellowCheckbox checked={boxesState[2][2]} onChange={e => handleClick(e, [2, 2])} icon={<CheckCircleOutlineRoundedIcon />} checkedIcon={<CheckCircleRoundedIcon />} /></div>
      </div>
      <div className={classes.evalColumn}>
        <div className={classes.evalTitle}>差</div>
        <div><RedCheckbox checked={boxesState[0][3]} onChange={e => handleClick(e, [0, 3])} icon={<CheckCircleOutlineRoundedIcon />} checkedIcon={<CheckCircleRoundedIcon />} /></div>
        <div><RedCheckbox checked={boxesState[1][3]} onChange={e => handleClick(e, [1, 3])} icon={<CheckCircleOutlineRoundedIcon />} checkedIcon={<CheckCircleRoundedIcon />} /></div>
        <div><RedCheckbox checked={boxesState[2][3]} onChange={e => handleClick(e, [2, 3])} icon={<CheckCircleOutlineRoundedIcon />} checkedIcon={<CheckCircleRoundedIcon />} /></div>
      </div>
    </div>
  )
}

const GreenCheckbox = withStyles({
  root: {
    color: '#04D8B7',
    '&$checked': {
      color: '#04D8B7',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const BlueCheckbox = withStyles({
  root: {
    color: '#0089FF',
    '&$checked': {
      color: '#0089FF',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const YellowCheckbox = withStyles({
  root: {
    color: '#FEAA0C',
    '&$checked': {
      color: '#FEAA0C',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const RedCheckbox = withStyles({
  root: {
    color: '#FE543E',
    '&$checked': {
      color: '#FE543E',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  evalBox: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: 180,
    paddingTop: 9,
    width: '100%',
    paddingBottom: 4,
    borderBottom: '1px solid #eeeeee',
  },
  firstColumn: {
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingLeft: 16,
  },
  firstName: {
    fontSize: 18,
    color: '#202124'
  },
  firstTitle: {
    paddingTop: 10,
    paddingBottom: 11,
    fontSize: 15,
    color: '#919499',
  },
  evalColumn: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  evalTitle: {
    fontSize: 15,
    color: '#919499',
  },
}));
