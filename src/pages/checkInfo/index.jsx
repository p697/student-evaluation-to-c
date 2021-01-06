import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { AppContext } from '../../App'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Copyright from '../../coms/Copyright'

export default function CheckInfo() {
  const classes = useStyles();
  const history = useHistory()
  const { setUserInfo } = useContext(AppContext)
  const checkInfo = useSelector(state => state.checkInfo)

  console.log(checkInfo)

  const { isOpen, openTime, token, studentName, user_code, clazzName } = checkInfo

  useEffect(() => {
    setUserInfo({ login: true, sno: user_code, token })
  }, [user_code, token, setUserInfo])

  const handleStart = () => {
    history.push('/evaluation')
  }

  const openTimeStr = openTime ? moment(`${openTime[0]}-${openTime[1]}-${openTime[2]} ${openTime[3]}:${openTime[4]}:${openTime[5]}`, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') : '未设置'

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.header}>
          <Typography variant="h4" className={classes.title}>
          {
            isOpen ? '验证通过' : '信息核对'
          }
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            {
              isOpen ? '点击下方按钮开始互评' : '请将此页截图发给班长'
            }
          </Typography>
        </div>

        <div className={classes.content}>
          <CustomTextField
            variant="outlined"
            margin="normal"
            fullWidth
            disabled
            label="学号"
            value={user_code}
          />
          <CustomTextField
            variant="outlined"
            margin="normal"
            fullWidth
            disabled
            label="姓名"
            value={studentName}
          />
          <CustomTextField
            variant="outlined"
            margin="normal"
            fullWidth
            disabled
            label="班级"
            value={clazzName}
          />
          <CustomButton
            fullWidth
            variant="contained"
            color="primary"
            disabled={!isOpen}
            onClick={handleStart}
            className={classes.startBtn}
          >
            开始互评
          </CustomButton>
          {
            isOpen ? null : <div className={classes.startTime}>开启时间：{openTimeStr}</div>
          }
        </div>

        {
          window.innerHeight < 660 ? null : <Copyright />
        }
      </div>

    </Container>
  )
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
    margin: theme.spacing(5, 0, 2),
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
  startTime: {
    marginTop: theme.spacing(0.5),
    color: '#919499',
    textAlign: 'center',
  },
}));
