if(1===1){ // CryptoJS

var CryptoJS=CryptoJS||function(u,p){var d={},l=d.lib={},s=function(){},t=l.Base={extend:function(a){s.prototype=this;var c=new s;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
r=l.WordArray=t.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=p?c:4*a.length},toString:function(a){return(a||v).stringify(this)},concat:function(a){var c=this.words,e=a.words,j=this.sigBytes;a=a.sigBytes;this.clamp();if(j%4)for(var k=0;k<a;k++)c[j+k>>>2]|=(e[k>>>2]>>>24-8*(k%4)&255)<<24-8*((j+k)%4);else if(65535<e.length)for(k=0;k<a;k+=4)c[j+k>>>2]=e[k>>>2];else c.push.apply(c,e);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=u.ceil(c/4)},clone:function(){var a=t.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],e=0;e<a;e+=4)c.push(4294967296*u.random()|0);return new r.init(c,a)}}),w=d.enc={},v=w.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++){var k=c[j>>>2]>>>24-8*(j%4)&255;e.push((k>>>4).toString(16));e.push((k&15).toString(16))}return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j+=2)e[j>>>3]|=parseInt(a.substr(j,
2),16)<<24-4*(j%8);return new r.init(e,c/2)}},b=w.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++)e.push(String.fromCharCode(c[j>>>2]>>>24-8*(j%4)&255));return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j++)e[j>>>2]|=(a.charCodeAt(j)&255)<<24-8*(j%4);return new r.init(e,c)}},x=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(b.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return b.parse(unescape(encodeURIComponent(a)))}},
q=l.BufferedBlockAlgorithm=t.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=x.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,e=c.words,j=c.sigBytes,k=this.blockSize,b=j/(4*k),b=a?u.ceil(b):u.max((b|0)-this._minBufferSize,0);a=b*k;j=u.min(4*a,j);if(a){for(var q=0;q<a;q+=k)this._doProcessBlock(e,q);q=e.splice(0,a);c.sigBytes-=j}return new r.init(q,j)},clone:function(){var a=t.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=q.extend({cfg:t.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){q.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,e){return(new a.init(e)).finalize(b)}},_createHmacHelper:function(a){return function(b,e){return(new n.HMAC.init(a,
e)).finalize(b)}}});var n=d.algo={};return d}(Math);
(function(){var u=CryptoJS,p=u.lib.WordArray;u.enc.Base64={stringify:function(d){var l=d.words,p=d.sigBytes,t=this._map;d.clamp();d=[];for(var r=0;r<p;r+=3)for(var w=(l[r>>>2]>>>24-8*(r%4)&255)<<16|(l[r+1>>>2]>>>24-8*((r+1)%4)&255)<<8|l[r+2>>>2]>>>24-8*((r+2)%4)&255,v=0;4>v&&r+0.75*v<p;v++)d.push(t.charAt(w>>>6*(3-v)&63));if(l=t.charAt(64))for(;d.length%4;)d.push(l);return d.join("")},parse:function(d){var l=d.length,s=this._map,t=s.charAt(64);t&&(t=d.indexOf(t),-1!=t&&(l=t));for(var t=[],r=0,w=0;w<
l;w++)if(w%4){var v=s.indexOf(d.charAt(w-1))<<2*(w%4),b=s.indexOf(d.charAt(w))>>>6-2*(w%4);t[r>>>2]|=(v|b)<<24-8*(r%4);r++}return p.create(t,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
(function(u){function p(b,n,a,c,e,j,k){b=b+(n&a|~n&c)+e+k;return(b<<j|b>>>32-j)+n}function d(b,n,a,c,e,j,k){b=b+(n&c|a&~c)+e+k;return(b<<j|b>>>32-j)+n}function l(b,n,a,c,e,j,k){b=b+(n^a^c)+e+k;return(b<<j|b>>>32-j)+n}function s(b,n,a,c,e,j,k){b=b+(a^(n|~c))+e+k;return(b<<j|b>>>32-j)+n}for(var t=CryptoJS,r=t.lib,w=r.WordArray,v=r.Hasher,r=t.algo,b=[],x=0;64>x;x++)b[x]=4294967296*u.abs(u.sin(x+1))|0;r=r.MD5=v.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(q,n){for(var a=0;16>a;a++){var c=n+a,e=q[c];q[c]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360}var a=this._hash.words,c=q[n+0],e=q[n+1],j=q[n+2],k=q[n+3],z=q[n+4],r=q[n+5],t=q[n+6],w=q[n+7],v=q[n+8],A=q[n+9],B=q[n+10],C=q[n+11],u=q[n+12],D=q[n+13],E=q[n+14],x=q[n+15],f=a[0],m=a[1],g=a[2],h=a[3],f=p(f,m,g,h,c,7,b[0]),h=p(h,f,m,g,e,12,b[1]),g=p(g,h,f,m,j,17,b[2]),m=p(m,g,h,f,k,22,b[3]),f=p(f,m,g,h,z,7,b[4]),h=p(h,f,m,g,r,12,b[5]),g=p(g,h,f,m,t,17,b[6]),m=p(m,g,h,f,w,22,b[7]),
f=p(f,m,g,h,v,7,b[8]),h=p(h,f,m,g,A,12,b[9]),g=p(g,h,f,m,B,17,b[10]),m=p(m,g,h,f,C,22,b[11]),f=p(f,m,g,h,u,7,b[12]),h=p(h,f,m,g,D,12,b[13]),g=p(g,h,f,m,E,17,b[14]),m=p(m,g,h,f,x,22,b[15]),f=d(f,m,g,h,e,5,b[16]),h=d(h,f,m,g,t,9,b[17]),g=d(g,h,f,m,C,14,b[18]),m=d(m,g,h,f,c,20,b[19]),f=d(f,m,g,h,r,5,b[20]),h=d(h,f,m,g,B,9,b[21]),g=d(g,h,f,m,x,14,b[22]),m=d(m,g,h,f,z,20,b[23]),f=d(f,m,g,h,A,5,b[24]),h=d(h,f,m,g,E,9,b[25]),g=d(g,h,f,m,k,14,b[26]),m=d(m,g,h,f,v,20,b[27]),f=d(f,m,g,h,D,5,b[28]),h=d(h,f,
m,g,j,9,b[29]),g=d(g,h,f,m,w,14,b[30]),m=d(m,g,h,f,u,20,b[31]),f=l(f,m,g,h,r,4,b[32]),h=l(h,f,m,g,v,11,b[33]),g=l(g,h,f,m,C,16,b[34]),m=l(m,g,h,f,E,23,b[35]),f=l(f,m,g,h,e,4,b[36]),h=l(h,f,m,g,z,11,b[37]),g=l(g,h,f,m,w,16,b[38]),m=l(m,g,h,f,B,23,b[39]),f=l(f,m,g,h,D,4,b[40]),h=l(h,f,m,g,c,11,b[41]),g=l(g,h,f,m,k,16,b[42]),m=l(m,g,h,f,t,23,b[43]),f=l(f,m,g,h,A,4,b[44]),h=l(h,f,m,g,u,11,b[45]),g=l(g,h,f,m,x,16,b[46]),m=l(m,g,h,f,j,23,b[47]),f=s(f,m,g,h,c,6,b[48]),h=s(h,f,m,g,w,10,b[49]),g=s(g,h,f,m,
E,15,b[50]),m=s(m,g,h,f,r,21,b[51]),f=s(f,m,g,h,u,6,b[52]),h=s(h,f,m,g,k,10,b[53]),g=s(g,h,f,m,B,15,b[54]),m=s(m,g,h,f,e,21,b[55]),f=s(f,m,g,h,v,6,b[56]),h=s(h,f,m,g,x,10,b[57]),g=s(g,h,f,m,t,15,b[58]),m=s(m,g,h,f,D,21,b[59]),f=s(f,m,g,h,z,6,b[60]),h=s(h,f,m,g,C,10,b[61]),g=s(g,h,f,m,j,15,b[62]),m=s(m,g,h,f,A,21,b[63]);a[0]=a[0]+f|0;a[1]=a[1]+m|0;a[2]=a[2]+g|0;a[3]=a[3]+h|0},_doFinalize:function(){var b=this._data,n=b.words,a=8*this._nDataBytes,c=8*b.sigBytes;n[c>>>5]|=128<<24-c%32;var e=u.floor(a/
4294967296);n[(c+64>>>9<<4)+15]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360;n[(c+64>>>9<<4)+14]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;b.sigBytes=4*(n.length+1);this._process();b=this._hash;n=b.words;for(a=0;4>a;a++)c=n[a],n[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return b},clone:function(){var b=v.clone.call(this);b._hash=this._hash.clone();return b}});t.MD5=v._createHelper(r);t.HmacMD5=v._createHmacHelper(r)})(Math);
(function(){var u=CryptoJS,p=u.lib,d=p.Base,l=p.WordArray,p=u.algo,s=p.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:p.MD5,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,r){for(var p=this.cfg,s=p.hasher.create(),b=l.create(),u=b.words,q=p.keySize,p=p.iterations;u.length<q;){n&&s.update(n);var n=s.update(d).finalize(r);s.reset();for(var a=1;a<p;a++)n=s.finalize(n),s.reset();b.concat(n)}b.sigBytes=4*q;return b}});u.EvpKDF=function(d,l,p){return s.create(p).compute(d,
l)}})();
CryptoJS.lib.Cipher||function(u){var p=CryptoJS,d=p.lib,l=d.Base,s=d.WordArray,t=d.BufferedBlockAlgorithm,r=p.enc.Base64,w=p.algo.EvpKDF,v=d.Cipher=t.extend({cfg:l.extend(),createEncryptor:function(e,a){return this.create(this._ENC_XFORM_MODE,e,a)},createDecryptor:function(e,a){return this.create(this._DEC_XFORM_MODE,e,a)},init:function(e,a,b){this.cfg=this.cfg.extend(b);this._xformMode=e;this._key=a;this.reset()},reset:function(){t.reset.call(this);this._doReset()},process:function(e){this._append(e);return this._process()},
finalize:function(e){e&&this._append(e);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(b,k,d){return("string"==typeof k?c:a).encrypt(e,b,k,d)},decrypt:function(b,k,d){return("string"==typeof k?c:a).decrypt(e,b,k,d)}}}});d.StreamCipher=v.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var b=p.mode={},x=function(e,a,b){var c=this._iv;c?this._iv=u:c=this._prevBlock;for(var d=0;d<b;d++)e[a+d]^=
c[d]},q=(d.BlockCipherMode=l.extend({createEncryptor:function(e,a){return this.Encryptor.create(e,a)},createDecryptor:function(e,a){return this.Decryptor.create(e,a)},init:function(e,a){this._cipher=e;this._iv=a}})).extend();q.Encryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize;x.call(this,e,a,c);b.encryptBlock(e,a);this._prevBlock=e.slice(a,a+c)}});q.Decryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize,d=e.slice(a,a+c);b.decryptBlock(e,a);x.call(this,
e,a,c);this._prevBlock=d}});b=b.CBC=q;q=(p.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,l=[],n=0;n<c;n+=4)l.push(d);c=s.create(l,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};d.BlockCipher=v.extend({cfg:v.cfg.extend({mode:b,padding:q}),reset:function(){v.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;this._mode=c.call(a,
this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var n=d.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),b=(p.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?s.create([1398893684,
1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=s.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16}return n.create({ciphertext:a,salt:c})}},a=d.SerializableCipher=l.extend({cfg:l.extend({format:b}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var l=a.createEncryptor(c,d);b=l.finalize(b);l=l.cfg;return n.create({ciphertext:b,key:c,iv:l.iv,algorithm:a,mode:l.mode,padding:l.padding,blockSize:a.blockSize,formatter:d.format})},
decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),p=(p.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=s.random(8));a=w.create({keySize:b+c}).compute(a,d);c=s.create(a.words.slice(b),4*c);a.sigBytes=4*b;return n.create({key:a,iv:c,salt:d})}},c=d.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:p}),encrypt:function(b,c,d,l){l=this.cfg.extend(l);d=l.kdf.execute(d,
b.keySize,b.ivSize);l.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,l);b.mixIn(d);return b},decrypt:function(b,c,d,l){l=this.cfg.extend(l);c=this._parse(c,l.format);d=l.kdf.execute(d,b.keySize,b.ivSize,c.salt);l.iv=d.iv;return a.decrypt.call(this,b,c,d.key,l)}})}();
(function(){for(var u=CryptoJS,p=u.lib.BlockCipher,d=u.algo,l=[],s=[],t=[],r=[],w=[],v=[],b=[],x=[],q=[],n=[],a=[],c=0;256>c;c++)a[c]=128>c?c<<1:c<<1^283;for(var e=0,j=0,c=0;256>c;c++){var k=j^j<<1^j<<2^j<<3^j<<4,k=k>>>8^k&255^99;l[e]=k;s[k]=e;var z=a[e],F=a[z],G=a[F],y=257*a[k]^16843008*k;t[e]=y<<24|y>>>8;r[e]=y<<16|y>>>16;w[e]=y<<8|y>>>24;v[e]=y;y=16843009*G^65537*F^257*z^16843008*e;b[k]=y<<24|y>>>8;x[k]=y<<16|y>>>16;q[k]=y<<8|y>>>24;n[k]=y;e?(e=z^a[a[a[G^z]]],j^=a[a[j]]):e=j=1}var H=[0,1,2,4,8,
16,32,64,128,27,54],d=d.AES=p.extend({_doReset:function(){for(var a=this._key,c=a.words,d=a.sigBytes/4,a=4*((this._nRounds=d+6)+1),e=this._keySchedule=[],j=0;j<a;j++)if(j<d)e[j]=c[j];else{var k=e[j-1];j%d?6<d&&4==j%d&&(k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255]):(k=k<<8|k>>>24,k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255],k^=H[j/d|0]<<24);e[j]=e[j-d]^k}c=this._invKeySchedule=[];for(d=0;d<a;d++)j=a-d,k=d%4?e[j]:e[j-4],c[d]=4>d||4>=j?k:b[l[k>>>24]]^x[l[k>>>16&255]]^q[l[k>>>
8&255]]^n[l[k&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,t,r,w,v,l)},decryptBlock:function(a,c){var d=a[c+1];a[c+1]=a[c+3];a[c+3]=d;this._doCryptBlock(a,c,this._invKeySchedule,b,x,q,n,s);d=a[c+1];a[c+1]=a[c+3];a[c+3]=d},_doCryptBlock:function(a,b,c,d,e,j,l,f){for(var m=this._nRounds,g=a[b]^c[0],h=a[b+1]^c[1],k=a[b+2]^c[2],n=a[b+3]^c[3],p=4,r=1;r<m;r++)var q=d[g>>>24]^e[h>>>16&255]^j[k>>>8&255]^l[n&255]^c[p++],s=d[h>>>24]^e[k>>>16&255]^j[n>>>8&255]^l[g&255]^c[p++],t=
d[k>>>24]^e[n>>>16&255]^j[g>>>8&255]^l[h&255]^c[p++],n=d[n>>>24]^e[g>>>16&255]^j[h>>>8&255]^l[k&255]^c[p++],g=q,h=s,k=t;q=(f[g>>>24]<<24|f[h>>>16&255]<<16|f[k>>>8&255]<<8|f[n&255])^c[p++];s=(f[h>>>24]<<24|f[k>>>16&255]<<16|f[n>>>8&255]<<8|f[g&255])^c[p++];t=(f[k>>>24]<<24|f[n>>>16&255]<<16|f[g>>>8&255]<<8|f[h&255])^c[p++];n=(f[n>>>24]<<24|f[g>>>16&255]<<16|f[h>>>8&255]<<8|f[k&255])^c[p++];a[b]=q;a[b+1]=s;a[b+2]=t;a[b+3]=n},keySize:8});u.AES=p._createHelper(d)})();

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function () {
    // Check if typed arrays are supported
    if (typeof ArrayBuffer != 'function') {
        return;
    }

    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;

    // Reference original init
    var superInit = WordArray.init;

    // Augment WordArray.init to handle typed arrays
    var subInit = WordArray.init = function (typedArray) {
        // Convert buffers to uint8
        if (typedArray instanceof ArrayBuffer) {
            typedArray = new Uint8Array(typedArray);
        }

        // Convert other array views to uint8
        if (
            typedArray instanceof Int8Array ||
            typedArray instanceof Uint8ClampedArray ||
            typedArray instanceof Int16Array ||
            typedArray instanceof Uint16Array ||
            typedArray instanceof Int32Array ||
            typedArray instanceof Uint32Array ||
            typedArray instanceof Float32Array ||
            typedArray instanceof Float64Array
        ) {
            typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
        }

        // Handle Uint8Array
        if (typedArray instanceof Uint8Array) {
            // Shortcut
            var typedArrayByteLength = typedArray.byteLength;

            // Extract bytes
            var words = [];
            for (var i = 0; i < typedArrayByteLength; i++) {
                words[i >>> 2] |= typedArray[i] << (24 - (i % 4) * 8);
            }

            // Initialize this word array
            superInit.call(this, words, typedArrayByteLength);
        } else {
            // Else call normal init
            superInit.apply(this, arguments);
        }
    };

    subInit.prototype = WordArray;
}());


}
if(this.document) { // Blob.js
	/* Blob.js
	 * A Blob implementation.
	 * 2013-12-27
	 * 
	 * By Eli Grey, http://eligrey.com
	 * By Devin Samarin, https://github.com/eboyjr
	 * License: X11/MIT
	 *   See LICENSE.md
	 */

	/*global self, unescape */
	/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
	  plusplus: true */

	/*! @source http://purl.eligrey.com/github/Blob.js/blob/master/Blob.js */

	if (!(typeof Blob === "function" || typeof Blob === "object") || typeof URL === "undefined")
	if ((typeof Blob === "function" || typeof Blob === "object") && typeof webkitURL !== "undefined") self.URL = webkitURL;
	else var Blob = (function (view) {
		"use strict";

		var BlobBuilder = view.BlobBuilder || view.WebKitBlobBuilder || view.MozBlobBuilder || view.MSBlobBuilder || (function(view) {
			var
				  get_class = function(object) {
					return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
				}
				, FakeBlobBuilder = function BlobBuilder() {
					this.data = [];
				}
				, FakeBlob = function Blob(data, type, encoding) {
					this.data = data;
					this.size = data.length;
					this.type = type;
					this.encoding = encoding;
				}
				, FBB_proto = FakeBlobBuilder.prototype
				, FB_proto = FakeBlob.prototype
				, FileReaderSync = view.FileReaderSync
				, FileException = function(type) {
					this.code = this[this.name = type];
				}
				, file_ex_codes = (
					  "NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR "
					+ "NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR"
				).split(" ")
				, file_ex_code = file_ex_codes.length
				, real_URL = view.URL || view.webkitURL || view
				, real_create_object_URL = real_URL.createObjectURL
				, real_revoke_object_URL = real_URL.revokeObjectURL
				, URL = real_URL
				, btoa = view.btoa
				, atob = view.atob
				
				, ArrayBuffer = view.ArrayBuffer
				, Uint8Array = view.Uint8Array
			;
			FakeBlob.fake = FB_proto.fake = true;
			while (file_ex_code--) {
				FileException.prototype[file_ex_codes[file_ex_code]] = file_ex_code + 1;
			}
			if (!real_URL.createObjectURL) {
				URL = view.URL = {};
			}
			URL.createObjectURL = function(blob) {
				var
					  type = blob.type
					, data_URI_header
				;
				if (type === null) {
					type = "application/octet-stream";
				}
				if (blob instanceof FakeBlob) {
					data_URI_header = "data:" + type;
					if (blob.encoding === "base64") {
						return data_URI_header + ";base64," + blob.data;
					} else if (blob.encoding === "URI") {
						return data_URI_header + "," + decodeURIComponent(blob.data);
					} if (btoa) {
						return data_URI_header + ";base64," + btoa(blob.data);
					} else {
						return data_URI_header + "," + encodeURIComponent(blob.data);
					}
				} else if (real_create_object_URL) {
					return real_create_object_URL.call(real_URL, blob);
				}
			};
			URL.revokeObjectURL = function(object_URL) {
				if (object_URL.substring(0, 5) !== "data:" && real_revoke_object_URL) {
					real_revoke_object_URL.call(real_URL, object_URL);
				}
			};
			FBB_proto.append = function(data/*, endings*/) {
				var bb = this.data;
				// decode data to a binary string
				if (Uint8Array && (data instanceof ArrayBuffer || data instanceof Uint8Array)) {
					var
						  str = ""
						, buf = new Uint8Array(data)
						, i = 0
						, buf_len = buf.length
					;
					for (; i < buf_len; i++) {
						str += String.fromCharCode(buf[i]);
					}
					bb.push(str);
				} else if (get_class(data) === "Blob" || get_class(data) === "File") {
					if (FileReaderSync) {
						var fr = new FileReaderSync;
						bb.push(fr.readAsBinaryString(data));
					} else {
						// async FileReader won't work as BlobBuilder is sync
						throw new FileException("NOT_READABLE_ERR");
					}
				} else if (data instanceof FakeBlob) {
					if (data.encoding === "base64" && atob) {
						bb.push(atob(data.data));
					} else if (data.encoding === "URI") {
						bb.push(decodeURIComponent(data.data));
					} else if (data.encoding === "raw") {
						bb.push(data.data);
					}
				} else {
					if (typeof data !== "string") {
						data += ""; // convert unsupported types to strings
					}
					// decode UTF-16 to binary string
					bb.push(unescape(encodeURIComponent(data)));
				}
			};
			FBB_proto.getBlob = function(type) {
				if (!arguments.length) {
					type = null;
				}
				return new FakeBlob(this.data.join(""), type, "raw");
			};
			FBB_proto.toString = function() {
				return "[object BlobBuilder]";
			};
			FB_proto.slice = function(start, end, type) {
				var args = arguments.length;
				if (args < 3) {
					type = null;
				}
				return new FakeBlob(
					  this.data.slice(start, args > 1 ? end : this.data.length)
					, type
					, this.encoding
				);
			};
			FB_proto.toString = function() {
				return "[object Blob]";
			};
			return FakeBlobBuilder;
		}(view));

		return function Blob(blobParts, options) {
			var type = options ? (options.type || "") : "";
			var builder = new BlobBuilder();
			if (blobParts) {
				for (var i = 0, len = blobParts.length; i < len; i++) {
					builder.append(blobParts[i]);
				}
			}
			return builder.getBlob(type);
		};
	}(typeof self !== "undefined" && self || typeof window !== "undefined" && window || this.content || this));
	
	/* FileSaver.js
	 * A saveAs() FileSaver implementation.
	 * 2013-12-27
	 *
	 * By Eli Grey, http://eligrey.com
	 * License: X11/MIT
	 *   See LICENSE.md
	 */

	/*global self */
	/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
	  plusplus: true */

	/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

	var saveAs = saveAs
	  || (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator))
	  || (function(view) {
		"use strict";
		var
			  doc = view.document
			  // only get URL when necessary in case BlobBuilder.js hasn't overridden it yet
			, get_URL = function() {
				return view.URL || view.webkitURL || view;
			}
			, URL = view.URL || view.webkitURL || view
			, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
			, can_use_save_link =  !view.externalHost && "download" in save_link
			, click = function(node) {
				var event = doc.createEvent("MouseEvents");
				event.initMouseEvent(
					"click", true, false, view, 0, 0, 0, 0, 0
					, false, false, false, false, 0, null
				);
				node.dispatchEvent(event);
			}
			, webkit_req_fs = view.webkitRequestFileSystem
			, req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
			, throw_outside = function (ex) {
				(view.setImmediate || view.setTimeout)(function() {
					throw ex;
				}, 0);
			}
			, force_saveable_type = "application/octet-stream"
			, fs_min_size = 0
			, deletion_queue = []
			, process_deletion_queue = function() {
				var i = deletion_queue.length;
				while (i--) {
					var file = deletion_queue[i];
					if (typeof file === "string") { // file is an object URL
						URL.revokeObjectURL(file);
					} else { // file is a File
						file.remove();
					}
				}
				deletion_queue.length = 0; // clear queue
			}
			, dispatch = function(filesaver, event_types, event) {
				event_types = [].concat(event_types);
				var i = event_types.length;
				while (i--) {
					var listener = filesaver["on" + event_types[i]];
					if (typeof listener === "function") {
						try {
							listener.call(filesaver, event || filesaver);
						} catch (ex) {
							throw_outside(ex);
						}
					}
				}
			}
			, FileSaver = function(blob, name) {
				// First try a.download, then web filesystem, then object URLs
				var
					  filesaver = this
					, type = blob.type
					, blob_changed = false
					, object_url
					, target_view
					, get_object_url = function() {
						var object_url = get_URL().createObjectURL(blob);
						deletion_queue.push(object_url);
						return object_url;
					}
					, dispatch_all = function() {
						dispatch(filesaver, "writestart progress write writeend".split(" "));
					}
					// on any filesys errors revert to saving with object URLs
					, fs_error = function() {
						// don't create more object URLs than needed
						if (blob_changed || !object_url) {
							object_url = get_object_url(blob);
						}
						if (target_view) {
							target_view.location.href = object_url;
						} else {
							window.open(object_url, "_blank");
						}
						filesaver.readyState = filesaver.DONE;
						dispatch_all();
					}
					, abortable = function(func) {
						return function() {
							if (filesaver.readyState !== filesaver.DONE) {
								return func.apply(this, arguments);
							}
						};
					}
					, create_if_not_found = {create: true, exclusive: false}
					, slice
				;
				filesaver.readyState = filesaver.INIT;
				if (!name) {
					name = "download";
				}
				if (can_use_save_link) {
					object_url = get_object_url(blob);
					// FF for Android has a nasty garbage collection mechanism
					// that turns all objects that are not pure javascript into 'deadObject'
					// this means `doc` and `save_link` are unusable and need to be recreated
					// `view` is usable though:
					doc = view.document;
					save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a");
					save_link.href = object_url;
					save_link.download = name;
					var event = doc.createEvent("MouseEvents");
					event.initMouseEvent(
						"click", true, false, view, 0, 0, 0, 0, 0
						, false, false, false, false, 0, null
					);
					save_link.dispatchEvent(event);
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
					return;
				}
				// Object and web filesystem URLs have a problem saving in Google Chrome when
				// viewed in a tab, so I force save with application/octet-stream
				// http://code.google.com/p/chromium/issues/detail?id=91158
				if (view.chrome && type && type !== force_saveable_type) {
					slice = blob.slice || blob.webkitSlice;
					blob = slice.call(blob, 0, blob.size, force_saveable_type);
					blob_changed = true;
				}
				// Since I can't be sure that the guessed media type will trigger a download
				// in WebKit, I append .download to the filename.
				// https://bugs.webkit.org/show_bug.cgi?id=65440
				if (webkit_req_fs && name !== "download") {
					name += ".download";
				}
				if (type === force_saveable_type || webkit_req_fs) {
					target_view = view;
				}
				if (!req_fs) {
					fs_error();
					return;
				}
				fs_min_size += blob.size;
				req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
					fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
						var save = function() {
							dir.getFile(name, create_if_not_found, abortable(function(file) {
								file.createWriter(abortable(function(writer) {
									writer.onwriteend = function(event) {
										target_view.location.href = file.toURL();
										deletion_queue.push(file);
										filesaver.readyState = filesaver.DONE;
										dispatch(filesaver, "writeend", event);
									};
									writer.onerror = function() {
										var error = writer.error;
										if (error.code !== error.ABORT_ERR) {
											fs_error();
										}
									};
									"writestart progress write abort".split(" ").forEach(function(event) {
										writer["on" + event] = filesaver["on" + event];
									});
									writer.write(blob);
									filesaver.abort = function() {
										writer.abort();
										filesaver.readyState = filesaver.DONE;
									};
									filesaver.readyState = filesaver.WRITING;
								}), fs_error);
							}), fs_error);
						};
						dir.getFile(name, {create: false}, abortable(function(file) {
							// delete file if it already exists
							file.remove();
							save();
						}), abortable(function(ex) {
							if (ex.code === ex.NOT_FOUND_ERR) {
								save();
							} else {
								fs_error();
							}
						}));
					}), fs_error);
				}), fs_error);
			}
			, FS_proto = FileSaver.prototype
			, saveAs = function(blob, name) {
				return new FileSaver(blob, name);
			}
		;
		FS_proto.abort = function() {
			var filesaver = this;
			filesaver.readyState = filesaver.DONE;
			dispatch(filesaver, "abort");
		};
		FS_proto.readyState = FS_proto.INIT = 0;
		FS_proto.WRITING = 1;
		FS_proto.DONE = 2;

		FS_proto.error =
		FS_proto.onwritestart =
		FS_proto.onprogress =
		FS_proto.onwrite =
		FS_proto.onabort =
		FS_proto.onerror =
		FS_proto.onwriteend =
			null;

		view.addEventListener("unload", process_deletion_queue, false);
		return saveAs;
	}(
		   typeof self !== "undefined" && self
		|| typeof window !== "undefined" && window
		|| this.content
	));
	// `self` is undefined in Firefox for Android content script context
	// while `this` is nsIContentFrameMessageManager
	// with an attribute `content` that corresponds to the window

	if (typeof module !== "undefined") module.exports = saveAs;
}
function endsWith(str, suffix) {
    "use strict";
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}
function arrayBufferToBase64( buffer ) {
    var binary = ''
    var bytes = new Uint8Array( buffer )
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] )
    }
    return window.btoa( binary );
}
function enterCrypt(e, i) {
	if(e.keyCode === 13) {
		if(i == -1) {
			fileLock.cryptAll();
		} else {
			fileLock.cryptFile(i);
		}
		
	}
}

if(this.document){
    // filelock.js
    // Comment the hell out of this!

    var fileLock = { // Namespace reduces interactions with other scripts.
        
		Setup : function (debugging) { // Runs once loaded, can also run from console with debugging set to true in order to test different compatabilities.
            "use strict";
            if(!debugging){ // Would reset vars I changed while debugging otherwise.
                // Declare every variable, must supply default value. Maybe don't if the variable is destroyed immediately after it's creation.
                this.cannotReadFiles = false;
                this.useDataURI = false;
                this.useSyncro = false;
			}
                
			this.selectEvent = undefined;
			this.buttonString = "";
			fileLock.willAlert;
			this.file = null;
			this.files = []; // Contains all file information in JSON.
			this.readers = []; // All the FileReaders.
			if(!this.useSyncro){
				try {
					this.worker1 = new Worker("filelock.js");
					this.worker2 = new Worker("filelock.js");
					this.worker3 = new Worker("filelock.js");
					this.worker4 = new Worker("filelock.js");
					this.worker5 = new Worker("filelock.js");
					this.worker6 = new Worker("filelock.js");
					this.worker7 = new Worker("filelock.js");
					this.worker8 = new Worker("filelock.js");
					this.worker9 = new Worker("filelock.js");
					this.worker10 = new Worker("filelock.js");
					this.worker11 = new Worker("filelock.js");
					this.worker12 = new Worker("filelock.js");
					this.worker13 = new Worker("filelock.js");
					this.worker14 = new Worker("filelock.js");
					this.worker15 = new Worker("filelock.js");
					this.worker16 = new Worker("filelock.js");
				} catch(e) {
					this.useSyncro = true;
				}
			}
			this.htmlAppend = "";
            // Everything is declared.  
			
            // Determine compatability.
            if (!window.FileReader) {
                // We can't load files with JavaScript, so use Flash.
				fileLock.cannotReadFiles = true;
                console.log("We don't have JavaScript saving, but we have Flash, so we'll use that.");
            } else if ((!window.URL || !window.Blob) || this.useDataURI) { // We don't have Flash, but we must be able to load files with JavaScript from this point.
                // We can't save with a name, so use a DataURI and tell user what to do.
                this.useDataURI = true;
                console.log("We don't have JavaScript saving, and we lack Flash, so we'll have to use DataURIs.");
            } else {
                // JavaScript reading and saving is supported.
                console.log("We have full JavaScript loading and saving.");
            }
            
            // Worker or synchronous code?
            if (!window.Worker || this.useSyncro) {
                this.useSyncro = true;
                console.log("We lack Web Workers, so we'll use a single threaded version.");
            } else {
                console.log("We have Web Workers, so we'll use them.");
            }
            
            // Finished with compatability checks.
            
			// Clear webpage.
			document.getElementById('application').innerHTML = "";
            // Add everything necessary to the webpage.
            // Browse button.
            if(!this.cannotReadFiles){
                document.getElementById('application').innerHTML += '<input type="file" id="files" title="Click here to select the files you want to encrypt." style="margin:5px auto;" name="fileLock.files[]" multiple/><output id="list"></output>';
            } else {
                // Add incompatible thingy.
				document.getElementById('application').innerHTML += "Sorry! Your browser does not support the HTML5 functions needed to use this website. You can see a list of supported browsers on <a target='_blank' href='http://caniuse.com/filereader'>Can I use...</a>.";
            }
            
            
            // Warnings
            if (this.useDataURI && !this.cannotReadFiles) {
                document.getElementById('application').innerHTML += '<div id="warning">Your browser does not support BlobURLs. You will have to save encrypted files with the ".enc" file extension, and decrypted files with their original file extension.</div>';
            }
            // The page has everything it needs now.
            
        },

		FileSelectionHandler : function (event) { // Occurs when files are opened by the user.
            "use strict";
			console.log("Handling "+event.target.files.length+" files.");
            fileLock.selectEvent = event;
            // Reset vars.
            fileLock.file = null;
            fileLock.files = []; // Contains all file information in JSON.
            fileLock.readers = []; // All the FileReaders.
            fileLock.htmlAppend = "";
            // Create table of files.
            fileLock.htmlAppend = "";
            fileLock.htmlAppend += '<table class="filetable" id="filetable"><tr><th class="paddedCell">Name</th><th class="paddedCell">Size</th><th class="paddedCell">Type</th><th>Password</th>';
            
            if(event.target.files.length>1){
                fileLock.htmlAppend += '<th><input class="cryptButton" size="25" type="button" id="buttonCancel" onclick="fileLock.cancelAll()" value="Cancel"></th></tr>';
            } else {
                fileLock.htmlAppend += '<th></th></tr>';
            }
            
            for (fileLock.file=0;fileLock.file<event.target.files.length;fileLock.file+=1) {
				console.log("For loop is calling.");
                if (event.target.files[fileLock.file]) {
					console.log("If is calling.");
                    // Fill in vars.
                    fileLock.files[fileLock.file] = event.target.files[fileLock.file];
                    // Set encryption so we don't have to keep calling.
                    fileLock.files[fileLock.file].encrypted = endsWith(fileLock.files[fileLock.file].name, ".enc");
                    
                    // Load file.
                    fileLock.readers[fileLock.file] = new FileReader();
					
					// Real size.
					if(fileLock.files[fileLock.file].size<1000) {
						fileLock.files[fileLock.file].realSize = Math.floor(fileLock.files[fileLock.file].size).toString() + "B";
					} else if(fileLock.files[fileLock.file].size<1000000) {
						fileLock.files[fileLock.file].realSize = Math.floor(fileLock.files[fileLock.file].size/1000).toString() + "KB";
					} else {
						fileLock.files[fileLock.file].realSize = Math.floor(fileLock.files[fileLock.file].size/1000000).toString() + "MB";
					}
					
					if(fileLock.files[fileLock.file].encrypted) {
						fileLock.files[fileLock.file].encryptedString = "Encrypted";
					} else {
						fileLock.files[fileLock.file].encryptedString = "Unencrypted";
					}
					
					
                    // Add entry.
                    fileLock.htmlAppend += '<tr><td class="paddedCell">'+fileLock.files[fileLock.file].name+'</td><td class="paddedCell">'+fileLock.files[fileLock.file].realSize+'</td><td class="paddedCell">'+fileLock.files[fileLock.file].encryptedString+'</td><td><input size="27" type="password" id="password'+fileLock.file+'" name="password" onkeypress="return enterCrypt(event, '+fileLock.file+')"></td><td><input class="cryptButton" size="25" type="button" title="Cancel Read" id="button'+fileLock.file+'" onclick="fileLock.cancelFile('+fileLock.file+')" value="Reading..."></td></tr>';
                    
                    // Once a file is loaded.
                    fileLock.readers[fileLock.file].onload = fileLock.handleFile(fileLock.file);
                    
                    fileLock.readers[fileLock.file].onerror = fileLock.errorFile(fileLock.file);
                    
                    // Start reading the files immediately.
                    fileLock.files[fileLock.file].status = "Reading";
					if(fileLock.files[fileLock.file].encrypted) {
						fileLock.readers[fileLock.file].readAsDataURL(fileLock.files[fileLock.file]);
					} else {
						fileLock.readers[fileLock.file].readAsArrayBuffer(fileLock.files[fileLock.file]);
					}
                }
            }
            // If more than 2, offer the All option.
            if(event.target.files.length>1) {
                fileLock.htmlAppend += '<tr><td class="blankCell"></td><td class="blankCell"></td><td class="blankCell"></td><td><input size="27" type="password" id="passwordAll" name="password" onkeypress="return enterCrypt(event, -1)"></td><td><input class="cryptButton" size="25" type="button" id="buttonAll" onclick="fileLock.cryptAll()" value="All" disabled=true></td></tr>';
            }
            
            // Finalize file table.
            fileLock.htmlAppend += "</table>";
            document.getElementById('list').innerHTML = fileLock.htmlAppend;
        },
        
        handleFile : function(file) {
            "use strict";
            return function(event) {
                console.log("Loaded: " + file);
				
                // We've loaded the file, now what?);
				if(fileLock.files[file].encrypted || !fileLock.files[file].encrypted) {
					fileLock.files[file].data = event.target.result;
					fileLock.files[file].status = "Ready";
					// Change button to crypt.
					if(fileLock.files[file].encrypted){
						document.getElementById("button" + file).value = "Decrypt";
					} else {
						document.getElementById("button" + file).value = "Encrypt";
					}
					document.getElementById("button" + file).title = "";
					document.getElementById("button" + file).onclick = function() { fileLock.cryptFile(file); };
					// Update All button
					fileLock.buttonString = "";
					for (fileLock.file2=0;fileLock.file2<fileLock.files.length;fileLock.file2+=1) {
						fileLock.buttonString +=  document.getElementById("button" + fileLock.file2).value;
					}
					if(fileLock.buttonString.indexOf("ing") === -1 && fileLock.files.length>1) {
						document.getElementById("passwordAll").disabled = false;
						document.getElementById("buttonAll").disabled = false;
						console.log("All " +fileLock.files.length+" files are loaded, enabled All button.");
					} else if(fileLock.files.length>1) {
						document.getElementById("passwordAll").disabled = true
						document.getElementById("buttonAll").disabled = true;
					}
				} else {
					fileLock.files[file].status = "Out of Date";
					// Change button to crypt.
					document.getElementById("button" + file).value = "Recrypt";
					document.getElementById("button" + file).title = "Recrypts file to get the benefits of the newest version.";
					document.getElementById("button" + file).onclick = function() { window.open("./0.x") };
					// Update All button
					fileLock.buttonString = "";
					for (fileLock.file2=0;fileLock.file2<fileLock.files.length;fileLock.file2+=1) {
						fileLock.buttonString +=  document.getElementById("button" + fileLock.file2).value;
					}
					if(fileLock.buttonString.indexOf("ing") === -1 && fileLock.files.length>1) {
						document.getElementById("buttonAll").disabled = false;
						document.getElementById("passwordAll").disabled = false;
						console.log("All " +fileLock.files.length+" files are loaded, enabled All button.");
					} else if(fileLock.files.length>1) {
						document.getElementById("passwordAll").disabled = true;
						document.getElementById("buttonAll").disabled = true;
					}
				}
            };
        },
        
        errorFile : function(file) {
            "use strict";
            return function(event) {
                // An error while reading!
				console.log("FileReader error: " + index);
                fileLock.readers[file] = new FileReader();
                document.getElementById("button" + file).value = "Cancelled";
                document.getElementById("button" + file).onclick  = function() { fileLock.rereadFile(file); };
                document.getElementById("button" + file).title = "Reread File";
                fileLock.files[file].status = "Read Error";
            };
        },
        
        cancelFile : function (index) { // In case the user cancels reading.
            "use strict";
			console.log("Cancelling: " + index);
            try {
                fileLock.readers[index].abort();
            } finally {
                fileLock.readers[index] = new FileReader();
                document.getElementById("button" + index).value = "Cancelled";
                document.getElementById("button" + index).onclick  = function() { fileLock.rereadFile(index); };
                document.getElementById("button" + index).title = "Reread File";
                fileLock.files[index].status = "Aborted";
            }
        },
        
        cancelAll : function () { // In case the user cancels reading.
            "use strict";
			console.log("Cancelling all.");
            for (fileLock.file4=0;fileLock.file4<fileLock.files.length;fileLock.file4+=1) { // Abort everything.
                if(fileLock.files[fileLock.file4].status === "Reading"){
                    fileLock.readers[fileLock.file4].abort();
				}
				fileLock.readers[fileLock.file4] = new FileReader();
				document.getElementById("button" + fileLock.file4).value = "Cancelled";
				document.getElementById("button" + fileLock.file4).setAttribute( "onClick", "fileLock.rereadFile("+fileLock.file4+")");
				document.getElementById("button" + fileLock.file4).title = "Reread File";
				fileLock.files[fileLock.file4].status = "Aborted";
            }
			document.getElementById("passwordAll").disabled = true;
            document.getElementById("buttonAll").disabled = true;
            document.getElementById("buttonCancel").title = "Reread All";
            document.getElementById("buttonCancel").value = "Reread";
            document.getElementById("buttonCancel").onclick = function() { fileLock.FileSelectionHandler(fileLock.selectEvent); };
        },
        
        rereadFile : function (index) { // In case the user starts reading after it's already cancelled.
            "use strict";
			console.log("Rereading: " + index);
            document.getElementById("button" + index).value = "Reading";
			document.getElementById("passwordAll").disabled = true;
            document.getElementById("buttonAll").disabled = true;
            document.getElementById("button" + index).title = "Cancel Read";
            document.getElementById("button" + index).onclick = function() { fileLock.cancelFile(index); };
            fileLock.files[index].status = "Reading";
            fileLock.readers[index] = new FileReader();
            fileLock.readers[index].onload = fileLock.handleFile(index);
            fileLock.readers[index].readAsBinaryString(fileLock.files[index]);
        },
        
		cryptAll : function () { // Crypt everything.
            "use strict";
            for (fileLock.file3=0;fileLock.file3<fileLock.files.length;fileLock.file3+=1) { // All passwords are the same, unless password is already there.
                if(document.getElementById("password" + fileLock.file3).value === ""){
	                document.getElementById("password" + fileLock.file3).value = document.getElementById("passwordAll").value;
	            }
            }
            
            var msec = 0;
            for (fileLock.file3=0;fileLock.file3<fileLock.files.length;fileLock.file3+=1) {
                if(fileLock.files[fileLock.file3].status === "Ready") {
                    setTimeout("fileLock.cryptFile("+fileLock.file3+")", msec);
                    msec = msec+25;
                }
            }
        },
		
        cryptFile : function (index) { // Do what we do best.
            "use strict";
            console.log("Crypting: " + index);
			fileLock.files[index].status = "Crypting";
			document.getElementById("password"+index).disabled = true;
			document.getElementById("button"+index).disabled = true;
			if(fileLock.files[index].encrypted){
				console.log(index + " is Encrypted.");
				if(fileLock.useSyncro) {
					console.log("Decrypting with Syncro: " + index);
					fileLock.files[index].started = new Date();
					var base64 = fileLock.files[index].data.substring(fileLock.files[index].data.indexOf(",")+1);
					base64 = atob(base64);
					try{
						if(CryptoJS.AES.decrypt(base64.substring(0,44),document.getElementById("password"+index).value).toString(CryptoJS.enc.Utf8) != "fileLock,") {
							if (base64.substring(0,11) == "version1.3|") {
								window.location.href = "./1.3/";
							} else {
								console.log("Incorrect Password: " + index);
								document.getElementById("password"+index).disabled = false;
								document.getElementById("button"+index).disabled = false;
								fileLock.files[index].status = "Ready";
								if(!fileLock.willAlert) {
									fileLock.willAlert = true;
									setTimeout(fileLock.incorrectPassword,500);
								}
							}
						} else {
							base64 = base64.substring(44)
							var part1 = atob(CryptoJS.AES.decrypt(btoa(base64.substring(0,(base64.length/16)*1)), document.getElementById("password"+index).value).toString(CryptoJS.enc.Base64));
							var part2 = atob(CryptoJS.AES.decrypt(btoa(base64.substring((base64.length/16)*1,(base64.length/16)*2)), document.getElementById("password"+index).value).toString(CryptoJS.enc.Base64));
							var part3 = atob(CryptoJS.AES.decrypt(btoa(base64.substring((base64.length/16)*2,(base64.length/16)*3)), document.getElementById("password"+index).value).toString(CryptoJS.enc.Base64));
							var part4 = atob(CryptoJS.AES.decrypt(btoa(base64.substring((base64.length/16)*3,(base64.length/16)*4)), document.getElementById("password"+index).value).toString(CryptoJS.enc.Base64));
							var part5 = atob(CryptoJS.AES.decrypt(btoa(base64.substring((base64.length/16)*4,(base64.length/16)*5)), document.getElementById("password"+index).value).toString(CryptoJS.enc.Base64));
							var part6 = atob(CryptoJS.AES.decrypt(btoa(base64.substring((base64.length/16)*5,(base64.length/16)*6)), document.getElementById("password"+index).value).toString(CryptoJS.enc.Base64));
							var part7 = atob(CryptoJS.AES.decrypt(btoa(base64.substring((base64.length/16)*6,(base64.length/16)*7)), document.getElementById("password"+index).value).toString(CryptoJS.enc.Base64));
							var part8 = atob(CryptoJS.AES.decrypt(btoa(base64.substring((base64.length/16)*7,(base64.length/16)*8)), document.getElementById("password"+index).value).toString(CryptoJS.enc.Base64));
							var part9 = atob(CryptoJS.AES.decrypt(btoa(base64.substring((base64.length/16)*8,(base64.length/16)*9)), document.getElementById("password"+index).value).toString(CryptoJS.enc.Base64));
							var part10 = atob(CryptoJS.AES.decrypt(btoa(base64.substring((base64.length/16)*9,(base64.length/16)*10)), document.getElementById("password"+index).value).toString(CryptoJS.enc.Base64));
							var part11 = atob(CryptoJS.AES.decrypt(btoa(base64.substring((base64.length/16)*10,(base64.length/16)*11)), document.getElementById("password"+index).value).toString(CryptoJS.enc.Base64));
							var part12 = atob(CryptoJS.AES.decrypt(btoa(base64.substring((base64.length/16)*11,(base64.length/16)*12)), document.getElementById("password"+index).value).toString(CryptoJS.enc.Base64));
							var part13 = atob(CryptoJS.AES.decrypt(btoa(base64.substring((base64.length/16)*12,(base64.length/16)*13)), document.getElementById("password"+index).value).toString(CryptoJS.enc.Base64));
							var part14 = atob(CryptoJS.AES.decrypt(btoa(base64.substring((base64.length/16)*13,(base64.length/16)*14)), document.getElementById("password"+index).value).toString(CryptoJS.enc.Base64));
							var part15 = atob(CryptoJS.AES.decrypt(btoa(base64.substring((base64.length/16)*14,(base64.length/16)*15)), document.getElementById("password"+index).value).toString(CryptoJS.enc.Base64));
							var part16 = atob(CryptoJS.AES.decrypt(btoa(base64.substring((base64.length/16)*15,(base64.length/16)*16)), document.getElementById("password"+index).value).toString(CryptoJS.enc.Base64));
							var base64 = btoa(part1+part2+part3+part4+part5+part6+part7+part8+part9+part10+part11+part12+part13+part14+part15+part16);
							var blob = new Blob([b64toBlob(base64)], {type: "application/octet-stream;charset=UTF-8"});
							saveAs(blob, fileLock.files[index].name.substring(0,fileLock.files[index].name.length-4));
							fileLock.files[index].duration = (new Date() - fileLock.files[index].started)/1000;
							console.log("Encrypting " + index + " took " + fileLock.files[index].duration + " seconds at " + Math.floor((fileLock.files[index].size/fileLock.files[index].duration)/1000)/1000 +" MB/s.");
							document.getElementById("password"+index).disabled = false;
							document.getElementById("button"+index).disabled = false;
							fileLock.files[index].status = "Ready";
							part1 = undefined;
							part2 = undefined;
							part3 = undefined;
							part4 = undefined;
							part5 = undefined;
							part6 = undefined;
							part7 = undefined;
							part8 = undefined;
							part9 = undefined;
							part10 = undefined;
							part11 = undefined;
							part12 = undefined;
							part13 = undefined;
							part14 = undefined;
							part15 = undefined;
							part16 = undefined;
							base64 = undefined;
							window.URL.revokeObjectURL(blob);
						}
					} catch(dmdnj) {
							console.log("Incorrect Password: " + index);
							document.getElementById("password"+index).disabled = false;
							document.getElementById("button"+index).disabled = false;
							fileLock.files[index].status = "Ready";
							if(!fileLock.willAlert) {
								fileLock.willAlert = true;
								setTimeout(fileLock.incorrectPassword,500);
							}
					}
				} else {
					console.log("Decrypting with Worker: " + index);
					fileLock.files[index].started = new Date();
					
					var base64 = fileLock.files[index].data.substring(fileLock.files[index].data.indexOf(",")+1);
					base64 = atob(base64);
					try{
						if(CryptoJS.AES.decrypt(base64.substring(0,44),document.getElementById("password"+index).value).toString(CryptoJS.enc.Utf8) != "fileLock,") {
							if (base64.substring(0,11) == "version1.3|") {
								window.location.href = "./1.3/";
							} else {
								console.log("Incorrect Password: " + index);
								document.getElementById("password"+index).disabled = false;
								document.getElementById("button"+index).disabled = false;
								fileLock.files[index].status = "Ready";
								if(!fileLock.willAlert) {
									fileLock.willAlert = true;
									setTimeout(fileLock.incorrectPassword,500);
								}
							}
						} else {
							base64 = base64.substring(44)
							var part1 = btoa(base64.substring(0,(base64.length/16)*1));
							var part2 = btoa(base64.substring((base64.length/16)*1,(base64.length/16)*2));
							var part3 = btoa(base64.substring((base64.length/16)*2,(base64.length/16)*3));
							var part4 = btoa(base64.substring((base64.length/16)*3,(base64.length/16)*4));
							var part5 = btoa(base64.substring((base64.length/16)*4,(base64.length/16)*5));
							var part6 = btoa(base64.substring((base64.length/16)*5,(base64.length/16)*6));
							var part7 = btoa(base64.substring((base64.length/16)*6,(base64.length/16)*7));
							var part8 = btoa(base64.substring((base64.length/16)*7,(base64.length/16)*8));
							var part9 = btoa(base64.substring((base64.length/16)*8,(base64.length/16)*9));
							var part10 = btoa(base64.substring((base64.length/16)*9,(base64.length/16)*10));
							var part11 = btoa(base64.substring((base64.length/16)*10,(base64.length/16)*11));
							var part12 = btoa(base64.substring((base64.length/16)*11,(base64.length/16)*12));
							var part13 = btoa(base64.substring((base64.length/16)*12,(base64.length/16)*13));
							var part14 = btoa(base64.substring((base64.length/16)*13,(base64.length/16)*14));
							var part15 = btoa(base64.substring((base64.length/16)*14,(base64.length/16)*15));
							var part16 = btoa(base64.substring((base64.length/16)*15,(base64.length/16)*16));
							
							fileLock.worker1.postMessage({"data":part1,"password":document.getElementById("password"+index).value,"file":index,"part":1,"encrypted":true});
							fileLock.worker2.postMessage({"data":part2,"password":document.getElementById("password"+index).value,"file":index,"part":2,"encrypted":true});
							fileLock.worker3.postMessage({"data":part3,"password":document.getElementById("password"+index).value,"file":index,"part":3,"encrypted":true});
							fileLock.worker4.postMessage({"data":part4,"password":document.getElementById("password"+index).value,"file":index,"part":4,"encrypted":true});
							fileLock.worker5.postMessage({"data":part5,"password":document.getElementById("password"+index).value,"file":index,"part":5,"encrypted":true});
							fileLock.worker6.postMessage({"data":part6,"password":document.getElementById("password"+index).value,"file":index,"part":6,"encrypted":true});
							fileLock.worker7.postMessage({"data":part7,"password":document.getElementById("password"+index).value,"file":index,"part":7,"encrypted":true});
							fileLock.worker8.postMessage({"data":part8,"password":document.getElementById("password"+index).value,"file":index,"part":8,"encrypted":true});
							fileLock.worker9.postMessage({"data":part9,"password":document.getElementById("password"+index).value,"file":index,"part":9,"encrypted":true});
							fileLock.worker10.postMessage({"data":part10,"password":document.getElementById("password"+index).value,"file":index,"part":10,"encrypted":true});
							fileLock.worker11.postMessage({"data":part11,"password":document.getElementById("password"+index).value,"file":index,"part":11,"encrypted":true});
							fileLock.worker12.postMessage({"data":part12,"password":document.getElementById("password"+index).value,"file":index,"part":12,"encrypted":true});
							fileLock.worker13.postMessage({"data":part13,"password":document.getElementById("password"+index).value,"file":index,"part":13,"encrypted":true});
							fileLock.worker14.postMessage({"data":part14,"password":document.getElementById("password"+index).value,"file":index,"part":14,"encrypted":true});
							fileLock.worker15.postMessage({"data":part15,"password":document.getElementById("password"+index).value,"file":index,"part":15,"encrypted":true});
							fileLock.worker16.postMessage({"data":part16,"password":document.getElementById("password"+index).value,"file":index,"part":16,"encrypted":true});
							
							part1 = undefined;
							part2 = undefined;
							part3 = undefined;
							part4 = undefined;
							part5 = undefined;
							part6 = undefined;
							part7 = undefined;
							part8 = undefined;
							part9 = undefined;
							part10 = undefined;
							part11 = undefined;
							part12 = undefined;
							part13 = undefined;
							part14 = undefined;
							part15 = undefined;
							part16 = undefined;
							base64 = undefined;
						}
					} catch(mjefj) {
						console.log("Incorrect Password: " + index);
						document.getElementById("password"+index).disabled = false;
						document.getElementById("button"+index).disabled = false;
						fileLock.files[index].status = "Ready";
						if(!fileLock.willAlert) {
							fileLock.willAlert = true;
							setTimeout(fileLock.incorrectPassword,500);
						}
					}
				}
			} else {
				console.log(index + " is Unencrypted.");
				if(fileLock.useSyncro) {
					console.log("Encrypting with Syncro: " + index);
					fileLock.files[index].started = new Date();
					//Easiest way to get a blob is to convert Base64; Takes a fraction of the time encryption does anyway.
					var part1 = atob(CryptoJS.AES.encrypt(CryptoJS.lib.WordArray.create(fileLock.files[index].data.slice(0,(fileLock.files[index].data.byteLength/16)*1)), document.getElementById("password"+index).value).toString()); 
					var part2 = atob(CryptoJS.AES.encrypt(CryptoJS.lib.WordArray.create(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*1,(fileLock.files[index].data.byteLength/16)*2)), document.getElementById("password"+index).value).toString()); 
					var part3 = atob(CryptoJS.AES.encrypt(CryptoJS.lib.WordArray.create(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*2,(fileLock.files[index].data.byteLength/16)*3)), document.getElementById("password"+index).value).toString()); 
					var part4 = atob(CryptoJS.AES.encrypt(CryptoJS.lib.WordArray.create(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*3,(fileLock.files[index].data.byteLength/16)*4)), document.getElementById("password"+index).value).toString());
					var part5 = atob(CryptoJS.AES.encrypt(CryptoJS.lib.WordArray.create(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*4,(fileLock.files[index].data.byteLength/16)*5)), document.getElementById("password"+index).value).toString());
					var part6 = atob(CryptoJS.AES.encrypt(CryptoJS.lib.WordArray.create(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*5,(fileLock.files[index].data.byteLength/16)*6)), document.getElementById("password"+index).value).toString());
					var part7 = atob(CryptoJS.AES.encrypt(CryptoJS.lib.WordArray.create(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*6,(fileLock.files[index].data.byteLength/16)*7)), document.getElementById("password"+index).value).toString());
					var part8 = atob(CryptoJS.AES.encrypt(CryptoJS.lib.WordArray.create(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*7,(fileLock.files[index].data.byteLength/16)*8)), document.getElementById("password"+index).value).toString());
					var part9 = atob(CryptoJS.AES.encrypt(CryptoJS.lib.WordArray.create(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*8,(fileLock.files[index].data.byteLength/16)*9)), document.getElementById("password"+index).value).toString());
					var part10 = atob(CryptoJS.AES.encrypt(CryptoJS.lib.WordArray.create(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*9,(fileLock.files[index].data.byteLength/16)*10)), document.getElementById("password"+index).value).toString());
					var part11 = atob(CryptoJS.AES.encrypt(CryptoJS.lib.WordArray.create(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*10,(fileLock.files[index].data.byteLength/16)*11)), document.getElementById("password"+index).value).toString());
					var part12 = atob(CryptoJS.AES.encrypt(CryptoJS.lib.WordArray.create(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*11,(fileLock.files[index].data.byteLength/16)*12)), document.getElementById("password"+index).value).toString());
					var part13 = atob(CryptoJS.AES.encrypt(CryptoJS.lib.WordArray.create(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*12,(fileLock.files[index].data.byteLength/16)*13)), document.getElementById("password"+index).value).toString());
					var part14 = atob(CryptoJS.AES.encrypt(CryptoJS.lib.WordArray.create(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*13,(fileLock.files[index].data.byteLength/16)*14)), document.getElementById("password"+index).value).toString());
					var part15 = atob(CryptoJS.AES.encrypt(CryptoJS.lib.WordArray.create(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*14,(fileLock.files[index].data.byteLength/16)*15)), document.getElementById("password"+index).value).toString());
					var part16 = atob(CryptoJS.AES.encrypt(CryptoJS.lib.WordArray.create(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*15,(fileLock.files[index].data.byteLength/16)*16)), document.getElementById("password"+index).value).toString());
					var base64 = btoa(CryptoJS.AES.encrypt("fileLock,",document.getElementById("password"+index).value).toString()+part1+part2+part3+part4+part5+part6+part7+part8+part9+part10+part11+part12+part13+part14+part15+part16);
					var blob = new Blob([b64toBlob(base64)], {type: "application/octet-stream;charset=UTF-8"});
					saveAs(blob, fileLock.files[index].name+".enc");
					fileLock.files[index].duration = (new Date() - fileLock.files[index].started)/1000;
					console.log("Encrypting " + index + " took " + fileLock.files[index].duration + " seconds at " + Math.floor((fileLock.files[index].size/fileLock.files[index].duration)/1000)/1000 +" MB/s.");
					document.getElementById("password"+index).disabled = false;
					document.getElementById("button"+index).disabled = false;
					fileLock.files[index].status = "Ready";
					// Clean up.
					part1 = undefined;
					part2 = undefined;
					part3 = undefined;
					part4 = undefined;
					part5 = undefined;
					part6 = undefined;
					part7 = undefined;
					part8 = undefined;
					part9 = undefined;
					part10 = undefined;
					part11 = undefined;
					part12 = undefined;
					part13 = undefined;
					part14 = undefined;
					part15 = undefined;
					part16 = undefined;
					base64 = undefined;
					window.URL.revokeObjectURL(blob)
				} else {
					// Workers
					fileLock.files[index].started = new Date();
					var part1 = arrayBufferToBase64(fileLock.files[index].data.slice(0,(fileLock.files[index].data.byteLength/16)*1));
					var part2 = arrayBufferToBase64(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*1,(fileLock.files[index].data.byteLength/16)*2));
					var part3 = arrayBufferToBase64(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*2,(fileLock.files[index].data.byteLength/16)*3));
					var part4 = arrayBufferToBase64(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*3,(fileLock.files[index].data.byteLength/16)*4));
					var part5 = arrayBufferToBase64(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*4,(fileLock.files[index].data.byteLength/16)*5));
					var part6 = arrayBufferToBase64(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*5,(fileLock.files[index].data.byteLength/16)*6));
					var part7 = arrayBufferToBase64(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*6,(fileLock.files[index].data.byteLength/16)*7));
					var part8 = arrayBufferToBase64(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*7,(fileLock.files[index].data.byteLength/16)*8));
					var part9 = arrayBufferToBase64(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*8,(fileLock.files[index].data.byteLength/16)*9));
					var part10 = arrayBufferToBase64(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*9,(fileLock.files[index].data.byteLength/16)*10));
					var part11 = arrayBufferToBase64(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*10,(fileLock.files[index].data.byteLength/16)*11));
					var part12 = arrayBufferToBase64(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*11,(fileLock.files[index].data.byteLength/16)*12));
					var part13 = arrayBufferToBase64(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*12,(fileLock.files[index].data.byteLength/16)*13));
					var part14 = arrayBufferToBase64(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*13,(fileLock.files[index].data.byteLength/16)*14));
					var part15 = arrayBufferToBase64(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*14,(fileLock.files[index].data.byteLength/16)*15));
					var part16 = arrayBufferToBase64(fileLock.files[index].data.slice((fileLock.files[index].data.byteLength/16)*15,(fileLock.files[index].data.byteLength/16)*16));
					
					fileLock.worker1.postMessage({"data":part1,"password":document.getElementById("password"+index).value,"file":index,"part":1,"encrypted":false});
					fileLock.worker2.postMessage({"data":part2,"password":document.getElementById("password"+index).value,"file":index,"part":2,"encrypted":false});
					fileLock.worker3.postMessage({"data":part3,"password":document.getElementById("password"+index).value,"file":index,"part":3,"encrypted":false});
					fileLock.worker4.postMessage({"data":part4,"password":document.getElementById("password"+index).value,"file":index,"part":4,"encrypted":false});
					fileLock.worker5.postMessage({"data":part5,"password":document.getElementById("password"+index).value,"file":index,"part":5,"encrypted":false});
					fileLock.worker6.postMessage({"data":part6,"password":document.getElementById("password"+index).value,"file":index,"part":6,"encrypted":false});
					fileLock.worker7.postMessage({"data":part7,"password":document.getElementById("password"+index).value,"file":index,"part":7,"encrypted":false});
					fileLock.worker8.postMessage({"data":part8,"password":document.getElementById("password"+index).value,"file":index,"part":8,"encrypted":false});
					fileLock.worker9.postMessage({"data":part9,"password":document.getElementById("password"+index).value,"file":index,"part":9,"encrypted":false});
					fileLock.worker10.postMessage({"data":part10,"password":document.getElementById("password"+index).value,"file":index,"part":10,"encrypted":false});
					fileLock.worker11.postMessage({"data":part11,"password":document.getElementById("password"+index).value,"file":index,"part":11,"encrypted":false});
					fileLock.worker12.postMessage({"data":part12,"password":document.getElementById("password"+index).value,"file":index,"part":12,"encrypted":false});
					fileLock.worker13.postMessage({"data":part13,"password":document.getElementById("password"+index).value,"file":index,"part":13,"encrypted":false});
					fileLock.worker14.postMessage({"data":part14,"password":document.getElementById("password"+index).value,"file":index,"part":14,"encrypted":false});
					fileLock.worker15.postMessage({"data":part15,"password":document.getElementById("password"+index).value,"file":index,"part":15,"encrypted":false});
					fileLock.worker16.postMessage({"data":part16,"password":document.getElementById("password"+index).value,"file":index,"part":16,"encrypted":false});
					
					part1 = undefined;
					part2 = undefined;
					part3 = undefined;
					part4 = undefined;
					part5 = undefined;
					part6 = undefined;
					part7 = undefined;
					part8 = undefined;
					part9 = undefined;
					part10 = undefined;
					part11 = undefined;
					part12 = undefined;
					part13 = undefined;
					part14 = undefined;
					part15 = undefined;
					part16 = undefined;
					base64 = undefined;
				}
			}
        },
		
		completeWorker : function (index) { 
			console.log("Completing: " + index);
			if(fileLock.files[index].encrypted) {
				var base64 = btoa(fileLock.files[index].part1+fileLock.files[index].part2+fileLock.files[index].part3+fileLock.files[index].part4+fileLock.files[index].part5+fileLock.files[index].part6+fileLock.files[index].part7+fileLock.files[index].part8+fileLock.files[index].part9+fileLock.files[index].part10+fileLock.files[index].part11+fileLock.files[index].part12+fileLock.files[index].part13+fileLock.files[index].part14+fileLock.files[index].part15+fileLock.files[index].part16);
				var blob = new Blob([b64toBlob(base64)], {type: "application/octet-stream;charset=UTF-8"});
				saveAs(blob, fileLock.files[index].name.substring(0,fileLock.files[index].name.length-4));
				fileLock.files[index].duration = (new Date() - fileLock.files[index].started)/1000;
				console.log("Decrypting " + index + " took " + fileLock.files[index].duration + " seconds at " + Math.floor((fileLock.files[index].size/fileLock.files[index].duration)/1000)/1000 +" MB/s.");
				base64 = undefined;
				window.URL.revokeObjectURL(blob);
			} else {
				var base64 = btoa(CryptoJS.AES.encrypt("fileLock,",document.getElementById("password"+index).value).toString()+fileLock.files[index].part1+fileLock.files[index].part2+fileLock.files[index].part3+fileLock.files[index].part4+fileLock.files[index].part5+fileLock.files[index].part6+fileLock.files[index].part7+fileLock.files[index].part8+fileLock.files[index].part9+fileLock.files[index].part10+fileLock.files[index].part11+fileLock.files[index].part12+fileLock.files[index].part13+fileLock.files[index].part14+fileLock.files[index].part15+fileLock.files[index].part16);
				var blob = new Blob([b64toBlob(base64)], {type: "application/octet-stream;charset=UTF-8"});
				saveAs(blob, fileLock.files[index].name+".enc");
				fileLock.files[index].duration = (new Date() - fileLock.files[index].started)/1000;
				console.log("Encrypting " + index + " took " + fileLock.files[index].duration + " seconds at " + Math.floor((fileLock.files[index].size/fileLock.files[index].duration)/1000)/1000 +" MB/s.");
				base64 = undefined;
				window.URL.revokeObjectURL(blob);
			}
			document.getElementById("password"+index).disabled = false;
			document.getElementById("button"+index).disabled = false;
			fileLock.files[index].status = "Ready";
			// Clean up
			fileLock.files[index].part1 = undefined;
			fileLock.files[index].part2 = undefined;
			fileLock.files[index].part3 = undefined;
			fileLock.files[index].part4 = undefined;
			fileLock.files[index].part5 = undefined;
			fileLock.files[index].part6 = undefined;
			fileLock.files[index].part7 = undefined;
			fileLock.files[index].part8 = undefined;
			fileLock.files[index].part9 = undefined;
			fileLock.files[index].part10 = undefined;
			fileLock.files[index].part11 = undefined;
			fileLock.files[index].part12 = undefined;
			fileLock.files[index].part13 = undefined;
			fileLock.files[index].part14 = undefined;
			fileLock.files[index].part15 = undefined;
			fileLock.files[index].part16 = undefined;
			
		},
		
		handleWorker : function (m) {
			if(m.data.part === 1) {
				fileLock.files[m.data.file].part1 = m.data.data;
			} else if(m.data.part === 2) {
				fileLock.files[m.data.file].part2 = m.data.data;
			} else if(m.data.part === 3) {
				fileLock.files[m.data.file].part3 = m.data.data;
			} else if(m.data.part === 4) {
				fileLock.files[m.data.file].part4 = m.data.data;
			} else if(m.data.part === 5) {
				fileLock.files[m.data.file].part5 = m.data.data;
			} else if(m.data.part === 6) {
				fileLock.files[m.data.file].part6 = m.data.data;
			} else if(m.data.part === 7) {
				fileLock.files[m.data.file].part7 = m.data.data;
			} else if(m.data.part === 8) {
				fileLock.files[m.data.file].part8 = m.data.data;
			} else if(m.data.part === 9) {
				fileLock.files[m.data.file].part9 = m.data.data;
			} else if(m.data.part === 10) {
				fileLock.files[m.data.file].part10 = m.data.data;
			} else if(m.data.part === 11) {
				fileLock.files[m.data.file].part11 = m.data.data;
			} else if(m.data.part === 12) {
				fileLock.files[m.data.file].part12 = m.data.data;
			} else if(m.data.part === 13) {
				fileLock.files[m.data.file].part13 = m.data.data;
			} else if(m.data.part === 14) {
				fileLock.files[m.data.file].part14 = m.data.data;
			} else if(m.data.part === 15) {
				fileLock.files[m.data.file].part15 = m.data.data;
			} else if(m.data.part === 16) {
				fileLock.files[m.data.file].part16 = m.data.data;
			}
			if(fileLock.files[m.data.file].part1 && fileLock.files[m.data.file].part2 && fileLock.files[m.data.file].part3 && fileLock.files[m.data.file].part4 && fileLock.files[m.data.file].part5 && fileLock.files[m.data.file].part6 && fileLock.files[m.data.file].part7 && fileLock.files[m.data.file].part8 && fileLock.files[m.data.file].part9 && fileLock.files[m.data.file].part11 && fileLock.files[m.data.file].part11 && fileLock.files[m.data.file].part12 && fileLock.files[m.data.file].part13 && fileLock.files[m.data.file].part14 && fileLock.files[m.data.file].part15 && fileLock.files[m.data.file].part16) {
				fileLock.completeWorker(m.data.file);
			}
		},
		
		incorrectPassword : function () {
			var states = "";
			for (fileLock.file3=0;fileLock.file3<fileLock.files.length;fileLock.file3+=1) {
				states = states+fileLock.files[fileLock.file3].status;
			}
			if(states.indexOf("Crypting") == -1) {
				alert("Incorrect Password");
				fileLock.willAlert = false;
			} else {
				setTimeout(fileLock.incorrectPassword,500);
			}
		}
    };
	
    fileLock.Setup();
    document.getElementById('files').addEventListener('change', fileLock.FileSelectionHandler, false);
	
	fileLock.worker1.addEventListener('message', function(m) {
		fileLock.handleWorker(m);
	}, false);
	fileLock.worker2.addEventListener('message', function(m) {
		fileLock.handleWorker(m);
	}, false);
	fileLock.worker3.addEventListener('message', function(m) {
		fileLock.handleWorker(m);
	}, false);
	fileLock.worker4.addEventListener('message', function(m) {
		fileLock.handleWorker(m);
	}, false);
	fileLock.worker5.addEventListener('message', function(m) {
		fileLock.handleWorker(m);
	}, false);
	fileLock.worker6.addEventListener('message', function(m) {
		fileLock.handleWorker(m);
	}, false);
	fileLock.worker7.addEventListener('message', function(m) {
		fileLock.handleWorker(m);
	}, false);
	fileLock.worker8.addEventListener('message', function(m) {
		fileLock.handleWorker(m);
	}, false);
	fileLock.worker9.addEventListener('message', function(m) {
		fileLock.handleWorker(m);
	}, false);
	fileLock.worker10.addEventListener('message', function(m) {
		fileLock.handleWorker(m);
	}, false);
	fileLock.worker11.addEventListener('message', function(m) {
		fileLock.handleWorker(m);
	}, false);
	fileLock.worker12.addEventListener('message', function(m) {
		fileLock.handleWorker(m);
	}, false);
	fileLock.worker13.addEventListener('message', function(m) {
		fileLock.handleWorker(m);
	}, false);
	fileLock.worker14.addEventListener('message', function(m) {
		fileLock.handleWorker(m);
	}, false);
	fileLock.worker15.addEventListener('message', function(m) {
		fileLock.handleWorker(m);
	}, false);
	fileLock.worker16.addEventListener('message', function(m) {
		fileLock.handleWorker(m);
	}, false);
} else {
    // worker.js
	self.addEventListener ('message', function(m) { // Listen for postMessages, m being the message.
		"use strict";
		if(m.data.part){
			try {
				if(m.data.encrypted) {
					self.postMessage({"data":atob(CryptoJS.AES.decrypt(m.data.data, m.data.password).toString(CryptoJS.enc.Base64)), "file":m.data.file, "part":m.data.part});
				} else {
					self.postMessage({"data":atob(CryptoJS.AES.encrypt(CryptoJS.enc.Base64.parse(m.data.data), m.data.password).toString()), "file":m.data.file, "part":m.data.part});
				}
			} catch(error) {
				self.postMessage({"error":error.toString()});
			}
		}
	}, false);
}
