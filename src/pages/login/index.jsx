import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as actions from '../../actions'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Link from '@material-ui/core/Link';

import { get, post } from '../../utils/request'
import { config } from '../../config/config.default'
import rsaEncrypt from '../../utils/rsaEncrypt'
import WhatsPwdDialog from './coms/WhatsPwdDialog'
import Copyright from '../../coms/Copyright'

// 验证学号密码
const vertifyUser = async ({ username, password }) => {
  if (config.verify) {
    const res = await post({
      path: '/api/account',
      data: config.verifyRSA ? { params: rsaEncrypt({ username, password }) } : { username, password },
      login: true
    })
    if (res.success) {
      return res.userInfo
    }
    throw new Error(res.msg ? res.msg : '验证失败，请稍后再试')
  }
  return null

}

// 获取互评需要的token
const getToken = async ({ sno }) => {
  const res = await post({
    path: '/api/login/stu/v2',
    params: config.snoRSA ? { sno: rsaEncrypt(sno, 'sno') } : { sno }
  })
  if (res.success) {
    return res.data
  }
  throw new Error(res.message ? res.message : '获取token失败')
}

// 检测互评开启状态
const checkStatus = async ({ token }) => {
  const res = await get({
    path: '/api/student/evaluate',
    params: { Authorization: token },
  })
  if (res.code === 2000) {
    return { token, ...res.data }
  }
  throw new Error(res.message ? res.message : '获取互评状态失败')
}


export default function Login() {
  const classes = useStyles();
  const [usernameState, setUsernameState] = useState({
    value: '',
    error: false,
    helperText: '',
  })
  const [passwordState, setPasswordState] = useState({
    value: '',
    error: false,
    helperText: '',
  })
  const [alertState, setAlertState] = useState({
    open: false,
    severity: 'error',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [showPwd, setShowPwd] = useState(false)
  const [whatsPwd, setWhatsPwd] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()

  const handleSubmit = () => {
    const { value: username } = usernameState
    const { value: password } = passwordState
    setUsernameState({ ...usernameState, error: false, helperText: '' })
    setPasswordState({ ...passwordState, error: false, helperText: '' })
    if (!username) {
      setUsernameState({ error: true, helperText: '请输入学号' })
      return
    }
    if (!password) {
      setPasswordState({ error: true, helperText: '请输入密码' })
      return
    }
    setLoading(true)
    // 先请求验证接口，再通过学号获取token，再判断互评开启状态
    vertifyUser({ username, password })
      .then(userInfo =>
        getToken({ sno: username })
          .then(token =>
            checkStatus({ token })
              .then(res => {
                // console.log(res)
                const { msg } = res
                dispatch(actions.updateCheckInfo({
                  ...userInfo,
                  ...res,
                }))
                if (msg.indexOf('已提交') !== -1) {
                  history.push('/finished')
                } else {
                  history.push('/check-info')
                }
              })
          )
      )
      .catch(e => {
        setAlertState({ open: true, severity: 'error', message: e.toString() })
        setLoading(false)
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.header}>
          <Typography variant="h4" className={classes.title}>
            登录
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            请使用教务系统账号登录
          </Typography>
        </div>

        <div className={classes.content}>
          <CustomTextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="学号"
            // defaultValue={usernameState.value}
            value={usernameState.value}
            error={usernameState.error}
            helperText={usernameState.helperText}
            onChange={e => setUsernameState({ value: e.target.value })}
          />
          <CustomTextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="密码"
            type={showPwd ? 'text' : 'password'}
            // defaultValue={passwordState.value}
            value={passwordState.value}
            error={passwordState.error}
            helperText={passwordState.helperText}
            onChange={e => setPasswordState({ value: e.target.value })}
            InputProps={{
              endAdornment: (<InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPwd(!showPwd)}
                >
                  {showPwd ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>)
            }}
          />
          <Link style={{ float: 'right', color: '#096dd9' }} onClick={() => setWhatsPwd(true)} >
            这是什么密码？
          </Link>
          <CustomButton
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            登录
          </CustomButton>
        </div>

        <Copyright />
      </div>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={alertState.open}
        autoHideDuration={2000}
        onClose={() => setAlertState({ ...alertState, open: false })}>
        <Alert onClose={() => setAlertState({ ...alertState, open: false })} severity={alertState.severity}>
          {alertState.message}
        </Alert>
      </Snackbar>

      <WhatsPwdDialog
        whatsPwd={whatsPwd}
        setWhatsPwd={setWhatsPwd}
      />

      <Backdrop className={classes.backdrop} open={loading} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#0089FF',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#0089FF',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#0089FFa3',
      },
    },
  },
})(TextField);

const CustomButton = withStyles((theme) => ({
  root: {
    height: theme.spacing(7),
    margin: theme.spacing(8, 0, 2),
    fontSize: 17,
    backgroundColor: '#0089FFdd',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#0089FF',
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  header: {
    width: '100%',
    marginBottom: theme.spacing(6),
  },
  title: {
    color: '#202124',
    marginBottom: theme.spacing(0.5),
  },
  subtitle: {
    color: '#919499',
  },
  paper: {
    height: theme.spacing(68),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingTop: '10vh',
    paddingLeft: theme.spacing(3.5),
    paddingRight: theme.spacing(3.5),
    paddingBottom: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
