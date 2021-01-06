import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


export default function Copyright(props) {
  const { join } = props
  const classes = useStyles();
  const [invisible, setInvisible] = useState(false)

  window.onresize = function () {
    const height = window.innerHeight
    if (height < 500) {
      setInvisible(true)
    } else {
      setInvisible(false)
    }
  }

  if (invisible) {
    return null
  }
  
  return (
    <div className={classes.copyright}>
      {
        join ?
          <div className={classes.abox}>
            <a className={classes.a} href="https://qm.qq.com/cgi-bin/qm/qr?k=F1UbJ05aVnPwgM4X_4VoJKuJgSEXrWNR&jump_from=webapi">加入反馈群</a>
            <div className={classes.line}></div>
            <a className={classes.a} href="https://qm.qq.com/cgi-bin/qm/qr?k=40QdPFbnbr-h9-LdPOmwbhfW5E2gTLDa&jump_from=webapi">加入我们</a>
          </div>
          :
          <a className={classes.a} href="https://qm.qq.com/cgi-bin/qm/qr?k=F1UbJ05aVnPwgM4X_4VoJKuJgSEXrWNR&jump_from=webapi">加入反馈群</a>
      }
      <Typography className={classes.online} variant="body2" color="textSecondary" align="center">
        Powered by ©2020 HFUTonline
      </Typography>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  copyright: {
    position: 'fixed',
    bottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  a: {
    color: '#0089FF',
    textDecoration: 'none',
  },
  abox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  online: {
    marginTop: theme.spacing(1),
  },
  line: {
    height: 13,
    width: 1,
    marginLeft: 14,
    marginRight: 14,
    backgroundColor: '#aaaaaa'
  },
}));
