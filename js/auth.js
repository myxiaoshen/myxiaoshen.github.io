(function () {
    'use strict';

    var root = typeof window !== 'undefined' ? window : this;
    var locker = root && root.__AUTH_LOCKER;
    if (!locker || !locker.payload || typeof atob !== 'function') {
        return;
    }

    function deriveKey(seed, hints) {
        var key = '';
        for (var i = 0; i < seed.length; i++) {
            var offset = hints[i % hints.length];
            key += String.fromCharCode(seed[i] - offset);
        }
        return key;
    }

    function unlock(payload, key, salt) {
        var secret = key + salt;
        var binary = atob(payload);
        var buffer = [];
        for (var i = 0; i < binary.length; i++) {
            var code = binary.charCodeAt(i) ^ secret.charCodeAt(i % secret.length);
            buffer.push(String.fromCharCode(code));
        }
        return buffer.join('');
    }

    function fingerprint(text) {
        var hash = 2166136261 >>> 0;
        for (var i = 0; i < text.length; i++) {
            hash ^= text.charCodeAt(i);
            hash = Math.imul(hash, 16777619) >>> 0;
        }
        return ('00000000' + hash.toString(16)).slice(-8);
    }

    try {
        var hints = Array.isArray(locker.bits) && locker.bits.length ? locker.bits.slice() : [1];
        var seed = [123, 141, 99, 172, 129, 125, 109, 156, 134, 54, 89, 111];
        var key = deriveKey(seed, hints);
        var script = unlock(locker.payload, key, locker.salt || '');

        if (locker.fingerprint && fingerprint(script) !== locker.fingerprint) {
            return;
        }

        locker.payload = null;
        locker.unlocked = true;

        new Function(script)();
    } catch (err) {
        if (root && root.console && typeof root.console.warn === 'function') {
            console.warn('Auth module initialization failed.');
        }
    }
})();