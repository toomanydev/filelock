//http://www.featureblend.com/license.txt
var FlashDetect=new function(){var self=this;self.installed=false;self.raw="";self.major=-1;self.minor=-1;self.revision=-1;self.revisionStr="";var activeXDetectRules=[{"name":"ShockwaveFlash.ShockwaveFlash.7","version":function(obj){return getActiveXVersion(obj);}},{"name":"ShockwaveFlash.ShockwaveFlash.6","version":function(obj){var version="6,0,21";try{obj.AllowScriptAccess="always";version=getActiveXVersion(obj);}catch(err){alert(err)}
return version;}},{"name":"ShockwaveFlash.ShockwaveFlash","version":function(obj){return getActiveXVersion(obj);}}];var getActiveXVersion=function(activeXObj){var version=-1;try{version=activeXObj.GetVariable("$version");}catch(err){alert(err)}
return version;};var getActiveXObject=function(name){var obj=-1;try{obj=new ActiveXObject(name);}catch(err){obj={activeXError:true};}
return obj;};var parseActiveXVersion=function(str){var versionArray=str.split(",");return{"raw":str,"major":parseInt(versionArray[0].split(" ")[1],10),"minor":parseInt(versionArray[1],10),"revision":parseInt(versionArray[2],10),"revisionStr":versionArray[2]};};var parseStandardVersion=function(str){var descParts=str.split(/ +/);var majorMinor=descParts[2].split(/\./);var revisionStr=descParts[3];return{"raw":str,"major":parseInt(majorMinor[0],10),"minor":parseInt(majorMinor[1],10),"revisionStr":revisionStr,"revision":parseRevisionStrToInt(revisionStr)};};var parseRevisionStrToInt=function(str){return parseInt(str.replace(/[a-zA-Z]/g,""),10)||self.revision;};self.majorAtLeast=function(version){return self.major>=version;};self.minorAtLeast=function(version){return self.minor>=version;};self.revisionAtLeast=function(version){return self.revision>=version;};self.versionAtLeast=function(major){var properties=[self.major,self.minor,self.revision];var len=Math.min(properties.length,arguments.length);for(i=0;i<len;i++){if(properties[i]>=arguments[i]){if(i+1<len&&properties[i]==arguments[i]){continue;}else{return true;}}else{return false;}}};self.FlashDetect=function(){if(navigator.plugins&&navigator.plugins.length>0){var type='application/x-shockwave-flash';var mimeTypes=navigator.mimeTypes;if(mimeTypes&&mimeTypes[type]&&mimeTypes[type].enabledPlugin&&mimeTypes[type].enabledPlugin.description){var version=mimeTypes[type].enabledPlugin.description;var versionObj=parseStandardVersion(version);self.raw=versionObj.raw;self.major=versionObj.major;self.minor=versionObj.minor;self.revisionStr=versionObj.revisionStr;self.revision=versionObj.revision;self.installed=true;}}else if(navigator.appVersion.indexOf("Mac")==-1&&window.execScript){var version=-1;for(var i=0;i<activeXDetectRules.length&&version==-1;i++){var obj=getActiveXObject(activeXDetectRules[i].name);if(!obj.activeXError){self.installed=true;version=activeXDetectRules[i].version(obj);if(version!=-1){var versionObj=parseActiveXVersion(version);self.raw=versionObj.raw;self.major=versionObj.major;self.minor=versionObj.minor;self.revision=versionObj.revision;self.revisionStr=versionObj.revisionStr;}}}}}();};FlashDetect.JS_RELEASE="1.0.4";

// filer.js

/**
* Copyright 2012 - Eric Bidelman
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* @fileoverview
* Convenient wrapper library for the HTML5 Filesystem API, implementing
* familiar UNIX commands (cp, mv, ls) for its API.
*
* @author Eric Bidelman (ebidel@gmail.com)
* @version: 0.4.1
*/
/**
* Creates and returns a blob from a data URL (either base64 encoded or not).
*
* @param {string} dataURL The data URL to convert.
* @return {Blob} A blob representing the array buffer data.
*/
  function dataURLToBlob(dataURL) {
	var BASE64_MARKER = ';base64,';
	if (dataURL.indexOf(BASE64_MARKER) == -1) {
	  var parts = dataURL.split(',');
	  var contentType = parts[0].split(':')[1];
	  var raw = parts[1];

	  return new Blob([raw], {type: contentType});
	}

	var parts = dataURL.split(BASE64_MARKER);
	var contentType = parts[0].split(':')[1];
	var raw = window.atob(parts[1]);
	var rawLength = raw.length;

	var uInt8Array = new Uint8Array(rawLength);

	for (var i = 0; i < rawLength; ++i) {
	  uInt8Array[i] = raw.charCodeAt(i);
	}

	return new Blob([uInt8Array], {type: contentType});
  }

// core-min.js

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS = CryptoJS || function (h, r) {
		var k = {}, l = k.lib = {}, n = function () {}, f = l.Base = {
				extend: function (a) {
					n.prototype = this;
					var b = new n;
					a && b.mixIn(a);
					b.hasOwnProperty("init") || (b.init = function () {
						b.$super.init.apply(this, arguments)
					});
					b.init.prototype = b;
					b.$super = this;
					return b
				},
				create: function () {
					var a = this.extend();
					a.init.apply(a, arguments);
					return a
				},
				init: function () {},
				mixIn: function (a) {
					for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
					a.hasOwnProperty("toString") && (this.toString = a.toString)
				},
				clone: function () {
					return this.init.prototype.extend(this)
				}
			},
			j = l.WordArray = f.extend({
				init: function (a, b) {
					a = this.words = a || [];
					this.sigBytes = b != r ? b : 4 * a.length
				},
				toString: function (a) {
					return (a || s).stringify(this)
				},
				concat: function (a) {
					var b = this.words,
						d = a.words,
						c = this.sigBytes;
					a = a.sigBytes;
					this.clamp();
					if (c % 4) for (var e = 0; e < a; e++) b[c + e >>> 2] |= (d[e >>> 2] >>> 24 - 8 * (e % 4) & 255) << 24 - 8 * ((c + e) % 4);
					else if (65535 < d.length) for (e = 0; e < a; e += 4) b[c + e >>> 2] = d[e >>> 2];
					else b.push.apply(b, d);
					this.sigBytes += a;
					return this
				},
				clamp: function () {
					var a = this.words,
						b = this.sigBytes;
					a[b >>> 2] &= 4294967295 <<
						32 - 8 * (b % 4);
					a.length = h.ceil(b / 4)
				},
				clone: function () {
					var a = f.clone.call(this);
					a.words = this.words.slice(0);
					return a
				},
				random: function (a) {
					for (var b = [], d = 0; d < a; d += 4) b.push(4294967296 * h.random() | 0);
					return new j.init(b, a)
				}
			}),
			m = k.enc = {}, s = m.Hex = {
				stringify: function (a) {
					var b = a.words;
					a = a.sigBytes;
					for (var d = [], c = 0; c < a; c++) {
						var e = b[c >>> 2] >>> 24 - 8 * (c % 4) & 255;
						d.push((e >>> 4).toString(16));
						d.push((e & 15).toString(16))
					}
					return d.join("")
				},
				parse: function (a) {
					for (var b = a.length, d = [], c = 0; c < b; c += 2) d[c >>> 3] |= parseInt(a.substr(c,
							2), 16) << 24 - 4 * (c % 8);
					return new j.init(d, b / 2)
				}
			}, p = m.Latin1 = {
				stringify: function (a) {
					var b = a.words;
					a = a.sigBytes;
					for (var d = [], c = 0; c < a; c++) d.push(String.fromCharCode(b[c >>> 2] >>> 24 - 8 * (c % 4) & 255));
					return d.join("")
				},
				parse: function (a) {
					for (var b = a.length, d = [], c = 0; c < b; c++) d[c >>> 2] |= (a.charCodeAt(c) & 255) << 24 - 8 * (c % 4);
					return new j.init(d, b)
				}
			}, t = m.Utf8 = {
				stringify: function (a) {
					try {
						return decodeURIComponent(escape(p.stringify(a)))
					} catch (b) {
						throw Error("Malformed UTF-8 data");
					}
				},
				parse: function (a) {
					return p.parse(unescape(encodeURIComponent(a)))
				}
			},
			q = l.BufferedBlockAlgorithm = f.extend({
				reset: function () {
					this._data = new j.init;
					this._nDataBytes = 0
				},
				_append: function (a) {
					"string" == typeof a && (a = t.parse(a));
					this._data.concat(a);
					this._nDataBytes += a.sigBytes
				},
				_process: function (a) {
					var b = this._data,
						d = b.words,
						c = b.sigBytes,
						e = this.blockSize,
						f = c / (4 * e),
						f = a ? h.ceil(f) : h.max((f | 0) - this._minBufferSize, 0);
					a = f * e;
					c = h.min(4 * a, c);
					if (a) {
						for (var g = 0; g < a; g += e) this._doProcessBlock(d, g);
						g = d.splice(0, a);
						b.sigBytes -= c
					}
					return new j.init(g, c)
				},
				clone: function () {
					var a = f.clone.call(this);
					a._data = this._data.clone();
					return a
				},
				_minBufferSize: 0
			});
		l.Hasher = q.extend({
			cfg: f.extend(),
			init: function (a) {
				this.cfg = this.cfg.extend(a);
				this.reset()
			},
			reset: function () {
				q.reset.call(this);
				this._doReset()
			},
			update: function (a) {
				this._append(a);
				this._process();
				return this
			},
			finalize: function (a) {
				a && this._append(a);
				return this._doFinalize()
			},
			blockSize: 16,
			_createHelper: function (a) {
				return function (b, d) {
					return (new a.init(d)).finalize(b)
				}
			},
			_createHmacHelper: function (a) {
				return function (b, d) {
					return (new u.HMAC.init(a,
						d)).finalize(b)
				}
			}
		});
		var u = k.algo = {};
		return k
	}(Math);

// enc-base64-min.js

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(){var h=CryptoJS,j=h.lib.WordArray;h.enc.Base64={stringify:function(b){var e=b.words,f=b.sigBytes,c=this._map;b.clamp();b=[];for(var a=0;a<f;a+=3)for(var d=(e[a>>>2]>>>24-8*(a%4)&255)<<16|(e[a+1>>>2]>>>24-8*((a+1)%4)&255)<<8|e[a+2>>>2]>>>24-8*((a+2)%4)&255,g=0;4>g&&a+0.75*g<f;g++)b.push(c.charAt(d>>>6*(3-g)&63));if(e=c.charAt(64))for(;b.length%4;)b.push(e);return b.join("")},parse:function(b){var e=b.length,f=this._map,c=f.charAt(64);c&&(c=b.indexOf(c),-1!=c&&(e=c));for(var c=[],a=0,d=0;d<
e;d++)if(d%4){var g=f.indexOf(b.charAt(d-1))<<2*(d%4),h=f.indexOf(b.charAt(d))>>>6-2*(d%4);c[a>>>2]|=(g|h)<<24-8*(a%4);a++}return j.create(c,a)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();

// aes.js

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js/wiki/License
(c) 2009-2013 by Jeff Mott. All rights reserved.
*/
var CryptoJS = CryptoJS || function (u, p) {
		var d = {}, l = d.lib = {}, s = function () {}, t = l.Base = {
				extend: function (a) {
					s.prototype = this;
					var c = new s;
					a && c.mixIn(a);
					c.hasOwnProperty("init") || (c.init = function () {
						c.$super.init.apply(this, arguments)
					});
					c.init.prototype = c;
					c.$super = this;
					return c
				},
				create: function () {
					var a = this.extend();
					a.init.apply(a, arguments);
					return a
				},
				init: function () {},
				mixIn: function (a) {
					for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
					a.hasOwnProperty("toString") && (this.toString = a.toString)
				},
				clone: function () {
					return this.init.prototype.extend(this)
				}
			},
			r = l.WordArray = t.extend({
				init: function (a, c) {
					a = this.words = a || [];
					this.sigBytes = c != p ? c : 4 * a.length
				},
				toString: function (a) {
					return (a || v).stringify(this)
				},
				concat: function (a) {
					var c = this.words,
						e = a.words,
						j = this.sigBytes;
					a = a.sigBytes;
					this.clamp();
					if (j % 4) for (var k = 0; k < a; k++) c[j + k >>> 2] |= (e[k >>> 2] >>> 24 - 8 * (k % 4) & 255) << 24 - 8 * ((j + k) % 4);
					else if (65535 < e.length) for (k = 0; k < a; k += 4) c[j + k >>> 2] = e[k >>> 2];
					else c.push.apply(c, e);
					this.sigBytes += a;
					return this
				},
				clamp: function () {
					var a = this.words,
						c = this.sigBytes;
					a[c >>> 2] &= 4294967295 <<
						32 - 8 * (c % 4);
					a.length = u.ceil(c / 4)
				},
				clone: function () {
					var a = t.clone.call(this);
					a.words = this.words.slice(0);
					return a
				},
				random: function (a) {
					for (var c = [], e = 0; e < a; e += 4) c.push(4294967296 * u.random() | 0);
					return new r.init(c, a)
				}
			}),
			w = d.enc = {}, v = w.Hex = {
				stringify: function (a) {
					var c = a.words;
					a = a.sigBytes;
					for (var e = [], j = 0; j < a; j++) {
						var k = c[j >>> 2] >>> 24 - 8 * (j % 4) & 255;
						e.push((k >>> 4).toString(16));
						e.push((k & 15).toString(16))
					}
					return e.join("")
				},
				parse: function (a) {
					for (var c = a.length, e = [], j = 0; j < c; j += 2) e[j >>> 3] |= parseInt(a.substr(j,
							2), 16) << 24 - 4 * (j % 8);
					return new r.init(e, c / 2)
				}
			}, b = w.Latin1 = {
				stringify: function (a) {
					var c = a.words;
					a = a.sigBytes;
					for (var e = [], j = 0; j < a; j++) e.push(String.fromCharCode(c[j >>> 2] >>> 24 - 8 * (j % 4) & 255));
					return e.join("")
				},
				parse: function (a) {
					for (var c = a.length, e = [], j = 0; j < c; j++) e[j >>> 2] |= (a.charCodeAt(j) & 255) << 24 - 8 * (j % 4);
					return new r.init(e, c)
				}
			}, x = w.Utf8 = {
				stringify: function (a) {
					try {
						return decodeURIComponent(escape(b.stringify(a)))
					} catch (c) {
						throw Error("Malformed UTF-8 data");
					}
				},
				parse: function (a) {
					return b.parse(unescape(encodeURIComponent(a)))
				}
			},
			q = l.BufferedBlockAlgorithm = t.extend({
				reset: function () {
					this._data = new r.init;
					this._nDataBytes = 0
				},
				_append: function (a) {
					"string" == typeof a && (a = x.parse(a));
					this._data.concat(a);
					this._nDataBytes += a.sigBytes
				},
				_process: function (a) {
					var c = this._data,
						e = c.words,
						j = c.sigBytes,
						k = this.blockSize,
						b = j / (4 * k),
						b = a ? u.ceil(b) : u.max((b | 0) - this._minBufferSize, 0);
					a = b * k;
					j = u.min(4 * a, j);
					if (a) {
						for (var q = 0; q < a; q += k) this._doProcessBlock(e, q);
						q = e.splice(0, a);
						c.sigBytes -= j
					}
					return new r.init(q, j)
				},
				clone: function () {
					var a = t.clone.call(this);
					a._data = this._data.clone();
					return a
				},
				_minBufferSize: 0
			});
		l.Hasher = q.extend({
			cfg: t.extend(),
			init: function (a) {
				this.cfg = this.cfg.extend(a);
				this.reset()
			},
			reset: function () {
				q.reset.call(this);
				this._doReset()
			},
			update: function (a) {
				this._append(a);
				this._process();
				return this
			},
			finalize: function (a) {
				a && this._append(a);
				return this._doFinalize()
			},
			blockSize: 16,
			_createHelper: function (a) {
				return function (b, e) {
					return (new a.init(e)).finalize(b)
				}
			},
			_createHmacHelper: function (a) {
				return function (b, e) {
					return (new n.HMAC.init(a,
						e)).finalize(b)
				}
			}
		});
		var n = d.algo = {};
		return d
	}(Math);
(function () {
	var u = CryptoJS,
		p = u.lib.WordArray;
	u.enc.Base64 = {
		stringify: function (d) {
			var l = d.words,
				p = d.sigBytes,
				t = this._map;
			d.clamp();
			d = [];
			for (var r = 0; r < p; r += 3) for (var w = (l[r >>> 2] >>> 24 - 8 * (r % 4) & 255) << 16 | (l[r + 1 >>> 2] >>> 24 - 8 * ((r + 1) % 4) & 255) << 8 | l[r + 2 >>> 2] >>> 24 - 8 * ((r + 2) % 4) & 255, v = 0; 4 > v && r + 0.75 * v < p; v++) d.push(t.charAt(w >>> 6 * (3 - v) & 63));
			if (l = t.charAt(64)) for (; d.length % 4;) d.push(l);
			return d.join("")
		},
		parse: function (d) {
			var l = d.length,
				s = this._map,
				t = s.charAt(64);
			t && (t = d.indexOf(t), -1 != t && (l = t));
			for (var t = [], r = 0, w = 0; w <
				l; w++) if (w % 4) {
					var v = s.indexOf(d.charAt(w - 1)) << 2 * (w % 4),
						b = s.indexOf(d.charAt(w)) >>> 6 - 2 * (w % 4);
					t[r >>> 2] |= (v | b) << 24 - 8 * (r % 4);
					r++
				}
			return p.create(t, r)
		},
		_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
	}
})();
(function (u) {
	function p(b, n, a, c, e, j, k) {
		b = b + (n & a | ~n & c) + e + k;
		return (b << j | b >>> 32 - j) + n
	}
	function d(b, n, a, c, e, j, k) {
		b = b + (n & c | a & ~c) + e + k;
		return (b << j | b >>> 32 - j) + n
	}
	function l(b, n, a, c, e, j, k) {
		b = b + (n ^ a ^ c) + e + k;
		return (b << j | b >>> 32 - j) + n
	}
	function s(b, n, a, c, e, j, k) {
		b = b + (a ^ (n | ~c)) + e + k;
		return (b << j | b >>> 32 - j) + n
	}
	for (var t = CryptoJS, r = t.lib, w = r.WordArray, v = r.Hasher, r = t.algo, b = [], x = 0; 64 > x; x++) b[x] = 4294967296 * u.abs(u.sin(x + 1)) | 0;
	r = r.MD5 = v.extend({
		_doReset: function () {
			this._hash = new w.init([1732584193, 4023233417, 2562383102, 271733878])
		},
		_doProcessBlock: function (q, n) {
			for (var a = 0; 16 > a; a++) {
				var c = n + a,
					e = q[c];
				q[c] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360
			}
			var a = this._hash.words,
				c = q[n + 0],
				e = q[n + 1],
				j = q[n + 2],
				k = q[n + 3],
				z = q[n + 4],
				r = q[n + 5],
				t = q[n + 6],
				w = q[n + 7],
				v = q[n + 8],
				A = q[n + 9],
				B = q[n + 10],
				C = q[n + 11],
				u = q[n + 12],
				D = q[n + 13],
				E = q[n + 14],
				x = q[n + 15],
				f = a[0],
				m = a[1],
				g = a[2],
				h = a[3],
				f = p(f, m, g, h, c, 7, b[0]),
				h = p(h, f, m, g, e, 12, b[1]),
				g = p(g, h, f, m, j, 17, b[2]),
				m = p(m, g, h, f, k, 22, b[3]),
				f = p(f, m, g, h, z, 7, b[4]),
				h = p(h, f, m, g, r, 12, b[5]),
				g = p(g, h, f, m, t, 17, b[6]),
				m = p(m, g, h, f, w, 22, b[7]),
				f = p(f, m, g, h, v, 7, b[8]),
				h = p(h, f, m, g, A, 12, b[9]),
				g = p(g, h, f, m, B, 17, b[10]),
				m = p(m, g, h, f, C, 22, b[11]),
				f = p(f, m, g, h, u, 7, b[12]),
				h = p(h, f, m, g, D, 12, b[13]),
				g = p(g, h, f, m, E, 17, b[14]),
				m = p(m, g, h, f, x, 22, b[15]),
				f = d(f, m, g, h, e, 5, b[16]),
				h = d(h, f, m, g, t, 9, b[17]),
				g = d(g, h, f, m, C, 14, b[18]),
				m = d(m, g, h, f, c, 20, b[19]),
				f = d(f, m, g, h, r, 5, b[20]),
				h = d(h, f, m, g, B, 9, b[21]),
				g = d(g, h, f, m, x, 14, b[22]),
				m = d(m, g, h, f, z, 20, b[23]),
				f = d(f, m, g, h, A, 5, b[24]),
				h = d(h, f, m, g, E, 9, b[25]),
				g = d(g, h, f, m, k, 14, b[26]),
				m = d(m, g, h, f, v, 20, b[27]),
				f = d(f, m, g, h, D, 5, b[28]),
				h = d(h, f,
					m, g, j, 9, b[29]),
				g = d(g, h, f, m, w, 14, b[30]),
				m = d(m, g, h, f, u, 20, b[31]),
				f = l(f, m, g, h, r, 4, b[32]),
				h = l(h, f, m, g, v, 11, b[33]),
				g = l(g, h, f, m, C, 16, b[34]),
				m = l(m, g, h, f, E, 23, b[35]),
				f = l(f, m, g, h, e, 4, b[36]),
				h = l(h, f, m, g, z, 11, b[37]),
				g = l(g, h, f, m, w, 16, b[38]),
				m = l(m, g, h, f, B, 23, b[39]),
				f = l(f, m, g, h, D, 4, b[40]),
				h = l(h, f, m, g, c, 11, b[41]),
				g = l(g, h, f, m, k, 16, b[42]),
				m = l(m, g, h, f, t, 23, b[43]),
				f = l(f, m, g, h, A, 4, b[44]),
				h = l(h, f, m, g, u, 11, b[45]),
				g = l(g, h, f, m, x, 16, b[46]),
				m = l(m, g, h, f, j, 23, b[47]),
				f = s(f, m, g, h, c, 6, b[48]),
				h = s(h, f, m, g, w, 10, b[49]),
				g = s(g, h, f, m,
					E, 15, b[50]),
				m = s(m, g, h, f, r, 21, b[51]),
				f = s(f, m, g, h, u, 6, b[52]),
				h = s(h, f, m, g, k, 10, b[53]),
				g = s(g, h, f, m, B, 15, b[54]),
				m = s(m, g, h, f, e, 21, b[55]),
				f = s(f, m, g, h, v, 6, b[56]),
				h = s(h, f, m, g, x, 10, b[57]),
				g = s(g, h, f, m, t, 15, b[58]),
				m = s(m, g, h, f, D, 21, b[59]),
				f = s(f, m, g, h, z, 6, b[60]),
				h = s(h, f, m, g, C, 10, b[61]),
				g = s(g, h, f, m, j, 15, b[62]),
				m = s(m, g, h, f, A, 21, b[63]);
			a[0] = a[0] + f | 0;
			a[1] = a[1] + m | 0;
			a[2] = a[2] + g | 0;
			a[3] = a[3] + h | 0
		},
		_doFinalize: function () {
			var b = this._data,
				n = b.words,
				a = 8 * this._nDataBytes,
				c = 8 * b.sigBytes;
			n[c >>> 5] |= 128 << 24 - c % 32;
			var e = u.floor(a /
				4294967296);
			n[(c + 64 >>> 9 << 4) + 15] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360;
			n[(c + 64 >>> 9 << 4) + 14] = (a << 8 | a >>> 24) & 16711935 | (a << 24 | a >>> 8) & 4278255360;
			b.sigBytes = 4 * (n.length + 1);
			this._process();
			b = this._hash;
			n = b.words;
			for (a = 0; 4 > a; a++) c = n[a], n[a] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360;
			return b
		},
		clone: function () {
			var b = v.clone.call(this);
			b._hash = this._hash.clone();
			return b
		}
	});
	t.MD5 = v._createHelper(r);
	t.HmacMD5 = v._createHmacHelper(r)
})(Math);
(function () {
	var u = CryptoJS,
		p = u.lib,
		d = p.Base,
		l = p.WordArray,
		p = u.algo,
		s = p.EvpKDF = d.extend({
			cfg: d.extend({
				keySize: 4,
				hasher: p.MD5,
				iterations: 1
			}),
			init: function (d) {
				this.cfg = this.cfg.extend(d)
			},
			compute: function (d, r) {
				for (var p = this.cfg, s = p.hasher.create(), b = l.create(), u = b.words, q = p.keySize, p = p.iterations; u.length < q;) {
					n && s.update(n);
					var n = s.update(d).finalize(r);
					s.reset();
					for (var a = 1; a < p; a++) n = s.finalize(n), s.reset();
					b.concat(n)
				}
				b.sigBytes = 4 * q;
				return b
			}
		});
	u.EvpKDF = function (d, l, p) {
		return s.create(p).compute(d,
			l)
	}
})();
CryptoJS.lib.Cipher || function (u) {
	var p = CryptoJS,
		d = p.lib,
		l = d.Base,
		s = d.WordArray,
		t = d.BufferedBlockAlgorithm,
		r = p.enc.Base64,
		w = p.algo.EvpKDF,
		v = d.Cipher = t.extend({
			cfg: l.extend(),
			createEncryptor: function (e, a) {
				return this.create(this._ENC_XFORM_MODE, e, a)
			},
			createDecryptor: function (e, a) {
				return this.create(this._DEC_XFORM_MODE, e, a)
			},
			init: function (e, a, b) {
				this.cfg = this.cfg.extend(b);
				this._xformMode = e;
				this._key = a;
				this.reset()
			},
			reset: function () {
				t.reset.call(this);
				this._doReset()
			},
			process: function (e) {
				this._append(e);
				return this._process()
			},
			finalize: function (e) {
				e && this._append(e);
				return this._doFinalize()
			},
			keySize: 4,
			ivSize: 4,
			_ENC_XFORM_MODE: 1,
			_DEC_XFORM_MODE: 2,
			_createHelper: function (e) {
				return {
					encrypt: function (b, k, d) {
						return ("string" == typeof k ? c : a).encrypt(e, b, k, d)
					},
					decrypt: function (b, k, d) {
						return ("string" == typeof k ? c : a).decrypt(e, b, k, d)
					}
				}
			}
		});
	d.StreamCipher = v.extend({
		_doFinalize: function () {
			return this._process(!0)
		},
		blockSize: 1
	});
	var b = p.mode = {}, x = function (e, a, b) {
			var c = this._iv;
			c ? this._iv = u : c = this._prevBlock;
			for (var d = 0; d < b; d++) e[a + d] ^=
					c[d]
		}, q = (d.BlockCipherMode = l.extend({
			createEncryptor: function (e, a) {
				return this.Encryptor.create(e, a)
			},
			createDecryptor: function (e, a) {
				return this.Decryptor.create(e, a)
			},
			init: function (e, a) {
				this._cipher = e;
				this._iv = a
			}
		})).extend();
	q.Encryptor = q.extend({
		processBlock: function (e, a) {
			var b = this._cipher,
				c = b.blockSize;
			x.call(this, e, a, c);
			b.encryptBlock(e, a);
			this._prevBlock = e.slice(a, a + c)
		}
	});
	q.Decryptor = q.extend({
		processBlock: function (e, a) {
			var b = this._cipher,
				c = b.blockSize,
				d = e.slice(a, a + c);
			b.decryptBlock(e, a);
			x.call(this,
				e, a, c);
			this._prevBlock = d
		}
	});
	b = b.CBC = q;
	q = (p.pad = {}).Pkcs7 = {
		pad: function (a, b) {
			for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, l = [], n = 0; n < c; n += 4) l.push(d);
			c = s.create(l, c);
			a.concat(c)
		},
		unpad: function (a) {
			a.sigBytes -= a.words[a.sigBytes - 1 >>> 2] & 255
		}
	};
	d.BlockCipher = v.extend({
		cfg: v.cfg.extend({
			mode: b,
			padding: q
		}),
		reset: function () {
			v.reset.call(this);
			var a = this.cfg,
				b = a.iv,
				a = a.mode;
			if (this._xformMode == this._ENC_XFORM_MODE) var c = a.createEncryptor;
			else c = a.createDecryptor, this._minBufferSize = 1;
			this._mode = c.call(a,
				this, b && b.words)
		},
		_doProcessBlock: function (a, b) {
			this._mode.processBlock(a, b)
		},
		_doFinalize: function () {
			var a = this.cfg.padding;
			if (this._xformMode == this._ENC_XFORM_MODE) {
				a.pad(this._data, this.blockSize);
				var b = this._process(!0)
			} else b = this._process(!0), a.unpad(b);
			return b
		},
		blockSize: 4
	});
	var n = d.CipherParams = l.extend({
		init: function (a) {
			this.mixIn(a)
		},
		toString: function (a) {
			return (a || this.formatter).stringify(this)
		}
	}),
		b = (p.format = {}).OpenSSL = {
			stringify: function (a) {
				var b = a.ciphertext;
				a = a.salt;
				return (a ? s.create([1398893684,
						1701076831
				]).concat(a).concat(b) : b).toString(r)
			},
			parse: function (a) {
				a = r.parse(a);
				var b = a.words;
				if (1398893684 == b[0] && 1701076831 == b[1]) {
					var c = s.create(b.slice(2, 4));
					b.splice(0, 4);
					a.sigBytes -= 16
				}
				return n.create({
					ciphertext: a,
					salt: c
				})
			}
		}, a = d.SerializableCipher = l.extend({
			cfg: l.extend({
				format: b
			}),
			encrypt: function (a, b, c, d) {
				d = this.cfg.extend(d);
				var l = a.createEncryptor(c, d);
				b = l.finalize(b);
				l = l.cfg;
				return n.create({
					ciphertext: b,
					key: c,
					iv: l.iv,
					algorithm: a,
					mode: l.mode,
					padding: l.padding,
					blockSize: a.blockSize,
					formatter: d.format
				})
			},
			decrypt: function (a, b, c, d) {
				d = this.cfg.extend(d);
				b = this._parse(b, d.format);
				return a.createDecryptor(c, d).finalize(b.ciphertext)
			},
			_parse: function (a, b) {
				return "string" == typeof a ? b.parse(a, this) : a
			}
		}),
		p = (p.kdf = {}).OpenSSL = {
			execute: function (a, b, c, d) {
				d || (d = s.random(8));
				a = w.create({
					keySize: b + c
				}).compute(a, d);
				c = s.create(a.words.slice(b), 4 * c);
				a.sigBytes = 4 * b;
				return n.create({
					key: a,
					iv: c,
					salt: d
				})
			}
		}, c = d.PasswordBasedCipher = a.extend({
			cfg: a.cfg.extend({
				kdf: p
			}),
			encrypt: function (b, c, d, l) {
				l = this.cfg.extend(l);
				d = l.kdf.execute(d,
					b.keySize, b.ivSize);
				l.iv = d.iv;
				b = a.encrypt.call(this, b, c, d.key, l);
				b.mixIn(d);
				return b
			},
			decrypt: function (b, c, d, l) {
				l = this.cfg.extend(l);
				c = this._parse(c, l.format);
				d = l.kdf.execute(d, b.keySize, b.ivSize, c.salt);
				l.iv = d.iv;
				return a.decrypt.call(this, b, c, d.key, l)
			}
		})
}();
(function () {
	for (var u = CryptoJS, p = u.lib.BlockCipher, d = u.algo, l = [], s = [], t = [], r = [], w = [], v = [], b = [], x = [], q = [], n = [], a = [], c = 0; 256 > c; c++) a[c] = 128 > c ? c << 1 : c << 1 ^ 283;
	for (var e = 0, j = 0, c = 0; 256 > c; c++) {
		var k = j ^ j << 1 ^ j << 2 ^ j << 3 ^ j << 4,
			k = k >>> 8 ^ k & 255 ^ 99;
		l[e] = k;
		s[k] = e;
		var z = a[e],
			F = a[z],
			G = a[F],
			y = 257 * a[k] ^ 16843008 * k;
		t[e] = y << 24 | y >>> 8;
		r[e] = y << 16 | y >>> 16;
		w[e] = y << 8 | y >>> 24;
		v[e] = y;
		y = 16843009 * G ^ 65537 * F ^ 257 * z ^ 16843008 * e;
		b[k] = y << 24 | y >>> 8;
		x[k] = y << 16 | y >>> 16;
		q[k] = y << 8 | y >>> 24;
		n[k] = y;
		e ? (e = z ^ a[a[a[G ^ z]]], j ^= a[a[j]]) : e = j = 1
	}
	var H = [0, 1, 2, 4, 8,
			16, 32, 64, 128, 27, 54
	],
		d = d.AES = p.extend({
			_doReset: function () {
				for (var a = this._key, c = a.words, d = a.sigBytes / 4, a = 4 * ((this._nRounds = d + 6) + 1), e = this._keySchedule = [], j = 0; j < a; j++) if (j < d) e[j] = c[j];
					else {
						var k = e[j - 1];
						j % d ? 6 < d && 4 == j % d && (k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[k & 255]) : (k = k << 8 | k >>> 24, k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[k & 255], k ^= H[j / d | 0] << 24);
						e[j] = e[j - d] ^ k
					}
				c = this._invKeySchedule = [];
				for (d = 0; d < a; d++) j = a - d, k = d % 4 ? e[j] : e[j - 4], c[d] = 4 > d || 4 >= j ? k : b[l[k >>> 24]] ^ x[l[k >>> 16 & 255]] ^ q[l[k >>>
						8 & 255]] ^ n[l[k & 255]]
			},
			encryptBlock: function (a, b) {
				this._doCryptBlock(a, b, this._keySchedule, t, r, w, v, l)
			},
			decryptBlock: function (a, c) {
				var d = a[c + 1];
				a[c + 1] = a[c + 3];
				a[c + 3] = d;
				this._doCryptBlock(a, c, this._invKeySchedule, b, x, q, n, s);
				d = a[c + 1];
				a[c + 1] = a[c + 3];
				a[c + 3] = d
			},
			_doCryptBlock: function (a, b, c, d, e, j, l, f) {
				for (var m = this._nRounds, g = a[b] ^ c[0], h = a[b + 1] ^ c[1], k = a[b + 2] ^ c[2], n = a[b + 3] ^ c[3], p = 4, r = 1; r < m; r++) var q = d[g >>> 24] ^ e[h >>> 16 & 255] ^ j[k >>> 8 & 255] ^ l[n & 255] ^ c[p++],
				s = d[h >>> 24] ^ e[k >>> 16 & 255] ^ j[n >>> 8 & 255] ^ l[g & 255] ^ c[p++], t =
					d[k >>> 24] ^ e[n >>> 16 & 255] ^ j[g >>> 8 & 255] ^ l[h & 255] ^ c[p++], n = d[n >>> 24] ^ e[g >>> 16 & 255] ^ j[h >>> 8 & 255] ^ l[k & 255] ^ c[p++], g = q, h = s, k = t;
				q = (f[g >>> 24] << 24 | f[h >>> 16 & 255] << 16 | f[k >>> 8 & 255] << 8 | f[n & 255]) ^ c[p++];
				s = (f[h >>> 24] << 24 | f[k >>> 16 & 255] << 16 | f[n >>> 8 & 255] << 8 | f[g & 255]) ^ c[p++];
				t = (f[k >>> 24] << 24 | f[n >>> 16 & 255] << 16 | f[g >>> 8 & 255] << 8 | f[h & 255]) ^ c[p++];
				n = (f[n >>> 24] << 24 | f[g >>> 16 & 255] << 16 | f[h >>> 8 & 255] << 8 | f[k & 255]) ^ c[p++];
				a[b] = q;
				a[b + 1] = s;
				a[b + 2] = t;
				a[b + 3] = n
			},
			keySize: 8
		});
	u.AES = p._createHelper(d)
})();

// Blob.js

/* Blob.js
 * A Blob implementation.
 * 2013-01-23
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

if (typeof Blob !== "function")
var Blob = (function (view) {
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
			, can_apply_typed_arrays = false
			, can_apply_typed_arrays_test = function(pass) {
				can_apply_typed_arrays = !pass;
			}
			
			, ArrayBuffer = view.ArrayBuffer
			, Uint8Array = view.Uint8Array
		;
		FakeBlob.fake = FB_proto.fake = true;
		while (file_ex_code--) {
			FileException.prototype[file_ex_codes[file_ex_code]] = file_ex_code + 1;
		}
		try {
			if (Uint8Array) {
				can_apply_typed_arrays_test.apply(0, new Uint8Array(1));
			}
		} catch (ex) {}
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
				if (can_apply_typed_arrays) {
					bb.push(String.fromCharCode.apply(String, new Uint8Array(data)));
				} else {
					var
						  str = ""
						, buf = new Uint8Array(data)
						, i = 0
						, buf_len = buf.length
					;
					for (; i < buf_len; i++) {
						str += String.fromCharCode(buf[i]);
					}
				}
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
}(self));

// BlobBuilder.js

/* BlobBuilder.js
* A BlobBuilder implementation.
* 2012-04-21
*
* By Eli Grey, http://eligrey.com
* License: X11/MIT
* See LICENSE.md
*/

/*global self, unescape */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
plusplus: true */

/*! @source http://purl.eligrey.com/github/BlobBuilder.js/blob/master/BlobBuilder.js */

var BlobBuilder = BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder || (function(view) {
"use strict";
var
get_class = function(object) {
return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
}
, FakeBlobBuilder = function(){
this.data = [];
}
, FakeBlob = function(data, type, encoding) {
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
, can_apply_typed_arrays = false
, can_apply_typed_arrays_test = function(pass) {
can_apply_typed_arrays = !pass;
}

, ArrayBuffer = view.ArrayBuffer
, Uint8Array = view.Uint8Array
;
FakeBlobBuilder.fake = FB_proto.fake = true;
while (file_ex_code--) {
FileException.prototype[file_ex_codes[file_ex_code]] = file_ex_code + 1;
}
try {
if (Uint8Array) {
can_apply_typed_arrays_test.apply(0, new Uint8Array(1));
}
} catch (ex) {}
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
if (Uint8Array && data instanceof ArrayBuffer) {
if (can_apply_typed_arrays) {
bb.push(String.fromCharCode.apply(String, new Uint8Array(data)));
} else {
var
str = ""
, buf = new Uint8Array(data)
, i = 0
, buf_len = buf.length
;
for (; i < buf_len; i++) {
str += String.fromCharCode(buf[i]);
}
}
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
}(self));

// FileSaver.min.js

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
//var saveAs=saveAs||(navigator.msSaveBlob&&navigator.msSaveBlob.bind(navigator))||(function(h){var r=h.document,l=function(){return h.URL||h.webkitURL||h},e=h.URL||h.webkitURL||h,n=r.createElementNS("http://www.w3.org/1999/xhtml","a"),g="download" in n,j=function(t){var s=r.createEvent("MouseEvents");s.initMouseEvent("click",true,false,h,0,0,0,0,0,false,false,false,false,0,null);t.dispatchEvent(s)},o=h.webkitRequestFileSystem,p=h.requestFileSystem||o||h.mozRequestFileSystem,m=function(s){(h.setImmediate||h.setTimeout)(function(){throw s},0)},c="application/octet-stream",k=0,b=[],i=function(){var t=b.length;while(t--){var s=b[t];if(typeof s==="string"){e.revokeObjectURL(s)}else{s.remove()}}b.length=0},q=function(t,s,w){s=[].concat(s);var v=s.length;while(v--){var x=t["on"+s[v]];if(typeof x==="function"){try{x.call(t,w||t)}catch(u){m(u)}}}},f=function(t,u){var v=this,B=t.type,E=false,x,w,s=function(){var F=l().createObjectURL(t);b.push(F);return F},A=function(){q(v,"writestart progress write writeend".split(" "))},D=function(){if(E||!x){x=s(t)}if(w){w.location.href=x}v.readyState=v.DONE;A()},z=function(F){return function(){if(v.readyState!==v.DONE){return F.apply(this,arguments)}}},y={create:true,exclusive:false},C;v.readyState=v.INIT;if(!u){u="download"}if(g){x=s(t);n.href=x;n.download=u;j(n);v.readyState=v.DONE;A();return}if(h.chrome&&B&&B!==c){C=t.slice||t.webkitSlice;t=C.call(t,0,t.size,c);E=true}if(o&&u!=="download"){u+=".download"}if(B===c||o){w=h}else{w=h.open()}if(!p){D();return}k+=t.size;p(h.TEMPORARY,k,z(function(F){F.root.getDirectory("saved",y,z(function(G){var H=function(){G.getFile(u,y,z(function(I){I.createWriter(z(function(J){J.onwriteend=function(K){w.location.href=I.toURL();b.push(I);v.readyState=v.DONE;q(v,"writeend",K)};J.onerror=function(){var K=J.error;if(K.code!==K.ABORT_ERR){D()}};"writestart progress write abort".split(" ").forEach(function(K){J["on"+K]=v["on"+K]});J.write(t);v.abort=function(){J.abort();v.readyState=v.DONE};v.readyState=v.WRITING}),D)}),D)};G.getFile(u,{create:false},z(function(I){I.remove();H()}),z(function(I){if(I.code===I.NOT_FOUND_ERR){H()}else{D()}}))}),D)}),D)},d=f.prototype,a=function(s,t){return new f(s,t)};d.abort=function(){var s=this;s.readyState=s.DONE;q(s,"abort")};d.readyState=d.INIT=0;d.WRITING=1;d.DONE=2;d.error=d.onwritestart=d.onprogress=d.onwrite=d.onabort=d.onerror=d.onwriteend=null;h.addEventListener("unload",i,false);return a}(self));

/* FileSaver.js
* A saveAs() FileSaver implementation.
* 2013-01-23
*
* By Eli Grey, http://eligrey.com
* License: X11/MIT
* See LICENSE.md
*/

/*global self */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
try{
var saveAs=saveAs||(navigator.msSaveOrOpenBlob&&navigator.msSaveOrOpenBlob.bind(navigator))||(function(h){"use strict";var r=h.document,l=function(){return h.URL||h.webkitURL||h},e=h.URL||h.webkitURL||h,n=r.createElementNS("http://www.w3.org/1999/xhtml","a"),g=!h.externalHost&&"download" in n,j=function(t){var s=r.createEvent("MouseEvents");s.initMouseEvent("click",true,false,h,0,0,0,0,0,false,false,false,false,0,null);t.dispatchEvent(s)},o=h.webkitRequestFileSystem,p=h.requestFileSystem||o||h.mozRequestFileSystem,m=function(s){(h.setImmediate||h.setTimeout)(function(){throw s},0)},c="application/octet-stream",k=0,b=[],i=function(){var t=b.length;while(t--){var s=b[t];if(typeof s==="string"){e.revokeObjectURL(s)}else{s.remove()}}b.length=0},q=function(t,s,w){s=[].concat(s);var v=s.length;while(v--){var x=t["on"+s[v]];if(typeof x==="function"){try{x.call(t,w||t)}catch(u){m(u)}}}},f=function(t,u){var v=this,B=t.type,E=false,x,w,s=function(){var F=l().createObjectURL(t);b.push(F);return F},A=function(){q(v,"writestart progress write writeend".split(" "))},D=function(){if(E||!x){x=s(t)}if(w){w.location.href=x}else{window.open(x,"_blank")}v.readyState=v.DONE;A()},z=function(F){return function(){if(v.readyState!==v.DONE){return F.apply(this,arguments)}}},y={create:true,exclusive:false},C;v.readyState=v.INIT;if(!u){u="download"}if(g){x=s(t);n.href=x;n.download=u;j(n);v.readyState=v.DONE;A();return}if(h.chrome&&B&&B!==c){C=t.slice||t.webkitSlice;t=C.call(t,0,t.size,c);E=true}if(o&&u!=="download"){u+=".download"}if(B===c||o){w=h}if(!p){D();return}k+=t.size;p(h.TEMPORARY,k,z(function(F){F.root.getDirectory("saved",y,z(function(G){var H=function(){G.getFile(u,y,z(function(I){I.createWriter(z(function(J){J.onwriteend=function(K){w.location.href=I.toURL();b.push(I);v.readyState=v.DONE;q(v,"writeend",K)};J.onerror=function(){var K=J.error;if(K.code!==K.ABORT_ERR){D()}};"writestart progress write abort".split(" ").forEach(function(K){J["on"+K]=v["on"+K]});J.write(t);v.abort=function(){J.abort();v.readyState=v.DONE};v.readyState=v.WRITING}),D)}),D)};G.getFile(u,{create:false},z(function(I){I.remove();H()}),z(function(I){if(I.code===I.NOT_FOUND_ERR){H()}else{D()}}))}),D)}),D)},d=f.prototype,a=function(s,t){return new f(s,t)};d.abort=function(){var s=this;s.readyState=s.DONE;q(s,"abort")};d.readyState=d.INIT=0;d.WRITING=1;d.DONE=2;d.error=d.onwritestart=d.onprogress=d.onwrite=d.onabort=d.onerror=d.onwriteend=null;h.addEventListener("unload",i,false);return a}(self));
} catch(e) {
	// Nothing, we can't use FileSaver, so we're going to use Flash in the application script.
}

// Application JavaScript

var html5String = "<input type='file' id='files' title='Click here to select the files you want to protect.' style='margin:5px auto;' name='files[]' multiple/><output id='list'></output>";
var flashString = "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' width='930' height='110' id='File Lock' align='middle'><param name='movie' value='./filelock.swf' /><param name='quality' value='high' /><param name='bgcolor' value='#F0F0F0' /><param name='play' value='true' /><param name='loop' value='true' /><param name='wmode' value='window' /><param name='scale' value='showall' /><param name='menu' value='true' /><param name='devicefont' value='false' /><param name='salign' value='' /><param name='allowScriptAccess' value='always' /><!--[if !IE]>--><object type='application/x-shockwave-flash' data='filelock.swf' id='File Lock2' width='930' height='110'><param name='movie' value='./filelock.swf' /><param name='quality' value='high' /><param name='bgcolor' value='#f0f0f0' /><param name='play' value='true' /><param name='loop' value='true' /><param name='wmode' value='window' /><param name='scale' value='showall' /><param name='menu' value='true' /><param name='devicefont' value='false' /><param name='salign' value='' /><param name='allowScriptAccess' value='always' /><!--<![endif]--><!--[if !IE]>--></object><!--<![endif]--></object>";
var noSupportString = "Sorry! Your browser does not support the HTML5 functions needed to use this website. You also do not have Flash version 10 or above installed. You can see a list of supported browsers on <a href='http://caniuse.com/filereader'>Can I use...</a>. Or, you can <a href='http://get.adobe.com/flashplayer/'>download the latest version of Flash</a>.";
var warningString = '<div id="warning">Warning: Your browser lacks support for <a href="http://caniuse.com/webworkers">web workers</a>. You can still encrypt files, but the browser will temporarily freeze while encrypting files and may crash if you attempt to encrypt large files.</div>';
var dataURIString = '<div id="warning">Warning: Your browser lacks support for <a href="http://caniuse.com/bloburls">blob URLs</a> and you don\'t have Flash Player 10 or above installed. You can still encrypt files, but you must remember to save encrypted files with a .enc file extension, and save decrypted files with their original file extension.</div>';
var state = 0; // 0 = No support, 1 = Flash Sync, 2 = Flash Worker, 3 = Blob Sync, 4 = Blob Worker
var files;
var fileIndex;
var fileName;
var fileData;
var fileEncrypted;
var workerFinalPart1;
var workerFinalPart2;
var workerFinalPart3;
var workerFinalPart4;
var workerFinalPart5;
var workerFinalPart6;
var workerFinalPart7;
var workerFinalPart8;
var finalCalled = false;
var useDataURI = false;

if(typeof window.Blob !== 'function' || typeof window.URL !== 'function' || typeof window.File !== 'function' || typeof window.FileReader !== 'function' || typeof window.FileList !== 'function'){
	if(FlashDetect.installed && FlashDetect.major >= 10){
		if(window.Worker){
			state = 2;
		} else {
			state = 1;
		}
	} else {
		if(typeof window.File == 'undefined' || typeof window.FileReader == 'undefined' || typeof window.FileList == 'undefined'){
			// Incompatible
		} else {
			if(window.Worker){
				state = 4;
			} else {
				state = 3;
			}
			useDataURI = true;
		}
	}
} else {
	if(window.Worker){
		state = 4;
	} else {
		state = 3;
	}
}

try {
	var worker = new Worker('./task.js');
	var worker1 = new Worker('./task.js');
	var worker2 = new Worker('./task.js');
	var worker3 = new Worker('./task.js');
	var worker4 = new Worker('./task.js');
	var worker5 = new Worker('./task.js');
	var worker6 = new Worker('./task.js');
	var worker7 = new Worker('./task.js');
	var worker8 = new Worker('./task.js');
} catch(e) {
	if(state == 4 || state == 2){
		state = state-1;
		warningString = '<div id="warning">Warning: Web worker file "./task.js" not found. You can still encrypt files, but the browser will temporarily freeze while encrypting files and may crash if you attempt to encrypt large files.</div>'
	}
}
if(state == 4){
	if(useDataURI){
		document.getElementById('application').innerHTML = html5String+dataURIString;
	} else {
		document.getElementById('application').innerHTML = html5String;
	}
	document.getElementById('files').addEventListener('change', handleFileSelect, false);
} else if(state == 3){
	if(useDataURI){
		document.getElementById('application').innerHTML = html5String+warningString+dataURIString;
	} else {
		document.getElementById('application').innerHTML = html5String+warningString;
	}
	document.getElementById('files').addEventListener('change', handleFileSelect, false);
} else if(state == 2){
	document.getElementById('application').innerHTML = flashString;
} else if(state == 1){
	document.getElementById('application').innerHTML = flashString+warningString;
} else {
	document.getElementById('application').innerHTML = noSupportString;
}

if(state == 4){
	worker.addEventListener('message', function(file) {
		if(fileEncrypted){
			if(file.data.text){
				document.getElementById("button" + fileIndex).disabled=false;
				for(var z=0;z<files.length;z++){
					document.getElementById("button" + z).disabled=false;
				}
				document.getElementById("button" + fileIndex).value="Decrypt";
				if(!useDataURI){
					var blob = dataURLToBlob(file.data.text);
					saveAs(blob, fileName.slice(0, -4));
					blob = null;
				} else {
					var tempDataURI = "data:application/octet-stream" + file.data.text.slice(file.data.text.indexOf(";"));
					window.open(tempDataURI);
					tempDataURI = null;
				}
			} else {
				document.getElementById("button" + fileIndex).disabled=false;
				for(var z=0;z<files.length;z++){
					document.getElementById("button" + z).disabled=false;
				}
				document.getElementById("button" + fileIndex).value="Decrypt";
				alert("Incorrect Password");
			}
		} else {
			document.getElementById("button" + fileIndex).disabled=false;
			for(var z=0;z<files.length;z++){
				document.getElementById("button" + z).disabled=false;
			}
			document.getElementById("button" + fileIndex).value="Encrypt";
			if(!useDataURI){
				var blob = new Blob([file.data.text]);
				saveAs(blob, fileName+".enc");
				blob = null;
			} else {
				var tempDataURI = "data:application/octet-stream" + file.data.text;
				window.open(tempDataURI);
				tempDataURI = null;
			}
		}
	}, false);
} else if(state == 2) {
	worker.addEventListener('message', function(file) {
		if(fileEncrypted){
			if(file.data.text){
				fileData=file.data.text.slice(file.data.text.indexOf(",")+1);
				var flashObject = document.getElementById("File Lock2");
				try {
					flashObject.saveFileToFlash(fileData.toString());
				} catch(err) {
					var flashObject = document.getElementById("File Lock");
					try {
						flashObject.saveFileToFlash(fileData.toString());
					} catch(err) {
						alert(err);
						flashObject.incorrectPassword();
					}
				}
				fileData = null;
			} else {
				var flashObject = document.getElementById("File Lock2");
				try {
					flashObject.incorrectPassword();
				} catch(err) {
					var flashObject = document.getElementById("File Lock");
					try {
						flashObject.incorrectPassword();
					} catch(err) {
						alert(err);
					}
				}
				alert("Incorrect Password");
			}
		} else {
			var flashObject = document.getElementById("File Lock2");
			try {
				flashObject.saveFileToFlash(file.data.text.toString());
			} catch(err) {
				var flashObject = document.getElementById("File Lock");
				try {
					flashObject.saveFileToFlash(file.data.text.toString());
				} catch(err) {
					alert(err);
					flashObject.incorrectPassword();
				}
			}
		}
	}, false);
}
if(state == 4 || state == 2){
	worker1.addEventListener('message', function(file) {
		if(file.data.text){
			workerFinalPart1 = file.data.text;
			if(!finalCalled && workerFinalPart1 != null && workerFinalPart2 != null && workerFinalPart3 != null && workerFinalPart4 != null && workerFinalPart5 != null && workerFinalPart6 != null && workerFinalPart7 != null && workerFinalPart8 != null) {
				finalCalled = true;
				finalWorkerFunction();
			}
		} else {
			if(fileEncrypted){
				alert("Incorrect Password");
				if(state == 1 || state == 2) {
					var flashObject = document.getElementById("File Lock2");
					try {
						flashObject.incorrectPassword();
					} catch(err) {
						var flashObject = document.getElementById("File Lock");
						try {
							flashObject.incorrectPassword();
						} catch(err) {
							alert("Error");
						}
					}
				}
			} else {
				alert("Error");
			}
			killVariables();
		}
	}, false);
	worker2.addEventListener('message', function(file) {
		if(file.data.text){
			workerFinalPart2 = file.data.text;
			if(!finalCalled && workerFinalPart1 != null && workerFinalPart2 != null && workerFinalPart3 != null && workerFinalPart4 != null && workerFinalPart5 != null && workerFinalPart6 != null && workerFinalPart7 != null && workerFinalPart8 != null) {
				finalCalled = true;
				finalWorkerFunction();
			}
		}
	}, false);
	worker3.addEventListener('message', function(file) {
		if(file.data.text){
			workerFinalPart3 = file.data.text;
			if(!finalCalled && workerFinalPart1 != null && workerFinalPart2 != null && workerFinalPart3 != null && workerFinalPart4 != null && workerFinalPart5 != null && workerFinalPart6 != null && workerFinalPart7 != null && workerFinalPart8 != null) {
				finalCalled = true;
				finalWorkerFunction();
			}
		}
	}, false);
	worker4.addEventListener('message', function(file) {
		if(file.data.text){
			workerFinalPart4 = file.data.text;
			if(!finalCalled && workerFinalPart1 != null && workerFinalPart2 != null && workerFinalPart3 != null && workerFinalPart4 != null && workerFinalPart5 != null && workerFinalPart6 != null && workerFinalPart7 != null && workerFinalPart8 != null) {
				finalCalled = true;
				finalWorkerFunction();
			}
		}
	}, false);
	worker5.addEventListener('message', function(file) {
		if(file.data.text){
			workerFinalPart5 = file.data.text;
			if(!finalCalled && workerFinalPart1 != null && workerFinalPart2 != null && workerFinalPart3 != null && workerFinalPart4 != null && workerFinalPart5 != null && workerFinalPart6 != null && workerFinalPart7 != null && workerFinalPart8 != null) {
				finalCalled = true;
				finalWorkerFunction();
			}
		}
	}, false);
	worker6.addEventListener('message', function(file) {
		if(file.data.text){
			workerFinalPart6 = file.data.text;
			if(!finalCalled && workerFinalPart1 != null && workerFinalPart2 != null && workerFinalPart3 != null && workerFinalPart4 != null && workerFinalPart5 != null && workerFinalPart6 != null && workerFinalPart7 != null && workerFinalPart8 != null) {
				finalCalled = true;
				finalWorkerFunction();
			}
		}
	}, false);
	worker7.addEventListener('message', function(file) {
		if(file.data.text){
			workerFinalPart7 = file.data.text;
			if(!finalCalled && workerFinalPart1 != null && workerFinalPart2 != null && workerFinalPart3 != null && workerFinalPart4 != null && workerFinalPart5 != null && workerFinalPart6 != null && workerFinalPart7 != null && workerFinalPart8 != null) {
				finalCalled = true;
				finalWorkerFunction();
			}
		}
	}, false);
	worker8.addEventListener('message', function(file) {
		if(file.data.text){
			workerFinalPart8 = file.data.text;
			if(!finalCalled && workerFinalPart1 != null && workerFinalPart2 != null && workerFinalPart3 != null && workerFinalPart4 != null && workerFinalPart5 != null && workerFinalPart6 != null && workerFinalPart7 != null && workerFinalPart8 != null) {
				finalCalled = true;
				finalWorkerFunction();
			}
		}
	}, false);
}

function killVariables() {
	if(state == 1 || state == 2) {
		var flashObject = document.getElementById("File Lock2");
		try {
			flashObject.incorrectPassword();
		} catch(err) {
			var flashObject = document.getElementById("File Lock");
			try {
				flashObject.incorrectPassword();
			} catch(err) {
				alert("Error");
			}
		}
	}
	if(state == 2 || state == 4) {
		try{
		worker.terminate();
		worker1.terminate();
		worker2.terminate();
		worker3.terminate();
		worker4.terminate();
		worker5.terminate();
		worker6.terminate();
		worker7.terminate();
		worker8.terminate();
		fileData=null;
		}catch(e){
		}
		var worker = new Worker('./task.js');
		var worker1 = new Worker('./task.js');
		var worker2 = new Worker('./task.js');
		var worker3 = new Worker('./task.js');
		var worker4 = new Worker('./task.js');
		var worker5 = new Worker('./task.js');
		var worker6 = new Worker('./task.js');
		var worker7 = new Worker('./task.js');
		var worker8 = new Worker('./task.js');
	}
	if(state == 3 || state == 4) {
		document.getElementById("button" + fileIndex).disabled=false;
		for(var z=0;z<files.length;z++){
			document.getElementById("button" + z).disabled=false;
		}
		if(fileEncrypted) {
			document.getElementById("button" + fileIndex).value="Encrypt";
		} else {
			document.getElementById("button" + fileIndex).value="Decrypt";
		}
	}
	finalCalled = false;
}

function finalWorkerFunction() {
	if(state == 4){
		if(fileEncrypted){
			document.getElementById("button" + fileIndex).disabled=false;
			for(var z=0;z<files.length;z++){
				document.getElementById("button" + z).disabled=false;
			}
			document.getElementById("button" + fileIndex).value="Decrypt";
			if(!useDataURI){
				var blob = dataURLToBlob(workerFinalPart1+workerFinalPart2+workerFinalPart3+workerFinalPart4+workerFinalPart5+workerFinalPart6+workerFinalPart7+workerFinalPart8);
				workerFinalPart1=null;
				workerFinalPart2=null;
				workerFinalPart3=null;
				workerFinalPart4=null;
				workerFinalPart5=null;
				workerFinalPart6=null;
				workerFinalPart7=null;
				workerFinalPart8=null;
				saveAs(blob, fileName.slice(0, -4));
				blob = null;
			} else {
				var tempvar = workerFinalPart1+workerFinalPart2+workerFinalPart3+workerFinalPart4+workerFinalPart5+workerFinalPart6+workerFinalPart7+workerFinalPart8;
				workerFinalPart1=null;
				workerFinalPart2=null;
				workerFinalPart3=null;
				workerFinalPart4=null;
				workerFinalPart5=null;
				workerFinalPart6=null;
				workerFinalPart7=null;
				workerFinalPart8=null;
				var tempDataURI = "data:application/octet-stream" + tempvar.slice(tempvar.indexOf(";"));
				tempvar = null;
				window.open(tempDataURI);
				tempDataURI = null;
			}
		} else {
			document.getElementById("button" + fileIndex).disabled=false;
			for(var z=0;z<files.length;z++){
				document.getElementById("button" + z).disabled=false;
			}
			document.getElementById("button" + fileIndex).value="Encrypt";
			if(!useDataURI){
				var fileData = "version1.3|"+workerFinalPart1+"|"+workerFinalPart2+"|"+workerFinalPart3+"|"+workerFinalPart4+"|"+workerFinalPart5+"|"+workerFinalPart6+"|"+workerFinalPart7+"|"+workerFinalPart8
				workerFinalPart1=null;
				workerFinalPart2=null;
				workerFinalPart3=null;
				workerFinalPart4=null;
				workerFinalPart5=null;
				workerFinalPart6=null;
				workerFinalPart7=null;
				workerFinalPart8=null;
				var blob = new Blob([fileData]);
				fileData=null;
				saveAs(blob, fileName+".enc");
				blob = null;
			} else {
				var tempDataURI = "data:application/octet-stream," + "version1.3|"+workerFinalPart1+"|"+workerFinalPart2+"|"+workerFinalPart3+"|"+workerFinalPart4+"|"+workerFinalPart5+"|"+workerFinalPart6+"|"+workerFinalPart7+"|"+workerFinalPart8;
				workerFinalPart1=null;
				workerFinalPart2=null;
				workerFinalPart3=null;
				workerFinalPart4=null;
				workerFinalPart5=null;
				workerFinalPart6=null;
				workerFinalPart7=null;
				workerFinalPart8=null;
				window.open(tempDataURI);
				tempDataURI = null;
			}
		}
	} else if(state == 2) {
		if(fileEncrypted){
			fileData=workerFinalPart1+workerFinalPart2+workerFinalPart3+workerFinalPart4+workerFinalPart5+workerFinalPart6+workerFinalPart7+workerFinalPart8;
			workerFinalPart1=null;
			workerFinalPart2=null;
			workerFinalPart3=null;
			workerFinalPart4=null;
			workerFinalPart5=null;
			workerFinalPart6=null;
			workerFinalPart7=null;
			workerFinalPart8=null;
			fileData=fileData.slice(fileData.indexOf(",")+1);
			var flashObject = document.getElementById("File Lock2");
			try {
				flashObject.saveFileToFlash(fileData.toString());
			} catch(err) {
				var flashObject = document.getElementById("File Lock");
				try {
					flashObject.saveFileToFlash(fileData.toString());
				} catch(err) {
					alert(err);
					flashObject.incorrectPassword();
				}
			}
			fileData = null;
		} else {
			fileData = "version1.3|"+workerFinalPart1+"|"+workerFinalPart2+"|"+workerFinalPart3+"|"+workerFinalPart4+"|"+workerFinalPart5+"|"+workerFinalPart6+"|"+workerFinalPart7+"|"+workerFinalPart8;
			workerFinalPart1=null;
			workerFinalPart2=null;
			workerFinalPart3=null;
			workerFinalPart4=null;
			workerFinalPart5=null;
			workerFinalPart6=null;
			workerFinalPart7=null;
			workerFinalPart8=null;
			var flashObject = document.getElementById("File Lock2");
			try {
				flashObject.saveFileToFlash(fileData.toString());
			} catch(err) {
				var flashObject = document.getElementById("File Lock");
				try {
					flashObject.saveFileToFlash(fileData.toString());
				} catch(err) {
					alert(err);
					flashObject.incorrectPassword();
				}
			}
			fileData = null;
		}
	}
	finalCalled = false;
}

function handleFileSelect(evt) {
	"use strict";
	files = evt.target.files;
	var output = [];
	var isEncrypted;
	var isEncrypted2;
	var isEncrypted3;
	var size;
	var bytes;
	output.push('<tr><th class="paddedCell">Name</th><th class="paddedCell">Size</th><th class="paddedCell">Type</th><th>Password</th><th></th></tr>');
	for (var i = 0, f; f = files[i]; i++) {
		if (f.size < 1024) {
			size = f.size;
			bytes = "B";
		} else if (f.size < 1048576) {
			size = Math.ceil(f.size / 1024);
			bytes = "kB";
		} else {
			size = Math.ceil(f.size / 1048576);
			bytes = "MB";
		}
		if (endsWith(f.name, ".enc")) {
			isEncrypted = "true";
			isEncrypted2 = "Decrypt";
			isEncrypted3 = "Encrypted";
		} else {
			isEncrypted = "false";
			isEncrypted2 = "Encrypt";
			isEncrypted3 = "Unencrypted";
		}
		output.push('<tr><td class="paddedCell">', f.name, '</td>', '<td class="paddedCell">', size, bytes, '</td>', '<td class="paddedCell">', isEncrypted3, '</td><td><input size="27" type="password" id="password', i, '" name="password', i, '" onkeypress="return enterCrypt(event, ', i, ')"></td><td><input class="cryptButton" size="25" type="button" id="button', i,'" onclick="cryptFile(',i,')" value="', isEncrypted2, '"></td></tr>');
	}
	document.getElementById('list').innerHTML = '<table class="filetable" id="filetable">' + output.join('') + "</table>";
}

function enterCrypt(e, i) {
	if(e.keyCode === 13) {
		cryptFile(i);
	}
}

function endsWith(str, suffix) {
	"use strict";
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function cryptFile(i) {
	"use strict";
	var f = files[i];
	fileIndex = i;
	fileName = f.name;
	fileData = null;
	var reader = new FileReader();
	
	if (endsWith(f.name, ".enc")) {
		fileEncrypted = true;
	} else {
		fileEncrypted = false;
	}
	document.getElementById("button" + i).disabled=true;
	for(var z=0;z<files.length;z++){
		document.getElementById("button" + z).disabled=true;
	}
	if (fileEncrypted) {
		document.getElementById("button" + i).value="Decrypting";
	} else {
		document.getElementById("button" + i).value="Encrypting";
	}
		
	reader.onload = (function(theFile) {
		return function(e) {
			if(state == 4){
				if (endsWith(f.name, ".enc")) {
					if(e.target.result.substring(44,52) != "Salted__") {
						var newResult = e.target.result.split("|");
						if(newResult[0] == "version1.3"){
							worker1.postMessage({'file' : newResult[1], 'password' : document.getElementById('password' + i).value, 'encrypt' : false});
							worker2.postMessage({'file' : newResult[2], 'password' : document.getElementById('password' + i).value, 'encrypt' : false});
							worker3.postMessage({'file' : newResult[3], 'password' : document.getElementById('password' + i).value, 'encrypt' : false});
							worker4.postMessage({'file' : newResult[4], 'password' : document.getElementById('password' + i).value, 'encrypt' : false});
							worker5.postMessage({'file' : newResult[5], 'password' : document.getElementById('password' + i).value, 'encrypt' : false});
							worker6.postMessage({'file' : newResult[6], 'password' : document.getElementById('password' + i).value, 'encrypt' : false});
							worker7.postMessage({'file' : newResult[7], 'password' : document.getElementById('password' + i).value, 'encrypt' : false});
							worker8.postMessage({'file' : newResult[8], 'password' : document.getElementById('password' + i).value, 'encrypt' : false});
							reader = null;
							newResult = null;
						} else {
							worker.postMessage({'file' : e.target.result, 'password' : document.getElementById('password' + i).value, 'encrypt' : false});
							reader = null;
						}
					} else {
						alert("Incompatible file, use new version.");
					}
				} else {
					worker1.postMessage({'file' : e.target.result.slice(0,Math.ceil(e.target.result.length/8)), 'password' : document.getElementById('password' + i).value, 'encrypt' : true});
					worker2.postMessage({'file' : e.target.result.slice(Math.ceil(e.target.result.length/8),Math.ceil(e.target.result.length/8)*2), 'password' : document.getElementById('password' + i).value, 'encrypt' : true});
					worker3.postMessage({'file' : e.target.result.slice(Math.ceil(e.target.result.length/8)*2,Math.ceil(e.target.result.length/8)*3), 'password' : document.getElementById('password' + i).value, 'encrypt' : true});
					worker4.postMessage({'file' : e.target.result.slice(Math.ceil(e.target.result.length/8)*3,Math.ceil(e.target.result.length/8)*4), 'password' : document.getElementById('password' + i).value, 'encrypt' : true});
					worker5.postMessage({'file' : e.target.result.slice(Math.ceil(e.target.result.length/8)*4,Math.ceil(e.target.result.length/8)*5), 'password' : document.getElementById('password' + i).value, 'encrypt' : true});
					worker6.postMessage({'file' : e.target.result.slice(Math.ceil(e.target.result.length/8)*5,Math.ceil(e.target.result.length/8)*6), 'password' : document.getElementById('password' + i).value, 'encrypt' : true});
					worker7.postMessage({'file' : e.target.result.slice(Math.ceil(e.target.result.length/8)*6,Math.ceil(e.target.result.length/8)*7), 'password' : document.getElementById('password' + i).value, 'encrypt' : true});
					worker8.postMessage({'file' : e.target.result.slice(Math.ceil(e.target.result.length/8)*7), 'password' : document.getElementById('password' + i).value, 'encrypt' : true});
					reader = null;
				}
			} else {
				if (fileEncrypted) {
					try {
						if(e.target.result.substring(44,52) != "Salted__") {
							var newResult = e.target.result.split("|");
							if(newResult[0] == "version1.3"){
								reader=null;
								fileData = CryptoJS.AES.decrypt(newResult[1], document.getElementById('password' + i).value).toString(CryptoJS.enc.Utf8);
								fileData = fileData.concat(CryptoJS.AES.decrypt(newResult[2], document.getElementById('password' + i).value).toString(CryptoJS.enc.Utf8));
								fileData = fileData.concat(CryptoJS.AES.decrypt(newResult[3], document.getElementById('password' + i).value).toString(CryptoJS.enc.Utf8));
								fileData = fileData.concat(CryptoJS.AES.decrypt(newResult[4], document.getElementById('password' + i).value).toString(CryptoJS.enc.Utf8));
								fileData = fileData.concat(CryptoJS.AES.decrypt(newResult[5], document.getElementById('password' + i).value).toString(CryptoJS.enc.Utf8));
								fileData = fileData.concat(CryptoJS.AES.decrypt(newResult[6], document.getElementById('password' + i).value).toString(CryptoJS.enc.Utf8));
								fileData = fileData.concat(CryptoJS.AES.decrypt(newResult[7], document.getElementById('password' + i).value).toString(CryptoJS.enc.Utf8));
								fileData = fileData.concat(CryptoJS.AES.decrypt(newResult[8], document.getElementById('password' + i).value).toString(CryptoJS.enc.Utf8));
							} else {
								fileData = CryptoJS.AES.decrypt(e.target.result, document.getElementById('password' + i).value).toString(CryptoJS.enc.Utf8);
								reader=null;
							}
							newResult = null
							fileData=fileData.toString().replace(/\n/g,"");
							document.getElementById("button" + i).disabled=false;
							for(var z=0;z<files.length;z++){
								document.getElementById("button" + z).disabled=false;
							}
							document.getElementById("button" + i).value="Decrypt";
							if(!useDataURI){
								var blob = dataURLToBlob(fileData);
								fileData=null;
								saveAs(blob, f.name.slice(0, -4));
								blob = null;
							} else {
								var tempDataURI = "data:application/octet-stream" + fileData.slice(fileData.indexOf(";"));
								window.open(tempDataURI);
								tempDataURI = null;
							}
						} else {
							alert("Incompatible file, use new version.");
						}
					} catch(err) {
						document.getElementById("button" + i).disabled=false;
						for(var z=0;z<files.length;z++){
							document.getElementById("button" + z).disabled=false;
						}
						document.getElementById("button" + i).value="Decrypt";
						if(err=="Error: Malformed UTF-8 data") {
							alert("Incorrect Password");
						} else {
							alert(err);
						}
					}
			   } else {
					try {
						fileData = "version1.3|";
						fileData = fileData.concat(CryptoJS.AES.encrypt(e.target.result.slice(0,Math.ceil(e.target.result.length/8)), document.getElementById('password' + i).value));
						fileData = fileData.concat("|");
						fileData = fileData.concat(CryptoJS.AES.encrypt(e.target.result.slice(Math.ceil(e.target.result.length/8),Math.ceil((e.target.result.length/8)*2)), document.getElementById('password' + i).value));
						fileData = fileData.concat("|");
						fileData = fileData.concat(CryptoJS.AES.encrypt(e.target.result.slice(Math.ceil((e.target.result.length/8)*2),Math.ceil((e.target.result.length/8)*3)), document.getElementById('password' + i).value));
						fileData = fileData.concat("|");
						fileData = fileData.concat(CryptoJS.AES.encrypt(e.target.result.slice(Math.ceil((e.target.result.length/8)*3),Math.ceil((e.target.result.length/8)*4)), document.getElementById('password' + i).value));
						fileData = fileData.concat("|");
						fileData = fileData.concat(CryptoJS.AES.encrypt(e.target.result.slice(Math.ceil((e.target.result.length/8)*4),Math.ceil((e.target.result.length/8)*5)), document.getElementById('password' + i).value));
						fileData = fileData.concat("|");
						fileData = fileData.concat(CryptoJS.AES.encrypt(e.target.result.slice(Math.ceil((e.target.result.length/8)*5),Math.ceil((e.target.result.length/8)*6)), document.getElementById('password' + i).value));
						fileData = fileData.concat("|");
						fileData = fileData.concat(CryptoJS.AES.encrypt(e.target.result.slice(Math.ceil((e.target.result.length/8)*6),Math.ceil((e.target.result.length/8)*7)), document.getElementById('password' + i).value));
						fileData = fileData.concat("|");
						fileData = fileData.concat(CryptoJS.AES.encrypt(e.target.result.slice(Math.ceil((e.target.result.length/8)*7)), document.getElementById('password' + i).value));
						reader=null;
						document.getElementById("button" + i).disabled=false;
						for(var z=0;z<files.length;z++){
							document.getElementById("button" + z).disabled=false;
						}
						document.getElementById("button" + i).value="Encrypt";
						if(!useDataURI){
							var blob = new Blob([fileData]);
							fileData=null;
							saveAs(blob, f.name+".enc");
							blob = null;
						} else {
							var tempDataURI = "data:application/octet-stream," + fileData;
							window.open(tempDataURI);
							tempDataURI = null;
						}
					} catch(err) {
						document.getElementById("button" + i).disabled=false;
						for(var z=0;z<files.length;z++){
							document.getElementById("button" + z).disabled=false;
						}
						document.getElementById("button" + i).value="Encrypt";
						alert("Read Error");
					}
			   }
		   }
		};
	})(f);
	if (fileEncrypted) {
		reader.readAsText(f);
	} else {
		reader.readAsDataURL(f);
	}
}

function flashCrypt(content,password,encrypted) {
	if(state == 2){
		if (encrypted) {
			fileEncrypted = true;
			var newResult = content.split("|");
			if(newResult[0] == "version1.3"){
				worker1.postMessage({'file' : newResult[1], 'password' : password, 'encrypt' : false});
				worker2.postMessage({'file' : newResult[2], 'password' : password, 'encrypt' : false});
				worker3.postMessage({'file' : newResult[3], 'password' : password, 'encrypt' : false});
				worker4.postMessage({'file' : newResult[4], 'password' : password, 'encrypt' : false});
				worker5.postMessage({'file' : newResult[5], 'password' : password, 'encrypt' : false});
				worker6.postMessage({'file' : newResult[6], 'password' : password, 'encrypt' : false});
				worker7.postMessage({'file' : newResult[7], 'password' : password, 'encrypt' : false});
				worker8.postMessage({'file' : newResult[8], 'password' : password, 'encrypt' : false});
			} else {
				worker.postMessage({'file' : content, 'password' : password, 'encrypt' : false});
			}
			newResult=null;
		} else {
			fileEncrypted = false;
			var fullFile = "data:application/octet-stream;base64,"+content;
			worker1.postMessage({'file' : fullFile.slice(0,Math.ceil(fullFile.length/8)), 'password' : password, 'encrypt' : true});
			worker2.postMessage({'file' : fullFile.slice(Math.ceil(fullFile.length/8),Math.ceil(fullFile.length/8)*2), 'password' : password, 'encrypt' : true});
			worker3.postMessage({'file' : fullFile.slice(Math.ceil(fullFile.length/8)*2,Math.ceil(fullFile.length/8)*3), 'password' : password, 'encrypt' : true});
			worker4.postMessage({'file' : fullFile.slice(Math.ceil(fullFile.length/8)*3,Math.ceil(fullFile.length/8)*4), 'password' : password, 'encrypt' : true});
			worker5.postMessage({'file' : fullFile.slice(Math.ceil(fullFile.length/8)*4,Math.ceil(fullFile.length/8)*5), 'password' : password, 'encrypt' : true});
			worker6.postMessage({'file' : fullFile.slice(Math.ceil(fullFile.length/8)*5,Math.ceil(fullFile.length/8)*6), 'password' : password, 'encrypt' : true});
			worker7.postMessage({'file' : fullFile.slice(Math.ceil(fullFile.length/8)*6,Math.ceil(fullFile.length/8)*7), 'password' : password, 'encrypt' : true});
			worker8.postMessage({'file' : fullFile.slice(Math.ceil(fullFile.length/8)*7), 'password' : password, 'encrypt' : true});
			fullFile = null;
		}
	} else {
		if(encrypted) {
			try {
				var newResult = content.split("|");
				if(newResult[0] == "version1.3"){
					fileData = CryptoJS.AES.decrypt(newResult[1], password).toString(CryptoJS.enc.Utf8);
					fileData = fileData.concat(CryptoJS.AES.decrypt(newResult[2], password).toString(CryptoJS.enc.Utf8));
					fileData = fileData.concat(CryptoJS.AES.decrypt(newResult[3], password).toString(CryptoJS.enc.Utf8));
					fileData = fileData.concat(CryptoJS.AES.decrypt(newResult[4], password).toString(CryptoJS.enc.Utf8));
					fileData = fileData.concat(CryptoJS.AES.decrypt(newResult[5], password).toString(CryptoJS.enc.Utf8));
					fileData = fileData.concat(CryptoJS.AES.decrypt(newResult[6], password).toString(CryptoJS.enc.Utf8));
					fileData = fileData.concat(CryptoJS.AES.decrypt(newResult[7], password).toString(CryptoJS.enc.Utf8));
					fileData = fileData.concat(CryptoJS.AES.decrypt(newResult[8], password).toString(CryptoJS.enc.Utf8));
				} else {
					fileData = CryptoJS.AES.decrypt(content, password).toString(CryptoJS.enc.Utf8);
				}
				newResult=null;
				fileData=fileData.slice(fileData.indexOf(",")+1);
				fileData=fileData.replace(/\n/g,"");
				var flashObject = document.getElementById("File Lock2");
				try {
					flashObject.saveFileToFlash(fileData);
				} catch(err) {
					var flashObject = document.getElementById("File Lock");
					try {
						flashObject.saveFileToFlash(fileData.toString());
					} catch(err) {
						alert(err);
						flashObject.incorrectPassword();
					}
				}
				fileData=null;
			} catch(err) {
				if(err=="Error: Malformed UTF-8 data") {
					alert("Incorrect Password");
				} else {
					alert(err);
				}
				var flashObject = document.getElementById("File Lock2");
				try {
					flashObject.incorrectPassword();
				} catch(err) {
					var flashObject = document.getElementById("File Lock");
					try {
						flashObject.incorrectPassword();
					} catch(err) {
						alert(err);
					}
				}
			}
		} else {
			try {
				fullFile = "data:application/octet-stream;base64,"+content;
				fileData = "version1.3|";
				fileData = fileData.concat(CryptoJS.AES.encrypt(fullFile.slice(0,Math.ceil(fullFile.length/8)), password));
				fileData = fileData.concat("|");
				fileData = fileData.concat(CryptoJS.AES.encrypt(fullFile.slice(Math.ceil(fullFile.length/8),Math.ceil((fullFile.length/8)*2)), password));
				fileData = fileData.concat("|");
				fileData = fileData.concat(CryptoJS.AES.encrypt(fullFile.slice(Math.ceil((fullFile.length/8)*2),Math.ceil((fullFile.length/8)*3)), password));
				fileData = fileData.concat("|");
				fileData = fileData.concat(CryptoJS.AES.encrypt(fullFile.slice(Math.ceil((fullFile.length/8)*3),Math.ceil((fullFile.length/8)*4)), password));
				fileData = fileData.concat("|");
				fileData = fileData.concat(CryptoJS.AES.encrypt(fullFile.slice(Math.ceil((fullFile.length/8)*4),Math.ceil((fullFile.length/8)*5)), password));
				fileData = fileData.concat("|");
				fileData = fileData.concat(CryptoJS.AES.encrypt(fullFile.slice(Math.ceil((fullFile.length/8)*5),Math.ceil((fullFile.length/8)*6)), password));
				fileData = fileData.concat("|");
				fileData = fileData.concat(CryptoJS.AES.encrypt(fullFile.slice(Math.ceil((fullFile.length/8)*6),Math.ceil((fullFile.length/8)*7)), password));
				fileData = fileData.concat("|");
				fileData = fileData.concat(CryptoJS.AES.encrypt(fullFile.slice(Math.ceil((fullFile.length/8)*7)), password));
				fullFile=null;
				var flashObject = document.getElementById("File Lock2");
				try {
					flashObject.saveFileToFlash(fileData.toString());
				} catch(err) {
					var flashObject = document.getElementById("File Lock");
					try {
						flashObject.saveFileToFlash(fileData.toString());
					} catch(err) {
						alert(err);
						flashObject.incorrectPassword();
					}
				}
				fileData=null;
			} catch(err) {
				alert(err);
				var flashObject = document.getElementById("File Lock2");
				try {
					flashObject.incorrectPassword();
				} catch(err) {
					var flashObject = document.getElementById("File Lock");
					try {
						flashObject.incorrectPassword();
					} catch(err) {
						alert(err);
					}
				}
			}
		}
	}
}

function flashToConsole(a) {
	try {
		console.log(a);
	} catch(e) {
	}
}
