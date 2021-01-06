import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


export default function EvalBox(props) {
  const { evalState } = props
  const classes = useStyles();

  return (
    <div className={classes.detailBox}>
      <div className={classes.row}>
        <div className={classes.title} style={{ opacity: 0 }}>啦</div>
        <div className={classes.ele}>优</div>
        <div className={classes.ele}>良</div>
        <div className={classes.ele}>中</div>
        <div className={classes.ele}>差</div>
      </div>

      {
        ['德', '体', '能'].map((name, nameIndex) => {
          return (
            <div className={classes.row} key={nameIndex} >
              <div className={classes.title}>{name}</div>
              {
                evalState[nameIndex]['status'].map((info, infoIndex) => {
                  const { checked, max, min, type } = info
                  let cls = classes.ele
                  let alt = ''
                  if (infoIndex < 2) {
                    if (checked < min && type !== '优') {
                      alt = '少'
                      cls = classes.redEle
                    }
                    else if (checked > max) {
                      alt = '多'
                      cls = classes.redEle
                    }
                  }
                  else {
                    const zhongchaNum = evalState[nameIndex]['status'][2]['checked'] + evalState[nameIndex]['status'][3]['checked']
                    if (zhongchaNum < min) {
                      alt = '少'
                      cls = classes.redEle
                    }
                    else if (zhongchaNum > max) {
                      alt = '多'
                      cls = classes.redEle
                    }
                  }

                  return <div className={cls} key={`a${infoIndex}`}>{`${checked} ${alt}`}</div>
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  detailBox: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #eeeeee',
    paddingBottom: 4,
    paddingTop: 6,
  },
  title: {
    flex: 3,
    fontSize: 14,
    color: '#202124',
  },
  ele: {
    flex: 2,
    fontSize: 14,
    color: '#202124',
  },
  redEle: {
    flex: 2,
    fontSize: 14,
    color: '#fe543e',
  },
}));
