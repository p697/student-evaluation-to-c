import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Copyright from '../../coms/Copyright'
import finishedImg from '../../assets/finished.svg'

export default function CheckInfo() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.header}>
          <img className={classes.finishedImg} src={finishedImg} alt='' />
          <div className={classes.title}>互评已完成</div>
        </div>

        <div className={classes.content}>
          <div className={classes.welcome}>
            明理苑2020届秋招开始啦！我们是教育部直属网络文化工作室、HFUTonline的开发者，如果你也对互联网开发感兴趣，欢迎加入我们发挥你的价值！
          </div>
        </div>

        <Copyright join={true} />
      </div>

    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(6),
  },
  title: {
    fontSize: 18,
    color: '#919499'
  },
  paper: {
    height: '85vh',
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
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishedImg: {
    width: theme.spacing(36)
  },
  welcome: {
    color: '#919499',
    backgroundColor: '#F4F5F6',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
  }

}));
