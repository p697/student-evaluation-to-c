import pubKey from './pubKey'
const NodeRSA = require('node-rsa')

// 公钥加密
function rsaEncrypt(data, type = 'login') {
  const publicKey = type === 'login' ? pubKey.loginPubKey : pubKey.snoPubKey
  const nodersa = new NodeRSA(publicKey);
  nodersa.setOptions({ encryptionScheme: 'pkcs1' });
  const encrypted = nodersa.encrypt(data, 'base64');
  return encrypted;
}

export default rsaEncrypt
