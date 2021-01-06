import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default (props) => {
  const { remind, setRemind } = props

  return (
    <Dialog
      open={remind}
      onClose={() => setRemind(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">互评规则介绍</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <p>测评“优”的学生数不超过总人数的17%，测评“良”的学生数占总人数的60%～74%左右，测评“中”、“差”的学生数占总人数的9%～23%左右。</p>
          <p>进入互评系统后，可以根据上方的提示完成互评。</p>
          </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setRemind(false)} color="primary">
          我知道了
          </Button>
      </DialogActions>
    </Dialog>
  )
}
