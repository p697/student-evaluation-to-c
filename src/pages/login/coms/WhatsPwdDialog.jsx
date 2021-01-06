import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default (props) => {
  const { whatsPwd, setWhatsPwd } = props

  return (
    <Dialog
      open={whatsPwd}
      onClose={() => setWhatsPwd(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">这是什么密码？</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <p>这是学校教务系统的密码，也是你登录教务app的密码，默认为身份证后6位。如果你忘记了你的密码，可以<a style={{ color: '#096dd9', textDecoration: 'none' }} href="https://qm.qq.com/cgi-bin/qm/qr?k=F1UbJ05aVnPwgM4X_4VoJKuJgSEXrWNR&jump_from=webapi">加入反馈群</a>获取帮助。</p>
          </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button href="https://qm.qq.com/cgi-bin/qm/qr?k=F1UbJ05aVnPwgM4X_4VoJKuJgSEXrWNR&jump_from=webapi" style={{ color: '#0089FF' }} >
        加入反馈群
          </Button>
        <Button onClick={() => setWhatsPwd(false)} style={{ color: '#0089FF' }} >
          关闭
          </Button>
      </DialogActions>
    </Dialog>
  )
}
