import React, { useState, useEffect, useContext, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as actions from '../../actions'
import Container from '@material-ui/core/Container';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Skeleton from '@material-ui/lab/Skeleton';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import EvalBox from './coms/EvalBox'
import DetailBox from './coms/DetailBox'
import RemindDialog from './coms/RemindDialog'
import { AppContext } from '../../App'
import { get } from '../../utils/request'
import translation from './coms/translation'

const MemoEvalBox = memo(EvalBox)
const MemoRemindDialog = memo(RemindDialog)

export default function Evaluation() {
  const { userInfo, setUserInfo } = useContext(AppContext)
  const { token, sno: userSno } = userInfo
  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory()
  const matrix = useSelector(state => state.matrix.matrix)
  const [evalState, setEvalState] = useState([])
  const [stuList, setStulist] = useState([])
  const [alertState, setAlertState] = useState({
    open: true,
    severity: 'success',
    message: '即将进入互评',
  })
  const [loading, setLoading] = useState(false)
  const [remind, setRemind] = useState(true)

  useEffect(() => {
    get({
      path: '/api/student/clazz',
      params: { Authorization: token }
    })
      .then(res => {
        if (!res.success) {
          setAlertState({
            open: true,
            severity: 'error',
            message: res.message ? res.message : '获取班级信息失败'
          })
          setTimeout(() => {
            setUserInfo({ login: false })
          }, 2500);
          return null
        }
        setStulist(res.data.filter(stu => stu.sno !== userSno))
        setAlertState({
          open: true,
          severity: 'info',
          message: '互评开始',
        })
      })
  }, [token, userSno, setUserInfo])

  useEffect(() => {
    setEvalState(translation(matrix, stuList.length + 1))
  }, [matrix, stuList])

  // 点击提交后的验证
  const handleSubmit = async () => {
    const badChoice = {}
    evalState.map(row => {

      row['status'].map((info, infoIndex) => {
        const { checked, max, min, type } = info
        if (infoIndex < 2) {
          if (checked < min && type !== '优') {
            badChoice.name = row.name
            badChoice.type = type
            badChoice.alt = '少'
          }
          else if (checked > max) {
            badChoice.name = row.name
            badChoice.type = type
            badChoice.alt = '多'
          }
        }
        else {
          const zhongchaNum = row['status'][2]['checked'] + row['status'][3]['checked']
          if (zhongchaNum < min) {
            badChoice.name = row.name
            badChoice.type = '中差'
            badChoice.alt = '少'
          }
          else if (zhongchaNum > max) {
            badChoice.name = row.name
            badChoice.type = '中差'
            badChoice.alt = '多'
          }
        }
        return null
      })
      return null
    })

    const { name, type, alt } = badChoice
    if (alt) {
      setAlertState({
        open: true,
        severity: 'warning',
        message: `${name} 中选项为 ${type} 的人数过${alt}`
      })
    }
    else {
      setLoading(true)
      const res = await dispatch(actions.matrixSubmit(matrix, stuList, token))
      if (res.success) {
        // 互评提交成功
        setUserInfo({
          ...userInfo,
          token: null,
        })
        history.push('/finished')
      }
      else {
        setLoading(false)
        setAlertState({
          open: true,
          severity: 'error',
          message: res.message ? res.message : '互评提交出现问题！',
        })
      }
    }
  }

  // 未加载完成，显示骨架屏
  if (stuList.length === 0 || !stuList.length) {
    return (
      <Container component="main" maxWidth="xs">
        <Skeleton variant="text" width='100%' height='10vh' style={{ marginTop: 54 }} />
        <Skeleton variant="rect" width='100%' height='24vh' style={{ marginBottom: 16, borderRadius: 4 }} />
        <Skeleton variant="rect" width='100%' height='24vh' style={{ marginBottom: 16, borderRadius: 4 }} />
        <Skeleton variant="rect" width='100%' height='24vh' style={{ marginBottom: 16, borderRadius: 4 }} />
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={alertState.open}
          autoHideDuration={2000}
          onClose={() => setAlertState({ ...alertState, open: false })}>
          <Alert onClose={() => setAlertState({ ...alertState, open: false })} severity={alertState.severity}>
            {alertState.message}
          </Alert>
        </Snackbar>
      </Container>
    )
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.header}>
        <Accordion className={classes.detail}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            {
              evalState.length > 0 ?
                <div className={classes.headerContent}>
                  <div className={classes.headerText}>优：<span>{'< '}{evalState[0]['status'][0]['max'] + 1}</span></div>
                  <div className={classes.headerText}>良：<span>{evalState[0]['status'][1]['min']} ~ {evalState[0]['status'][1]['max']}</span></div>
                  <div className={classes.headerText}>中差：<span>{evalState[0]['status'][2]['min']} ~ {evalState[0]['status'][2]['max']}</span></div>
                  <div className={classes.headerDetail}>详情</div>
                </div>
                : null
            }

          </AccordionSummary>
          <AccordionDetails>
            <DetailBox evalState={evalState} />
          </AccordionDetails>
        </Accordion>
      </div>

      <div>
        {
          stuList.map(stu => <MemoEvalBox name={stu.name} stuId={stu.id} key={stu.sno} />)
        }
      </div>

      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={handleSubmit}
        disabled={loading}
      >
        提交
        </Button>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={alertState.open}
        autoHideDuration={2000}
        onClose={() => setAlertState({ ...alertState, open: false })}>
        <Alert onClose={() => setAlertState({ ...alertState, open: false })} severity={alertState.severity}>
          {alertState.message}
        </Alert>
      </Snackbar>

      <Backdrop className={classes.backdrop} open={loading} >
        <CircularProgress color="inherit" />
      </Backdrop>

      <MemoRemindDialog remind={remind} setRemind={setRemind} />

    </Container>
  )
}

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: 0,
    paddingBottom: 8,
  },
}))(MuiAccordionDetails);

const Accordion = withStyles((theme) => ({
  root: {
    boxShadow: '0 2px 2px #ddd',
  },
}))(MuiAccordion);

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  headerContent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 14,
  },
  headerDetail: {
    fontSize: 14,
    color: '#919499',
  },
  evalBox: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'red',
    minHeight: 200,
    width: '100%',
  },
  firstColumn: {
    flex: 3,
    backgroundColor: 'blue',
  },
  evalColumn: {
    flex: 2,
    backgroundColor: 'green',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  submit: {
    height: theme.spacing(7),
    margin: theme.spacing(3, 0, 2),
    marginBottom: 28,
    fontSize: 17,
    backgroundColor: '#0089FFdd',
  },
}));
