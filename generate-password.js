// 密码哈希生成工具
function generatePasswordHash(password) {
    function _0x7d3c(_0x5e8f) {
        let _0x9a1c = '';
        for (let i = 0; i < _0x5e8f.length; i++) {
            _0x9a1c += ('0' + _0x5e8f.charCodeAt(i).toString(16)).slice(-2);
        }
        return _0x9a1c;
    }
    
    function _0x2f9b(_0x6c4d) {
        let _0x8e2a = 0;
        for (let i = 0; i < _0x6c4d.length; i++) {
            _0x8e2a = ((_0x8e2a << 5) - _0x8e2a) + _0x6c4d.charCodeAt(i);
            _0x8e2a = _0x8e2a & _0x8e2a;
        }
        return Math.abs(_0x8e2a).toString(36);
    }
    
    const _0x7a9b = _0x7d3c(password);
    const _0x4c2e = _0x2f9b(_0x7a9b);
    return Buffer.from(_0x4c2e + '::' + _0x7a9b).toString('base64');
}
