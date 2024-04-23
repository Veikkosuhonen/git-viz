import{f as xt}from"./web-DQAYnutL.js";import{s as R,d as st,t as wt,i as _t,a as ct,T as it,b as rt,h as bt,c as zt}from"./transform-Dm26MUf-.js";function Mt(t){let e;for(;e=t.sourceEvent;)t=e;return t}function L(t,e){if(t=Mt(t),e===void 0&&(e=t.currentTarget),e){var n=e.ownerSVGElement||e;if(n.createSVGPoint){var c=n.createSVGPoint();return c.x=t.clientX,c.y=t.clientY,c=c.matrixTransform(e.getScreenCTM().inverse()),[c.x,c.y]}if(e.getBoundingClientRect){var a=e.getBoundingClientRect();return[t.clientX-a.left-e.clientLeft,t.clientY-a.top-e.clientTop]}}return[t.pageX,t.pageY]}const Nt={passive:!1},Q={capture:!0,passive:!1};function ot(t){t.stopImmediatePropagation()}function W(t){t.preventDefault(),t.stopImmediatePropagation()}function yt(t){var e=t.document.documentElement,n=R(t).on("dragstart.drag",W,Q);"onselectstart"in e?n.on("selectstart.drag",W,Q):(e.__noselect=e.style.MozUserSelect,e.style.MozUserSelect="none")}function dt(t,e){var n=t.document.documentElement,c=R(t).on("dragstart.drag",null);e&&(c.on("click.drag",W,Q),setTimeout(function(){c.on("click.drag",null)},0)),"onselectstart"in n?c.on("selectstart.drag",null):(n.style.MozUserSelect=n.__noselect,delete n.__noselect)}const tt=t=>()=>t;function ut(t,{sourceEvent:e,subject:n,target:c,identifier:a,active:u,x:h,y:l,dx:m,dy:d,dispatch:v}){Object.defineProperties(this,{type:{value:t,enumerable:!0,configurable:!0},sourceEvent:{value:e,enumerable:!0,configurable:!0},subject:{value:n,enumerable:!0,configurable:!0},target:{value:c,enumerable:!0,configurable:!0},identifier:{value:a,enumerable:!0,configurable:!0},active:{value:u,enumerable:!0,configurable:!0},x:{value:h,enumerable:!0,configurable:!0},y:{value:l,enumerable:!0,configurable:!0},dx:{value:m,enumerable:!0,configurable:!0},dy:{value:d,enumerable:!0,configurable:!0},_:{value:v}})}ut.prototype.on=function(){var t=this._.on.apply(this._,arguments);return t===this._?this:t};function Tt(t){return!t.ctrlKey&&!t.button}function At(){return this.parentNode}function kt(t,e){return e??{x:t.x,y:t.y}}function Et(){return navigator.maxTouchPoints||"ontouchstart"in this}function jt(){var t=Tt,e=At,n=kt,c=Et,a={},u=st("start","drag","end"),h=0,l,m,d,v,N=0;function p(o){o.on("mousedown.drag",y).filter(c).on("touchstart.drag",f).on("touchmove.drag",s,Nt).on("touchend.drag touchcancel.drag",x).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function y(o,z){if(!(v||!t.call(this,o,z))){var A=M(this,e.call(this,o,z),o,z,"mouse");A&&(R(o.view).on("mousemove.drag",b,Q).on("mouseup.drag",i,Q),yt(o.view),ot(o),d=!1,l=o.clientX,m=o.clientY,A("start",o))}}function b(o){if(W(o),!d){var z=o.clientX-l,A=o.clientY-m;d=z*z+A*A>N}a.mouse("drag",o)}function i(o){R(o.view).on("mousemove.drag mouseup.drag",null),dt(o.view,d),W(o),a.mouse("end",o)}function f(o,z){if(t.call(this,o,z)){var A=o.changedTouches,j=e.call(this,o,z),I=A.length,P,B;for(P=0;P<I;++P)(B=M(this,j,o,z,A[P].identifier,A[P]))&&(ot(o),B("start",o,A[P]))}}function s(o){var z=o.changedTouches,A=z.length,j,I;for(j=0;j<A;++j)(I=a[z[j].identifier])&&(W(o),I("drag",o,z[j]))}function x(o){var z=o.changedTouches,A=z.length,j,I;for(v&&clearTimeout(v),v=setTimeout(function(){v=null},500),j=0;j<A;++j)(I=a[z[j].identifier])&&(ot(o),I("end",o,z[j]))}function M(o,z,A,j,I,P){var B=u.copy(),G=L(P||A,z),Z,J,r;if((r=n.call(o,new ut("beforestart",{sourceEvent:A,target:p,identifier:I,active:h,x:G[0],y:G[1],dx:0,dy:0,dispatch:B}),j))!=null)return Z=r.x-G[0]||0,J=r.y-G[1]||0,function w(g,_,T){var k=G,E;switch(g){case"start":a[I]=w,E=h++;break;case"end":delete a[I],--h;case"drag":G=L(T||_,z),E=h;break}B.call(g,o,new ut(g,{sourceEvent:_,subject:r,target:p,identifier:I,active:E,x:G[0]+Z,y:G[1]+J,dx:G[0]-k[0],dy:G[1]-k[1],dispatch:B}),j)}}return p.filter=function(o){return arguments.length?(t=typeof o=="function"?o:tt(!!o),p):t},p.container=function(o){return arguments.length?(e=typeof o=="function"?o:tt(o),p):e},p.subject=function(o){return arguments.length?(n=typeof o=="function"?o:tt(o),p):n},p.touchable=function(o){return arguments.length?(c=typeof o=="function"?o:tt(!!o),p):c},p.on=function(){var o=u.on.apply(u,arguments);return o===u?p:o},p.clickDistance=function(o){return arguments.length?(N=(o=+o)*o,p):Math.sqrt(N)},p}function Dt(t){const e=+this._x.call(null,t),n=+this._y.call(null,t);return pt(this.cover(e,n),e,n,t)}function pt(t,e,n,c){if(isNaN(e)||isNaN(n))return t;var a,u=t._root,h={data:c},l=t._x0,m=t._y0,d=t._x1,v=t._y1,N,p,y,b,i,f,s,x;if(!u)return t._root=h,t;for(;u.length;)if((i=e>=(N=(l+d)/2))?l=N:d=N,(f=n>=(p=(m+v)/2))?m=p:v=p,a=u,!(u=u[s=f<<1|i]))return a[s]=h,t;if(y=+t._x.call(null,u.data),b=+t._y.call(null,u.data),e===y&&n===b)return h.next=u,a?a[s]=h:t._root=h,t;do a=a?a[s]=new Array(4):t._root=new Array(4),(i=e>=(N=(l+d)/2))?l=N:d=N,(f=n>=(p=(m+v)/2))?m=p:v=p;while((s=f<<1|i)===(x=(b>=p)<<1|y>=N));return a[x]=u,a[s]=h,t}function It(t){var e,n,c=t.length,a,u,h=new Array(c),l=new Array(c),m=1/0,d=1/0,v=-1/0,N=-1/0;for(n=0;n<c;++n)isNaN(a=+this._x.call(null,e=t[n]))||isNaN(u=+this._y.call(null,e))||(h[n]=a,l[n]=u,a<m&&(m=a),a>v&&(v=a),u<d&&(d=u),u>N&&(N=u));if(m>v||d>N)return this;for(this.cover(m,d).cover(v,N),n=0;n<c;++n)pt(this,h[n],l[n],t[n]);return this}function St(t,e){if(isNaN(t=+t)||isNaN(e=+e))return this;var n=this._x0,c=this._y0,a=this._x1,u=this._y1;if(isNaN(n))a=(n=Math.floor(t))+1,u=(c=Math.floor(e))+1;else{for(var h=a-n||1,l=this._root,m,d;n>t||t>=a||c>e||e>=u;)switch(d=(e<c)<<1|t<n,m=new Array(4),m[d]=l,l=m,h*=2,d){case 0:a=n+h,u=c+h;break;case 1:n=a-h,u=c+h;break;case 2:a=n+h,c=u-h;break;case 3:n=a-h,c=u-h;break}this._root&&this._root.length&&(this._root=l)}return this._x0=n,this._y0=c,this._x1=a,this._y1=u,this}function Pt(){var t=[];return this.visit(function(e){if(!e.length)do t.push(e.data);while(e=e.next)}),t}function $t(t){return arguments.length?this.cover(+t[0][0],+t[0][1]).cover(+t[1][0],+t[1][1]):isNaN(this._x0)?void 0:[[this._x0,this._y0],[this._x1,this._y1]]}function Y(t,e,n,c,a){this.node=t,this.x0=e,this.y0=n,this.x1=c,this.y1=a}function Yt(t,e,n){var c,a=this._x0,u=this._y0,h,l,m,d,v=this._x1,N=this._y1,p=[],y=this._root,b,i;for(y&&p.push(new Y(y,a,u,v,N)),n==null?n=1/0:(a=t-n,u=e-n,v=t+n,N=e+n,n*=n);b=p.pop();)if(!(!(y=b.node)||(h=b.x0)>v||(l=b.y0)>N||(m=b.x1)<a||(d=b.y1)<u))if(y.length){var f=(h+m)/2,s=(l+d)/2;p.push(new Y(y[3],f,s,m,d),new Y(y[2],h,s,f,d),new Y(y[1],f,l,m,s),new Y(y[0],h,l,f,s)),(i=(e>=s)<<1|t>=f)&&(b=p[p.length-1],p[p.length-1]=p[p.length-1-i],p[p.length-1-i]=b)}else{var x=t-+this._x.call(null,y.data),M=e-+this._y.call(null,y.data),o=x*x+M*M;if(o<n){var z=Math.sqrt(n=o);a=t-z,u=e-z,v=t+z,N=e+z,c=y.data}}return c}function Xt(t){if(isNaN(v=+this._x.call(null,t))||isNaN(N=+this._y.call(null,t)))return this;var e,n=this._root,c,a,u,h=this._x0,l=this._y0,m=this._x1,d=this._y1,v,N,p,y,b,i,f,s;if(!n)return this;if(n.length)for(;;){if((b=v>=(p=(h+m)/2))?h=p:m=p,(i=N>=(y=(l+d)/2))?l=y:d=y,e=n,!(n=n[f=i<<1|b]))return this;if(!n.length)break;(e[f+1&3]||e[f+2&3]||e[f+3&3])&&(c=e,s=f)}for(;n.data!==t;)if(a=n,!(n=n.next))return this;return(u=n.next)&&delete n.next,a?(u?a.next=u:delete a.next,this):e?(u?e[f]=u:delete e[f],(n=e[0]||e[1]||e[2]||e[3])&&n===(e[3]||e[2]||e[1]||e[0])&&!n.length&&(c?c[s]=n:this._root=n),this):(this._root=u,this)}function Bt(t){for(var e=0,n=t.length;e<n;++e)this.remove(t[e]);return this}function Vt(){return this._root}function Gt(){var t=0;return this.visit(function(e){if(!e.length)do++t;while(e=e.next)}),t}function qt(t){var e=[],n,c=this._root,a,u,h,l,m;for(c&&e.push(new Y(c,this._x0,this._y0,this._x1,this._y1));n=e.pop();)if(!t(c=n.node,u=n.x0,h=n.y0,l=n.x1,m=n.y1)&&c.length){var d=(u+l)/2,v=(h+m)/2;(a=c[3])&&e.push(new Y(a,d,v,l,m)),(a=c[2])&&e.push(new Y(a,u,v,d,m)),(a=c[1])&&e.push(new Y(a,d,h,l,v)),(a=c[0])&&e.push(new Y(a,u,h,d,v))}return this}function Ct(t){var e=[],n=[],c;for(this._root&&e.push(new Y(this._root,this._x0,this._y0,this._x1,this._y1));c=e.pop();){var a=c.node;if(a.length){var u,h=c.x0,l=c.y0,m=c.x1,d=c.y1,v=(h+m)/2,N=(l+d)/2;(u=a[0])&&e.push(new Y(u,h,l,v,N)),(u=a[1])&&e.push(new Y(u,v,l,m,N)),(u=a[2])&&e.push(new Y(u,h,N,v,d)),(u=a[3])&&e.push(new Y(u,v,N,m,d))}n.push(c)}for(;c=n.pop();)t(c.node,c.x0,c.y0,c.x1,c.y1);return this}function Ot(t){return t[0]}function Ft(t){return arguments.length?(this._x=t,this):this._x}function Kt(t){return t[1]}function Lt(t){return arguments.length?(this._y=t,this):this._y}function vt(t,e,n){var c=new lt(e??Ot,n??Kt,NaN,NaN,NaN,NaN);return t==null?c:c.addAll(t)}function lt(t,e,n,c,a,u){this._x=t,this._y=e,this._x0=n,this._y0=c,this._x1=a,this._y1=u,this._root=void 0}function ht(t){for(var e={data:t.data},n=e;t=t.next;)n=n.next={data:t.data};return e}var X=vt.prototype=lt.prototype;X.copy=function(){var t=new lt(this._x,this._y,this._x0,this._y0,this._x1,this._y1),e=this._root,n,c;if(!e)return t;if(!e.length)return t._root=ht(e),t;for(n=[{source:e,target:t._root=new Array(4)}];e=n.pop();)for(var a=0;a<4;++a)(c=e.source[a])&&(c.length?n.push({source:c,target:e.target[a]=new Array(4)}):e.target[a]=ht(c));return t};X.add=Dt;X.addAll=It;X.cover=St;X.data=Pt;X.extent=$t;X.find=Yt;X.remove=Xt;X.removeAll=Bt;X.root=Vt;X.size=Gt;X.visit=qt;X.visitAfter=Ct;X.x=Ft;X.y=Lt;function V(t){return function(){return t}}function U(t){return(t()-.5)*1e-6}function Rt(t){return t.index}function ft(t,e){var n=t.get(e);if(!n)throw new Error("node not found: "+e);return n}function Ut(t){var e=Rt,n=N,c,a=V(30),u,h,l,m,d,v=1;t==null&&(t=[]);function N(f){return 1/Math.min(l[f.source.index],l[f.target.index])}function p(f){for(var s=0,x=t.length;s<v;++s)for(var M=0,o,z,A,j,I,P,B;M<x;++M)o=t[M],z=o.source,A=o.target,j=A.x+A.vx-z.x-z.vx||U(d),I=A.y+A.vy-z.y-z.vy||U(d),P=Math.sqrt(j*j+I*I),P=(P-u[M])/P*f*c[M],j*=P,I*=P,A.vx-=j*(B=m[M]),A.vy-=I*B,z.vx+=j*(B=1-B),z.vy+=I*B}function y(){if(h){var f,s=h.length,x=t.length,M=new Map(h.map((z,A)=>[e(z,A,h),z])),o;for(f=0,l=new Array(s);f<x;++f)o=t[f],o.index=f,typeof o.source!="object"&&(o.source=ft(M,o.source)),typeof o.target!="object"&&(o.target=ft(M,o.target)),l[o.source.index]=(l[o.source.index]||0)+1,l[o.target.index]=(l[o.target.index]||0)+1;for(f=0,m=new Array(x);f<x;++f)o=t[f],m[f]=l[o.source.index]/(l[o.source.index]+l[o.target.index]);c=new Array(x),b(),u=new Array(x),i()}}function b(){if(h)for(var f=0,s=t.length;f<s;++f)c[f]=+n(t[f],f,t)}function i(){if(h)for(var f=0,s=t.length;f<s;++f)u[f]=+a(t[f],f,t)}return p.initialize=function(f,s){h=f,d=s,y()},p.links=function(f){return arguments.length?(t=f,y(),p):t},p.id=function(f){return arguments.length?(e=f,p):e},p.iterations=function(f){return arguments.length?(v=+f,p):v},p.strength=function(f){return arguments.length?(n=typeof f=="function"?f:V(+f),b(),p):n},p.distance=function(f){return arguments.length?(a=typeof f=="function"?f:V(+f),i(),p):a},p}const Wt=1664525,Ht=1013904223,gt=4294967296;function Qt(){let t=1;return()=>(t=(Wt*t+Ht)%gt)/gt}function Zt(t){return t.x}function Jt(t){return t.y}var te=10,ee=Math.PI*(3-Math.sqrt(5));function ne(t){var e,n=1,c=.001,a=1-Math.pow(c,1/300),u=0,h=.6,l=new Map,m=wt(N),d=st("tick","end"),v=Qt();t==null&&(t=[]);function N(){p(),d.call("tick",e),n<c&&(m.stop(),d.call("end",e))}function p(i){var f,s=t.length,x;i===void 0&&(i=1);for(var M=0;M<i;++M)for(n+=(u-n)*a,l.forEach(function(o){o(n)}),f=0;f<s;++f)x=t[f],x.fx==null?x.x+=x.vx*=h:(x.x=x.fx,x.vx=0),x.fy==null?x.y+=x.vy*=h:(x.y=x.fy,x.vy=0);return e}function y(){for(var i=0,f=t.length,s;i<f;++i){if(s=t[i],s.index=i,s.fx!=null&&(s.x=s.fx),s.fy!=null&&(s.y=s.fy),isNaN(s.x)||isNaN(s.y)){var x=te*Math.sqrt(.5+i),M=i*ee;s.x=x*Math.cos(M),s.y=x*Math.sin(M)}(isNaN(s.vx)||isNaN(s.vy))&&(s.vx=s.vy=0)}}function b(i){return i.initialize&&i.initialize(t,v),i}return y(),e={tick:p,restart:function(){return m.restart(N),e},stop:function(){return m.stop(),e},nodes:function(i){return arguments.length?(t=i,y(),l.forEach(b),e):t},alpha:function(i){return arguments.length?(n=+i,e):n},alphaMin:function(i){return arguments.length?(c=+i,e):c},alphaDecay:function(i){return arguments.length?(a=+i,e):+a},alphaTarget:function(i){return arguments.length?(u=+i,e):u},velocityDecay:function(i){return arguments.length?(h=1-i,e):1-h},randomSource:function(i){return arguments.length?(v=i,l.forEach(b),e):v},force:function(i,f){return arguments.length>1?(f==null?l.delete(i):l.set(i,b(f)),e):l.get(i)},find:function(i,f,s){var x=0,M=t.length,o,z,A,j,I;for(s==null?s=1/0:s*=s,x=0;x<M;++x)j=t[x],o=i-j.x,z=f-j.y,A=o*o+z*z,A<s&&(I=j,s=A);return I},on:function(i,f){return arguments.length>1?(d.on(i,f),e):d.on(i)}}}function ie(){var t,e,n,c,a=V(-30),u,h=1,l=1/0,m=.81;function d(y){var b,i=t.length,f=vt(t,Zt,Jt).visitAfter(N);for(c=y,b=0;b<i;++b)e=t[b],f.visit(p)}function v(){if(t){var y,b=t.length,i;for(u=new Array(b),y=0;y<b;++y)i=t[y],u[i.index]=+a(i,y,t)}}function N(y){var b=0,i,f,s=0,x,M,o;if(y.length){for(x=M=o=0;o<4;++o)(i=y[o])&&(f=Math.abs(i.value))&&(b+=i.value,s+=f,x+=f*i.x,M+=f*i.y);y.x=x/s,y.y=M/s}else{i=y,i.x=i.data.x,i.y=i.data.y;do b+=u[i.data.index];while(i=i.next)}y.value=b}function p(y,b,i,f){if(!y.value)return!0;var s=y.x-e.x,x=y.y-e.y,M=f-b,o=s*s+x*x;if(M*M/m<o)return o<l&&(s===0&&(s=U(n),o+=s*s),x===0&&(x=U(n),o+=x*x),o<h&&(o=Math.sqrt(h*o)),e.vx+=s*y.value*c/o,e.vy+=x*y.value*c/o),!0;if(y.length||o>=l)return;(y.data!==e||y.next)&&(s===0&&(s=U(n),o+=s*s),x===0&&(x=U(n),o+=x*x),o<h&&(o=Math.sqrt(h*o)));do y.data!==e&&(M=u[y.data.index]*c/o,e.vx+=s*M,e.vy+=x*M);while(y=y.next)}return d.initialize=function(y,b){t=y,n=b,v()},d.strength=function(y){return arguments.length?(a=typeof y=="function"?y:V(+y),v(),d):a},d.distanceMin=function(y){return arguments.length?(h=y*y,d):Math.sqrt(h)},d.distanceMax=function(y){return arguments.length?(l=y*y,d):Math.sqrt(l)},d.theta=function(y){return arguments.length?(m=y*y,d):Math.sqrt(m)},d}function re(t){var e=V(.1),n,c,a;typeof t!="function"&&(t=V(t==null?0:+t));function u(l){for(var m=0,d=n.length,v;m<d;++m)v=n[m],v.vx+=(a[m]-v.x)*c[m]*l}function h(){if(n){var l,m=n.length;for(c=new Array(m),a=new Array(m),l=0;l<m;++l)c[l]=isNaN(a[l]=+t(n[l],l,n))?0:+e(n[l],l,n)}}return u.initialize=function(l){n=l,h()},u.strength=function(l){return arguments.length?(e=typeof l=="function"?l:V(+l),h(),u):e},u.x=function(l){return arguments.length?(t=typeof l=="function"?l:V(+l),h(),u):t},u}function oe(t){var e=V(.1),n,c,a;typeof t!="function"&&(t=V(t==null?0:+t));function u(l){for(var m=0,d=n.length,v;m<d;++m)v=n[m],v.vy+=(a[m]-v.y)*c[m]*l}function h(){if(n){var l,m=n.length;for(c=new Array(m),a=new Array(m),l=0;l<m;++l)c[l]=isNaN(a[l]=+t(n[l],l,n))?0:+e(n[l],l,n)}}return u.initialize=function(l){n=l,h()},u.strength=function(l){return arguments.length?(e=typeof l=="function"?l:V(+l),h(),u):e},u.y=function(l){return arguments.length?(t=typeof l=="function"?l:V(+l),h(),u):t},u}const et=t=>()=>t;function ae(t,{sourceEvent:e,target:n,transform:c,dispatch:a}){Object.defineProperties(this,{type:{value:t,enumerable:!0,configurable:!0},sourceEvent:{value:e,enumerable:!0,configurable:!0},target:{value:n,enumerable:!0,configurable:!0},transform:{value:c,enumerable:!0,configurable:!0},_:{value:a}})}function at(t){t.stopImmediatePropagation()}function H(t){t.preventDefault(),t.stopImmediatePropagation()}function ue(t){return(!t.ctrlKey||t.type==="wheel")&&!t.button}function se(){var t=this;return t instanceof SVGElement?(t=t.ownerSVGElement||t,t.hasAttribute("viewBox")?(t=t.viewBox.baseVal,[[t.x,t.y],[t.x+t.width,t.y+t.height]]):[[0,0],[t.width.baseVal.value,t.height.baseVal.value]]):[[0,0],[t.clientWidth,t.clientHeight]]}function mt(){return this.__zoom||ct}function ce(t){return-t.deltaY*(t.deltaMode===1?.05:t.deltaMode?1:.002)*(t.ctrlKey?10:1)}function le(){return navigator.maxTouchPoints||"ontouchstart"in this}function he(t,e,n){var c=t.invertX(e[0][0])-n[0][0],a=t.invertX(e[1][0])-n[1][0],u=t.invertY(e[0][1])-n[0][1],h=t.invertY(e[1][1])-n[1][1];return t.translate(a>c?(c+a)/2:Math.min(0,c)||Math.max(0,a),h>u?(u+h)/2:Math.min(0,u)||Math.max(0,h))}function fe(){var t=ue,e=se,n=he,c=ce,a=le,u=[0,1/0],h=[[-1/0,-1/0],[1/0,1/0]],l=250,m=_t,d=st("start","zoom","end"),v,N,p,y=500,b=150,i=0,f=10;function s(r){r.property("__zoom",mt).on("wheel.zoom",I,{passive:!1}).on("mousedown.zoom",P).on("dblclick.zoom",B).filter(a).on("touchstart.zoom",G).on("touchmove.zoom",Z).on("touchend.zoom touchcancel.zoom",J).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}s.transform=function(r,w,g,_){var T=r.selection?r.selection():r;T.property("__zoom",mt),r!==T?z(r,w,g,_):T.interrupt().each(function(){A(this,arguments).event(_).start().zoom(null,typeof w=="function"?w.apply(this,arguments):w).end()})},s.scaleBy=function(r,w,g,_){s.scaleTo(r,function(){var T=this.__zoom.k,k=typeof w=="function"?w.apply(this,arguments):w;return T*k},g,_)},s.scaleTo=function(r,w,g,_){s.transform(r,function(){var T=e.apply(this,arguments),k=this.__zoom,E=g==null?o(T):typeof g=="function"?g.apply(this,arguments):g,D=k.invert(E),S=typeof w=="function"?w.apply(this,arguments):w;return n(M(x(k,S),E,D),T,h)},g,_)},s.translateBy=function(r,w,g,_){s.transform(r,function(){return n(this.__zoom.translate(typeof w=="function"?w.apply(this,arguments):w,typeof g=="function"?g.apply(this,arguments):g),e.apply(this,arguments),h)},null,_)},s.translateTo=function(r,w,g,_,T){s.transform(r,function(){var k=e.apply(this,arguments),E=this.__zoom,D=_==null?o(k):typeof _=="function"?_.apply(this,arguments):_;return n(ct.translate(D[0],D[1]).scale(E.k).translate(typeof w=="function"?-w.apply(this,arguments):-w,typeof g=="function"?-g.apply(this,arguments):-g),k,h)},_,T)};function x(r,w){return w=Math.max(u[0],Math.min(u[1],w)),w===r.k?r:new it(w,r.x,r.y)}function M(r,w,g){var _=w[0]-g[0]*r.k,T=w[1]-g[1]*r.k;return _===r.x&&T===r.y?r:new it(r.k,_,T)}function o(r){return[(+r[0][0]+ +r[1][0])/2,(+r[0][1]+ +r[1][1])/2]}function z(r,w,g,_){r.on("start.zoom",function(){A(this,arguments).event(_).start()}).on("interrupt.zoom end.zoom",function(){A(this,arguments).event(_).end()}).tween("zoom",function(){var T=this,k=arguments,E=A(T,k).event(_),D=e.apply(T,k),S=g==null?o(D):typeof g=="function"?g.apply(T,k):g,O=Math.max(D[1][0]-D[0][0],D[1][1]-D[0][1]),$=T.__zoom,q=typeof w=="function"?w.apply(T,k):w,F=m($.invert(S).concat(O/$.k),q.invert(S).concat(O/q.k));return function(C){if(C===1)C=q;else{var K=F(C),nt=O/K[2];C=new it(nt,S[0]-K[0]*nt,S[1]-K[1]*nt)}E.zoom(null,C)}})}function A(r,w,g){return!g&&r.__zooming||new j(r,w)}function j(r,w){this.that=r,this.args=w,this.active=0,this.sourceEvent=null,this.extent=e.apply(r,w),this.taps=0}j.prototype={event:function(r){return r&&(this.sourceEvent=r),this},start:function(){return++this.active===1&&(this.that.__zooming=this,this.emit("start")),this},zoom:function(r,w){return this.mouse&&r!=="mouse"&&(this.mouse[1]=w.invert(this.mouse[0])),this.touch0&&r!=="touch"&&(this.touch0[1]=w.invert(this.touch0[0])),this.touch1&&r!=="touch"&&(this.touch1[1]=w.invert(this.touch1[0])),this.that.__zoom=w,this.emit("zoom"),this},end:function(){return--this.active===0&&(delete this.that.__zooming,this.emit("end")),this},emit:function(r){var w=R(this.that).datum();d.call(r,this.that,new ae(r,{sourceEvent:this.sourceEvent,target:s,type:r,transform:this.that.__zoom,dispatch:d}),w)}};function I(r,...w){if(!t.apply(this,arguments))return;var g=A(this,w).event(r),_=this.__zoom,T=Math.max(u[0],Math.min(u[1],_.k*Math.pow(2,c.apply(this,arguments)))),k=L(r);if(g.wheel)(g.mouse[0][0]!==k[0]||g.mouse[0][1]!==k[1])&&(g.mouse[1]=_.invert(g.mouse[0]=k)),clearTimeout(g.wheel);else{if(_.k===T)return;g.mouse=[k,_.invert(k)],rt(this),g.start()}H(r),g.wheel=setTimeout(E,b),g.zoom("mouse",n(M(x(_,T),g.mouse[0],g.mouse[1]),g.extent,h));function E(){g.wheel=null,g.end()}}function P(r,...w){if(p||!t.apply(this,arguments))return;var g=r.currentTarget,_=A(this,w,!0).event(r),T=R(r.view).on("mousemove.zoom",S,!0).on("mouseup.zoom",O,!0),k=L(r,g),E=r.clientX,D=r.clientY;yt(r.view),at(r),_.mouse=[k,this.__zoom.invert(k)],rt(this),_.start();function S($){if(H($),!_.moved){var q=$.clientX-E,F=$.clientY-D;_.moved=q*q+F*F>i}_.event($).zoom("mouse",n(M(_.that.__zoom,_.mouse[0]=L($,g),_.mouse[1]),_.extent,h))}function O($){T.on("mousemove.zoom mouseup.zoom",null),dt($.view,_.moved),H($),_.event($).end()}}function B(r,...w){if(t.apply(this,arguments)){var g=this.__zoom,_=L(r.changedTouches?r.changedTouches[0]:r,this),T=g.invert(_),k=g.k*(r.shiftKey?.5:2),E=n(M(x(g,k),_,T),e.apply(this,w),h);H(r),l>0?R(this).transition().duration(l).call(z,E,_,r):R(this).call(s.transform,E,_,r)}}function G(r,...w){if(t.apply(this,arguments)){var g=r.touches,_=g.length,T=A(this,w,r.changedTouches.length===_).event(r),k,E,D,S;for(at(r),E=0;E<_;++E)D=g[E],S=L(D,this),S=[S,this.__zoom.invert(S),D.identifier],T.touch0?!T.touch1&&T.touch0[2]!==S[2]&&(T.touch1=S,T.taps=0):(T.touch0=S,k=!0,T.taps=1+!!v);v&&(v=clearTimeout(v)),k&&(T.taps<2&&(N=S[0],v=setTimeout(function(){v=null},y)),rt(this),T.start())}}function Z(r,...w){if(this.__zooming){var g=A(this,w).event(r),_=r.changedTouches,T=_.length,k,E,D,S;for(H(r),k=0;k<T;++k)E=_[k],D=L(E,this),g.touch0&&g.touch0[2]===E.identifier?g.touch0[0]=D:g.touch1&&g.touch1[2]===E.identifier&&(g.touch1[0]=D);if(E=g.that.__zoom,g.touch1){var O=g.touch0[0],$=g.touch0[1],q=g.touch1[0],F=g.touch1[1],C=(C=q[0]-O[0])*C+(C=q[1]-O[1])*C,K=(K=F[0]-$[0])*K+(K=F[1]-$[1])*K;E=x(E,Math.sqrt(C/K)),D=[(O[0]+q[0])/2,(O[1]+q[1])/2],S=[($[0]+F[0])/2,($[1]+F[1])/2]}else if(g.touch0)D=g.touch0[0],S=g.touch0[1];else return;g.zoom("touch",n(M(E,D,S),g.extent,h))}}function J(r,...w){if(this.__zooming){var g=A(this,w).event(r),_=r.changedTouches,T=_.length,k,E;for(at(r),p&&clearTimeout(p),p=setTimeout(function(){p=null},y),k=0;k<T;++k)E=_[k],g.touch0&&g.touch0[2]===E.identifier?delete g.touch0:g.touch1&&g.touch1[2]===E.identifier&&delete g.touch1;if(g.touch1&&!g.touch0&&(g.touch0=g.touch1,delete g.touch1),g.touch0)g.touch0[1]=this.__zoom.invert(g.touch0[0]);else if(g.end(),g.taps===2&&(E=L(E,this),Math.hypot(N[0]-E[0],N[1]-E[1])<f)){var D=R(this).on("dblclick.zoom");D&&D.apply(this,arguments)}}}return s.wheelDelta=function(r){return arguments.length?(c=typeof r=="function"?r:et(+r),s):c},s.filter=function(r){return arguments.length?(t=typeof r=="function"?r:et(!!r),s):t},s.touchable=function(r){return arguments.length?(a=typeof r=="function"?r:et(!!r),s):a},s.extent=function(r){return arguments.length?(e=typeof r=="function"?r:et([[+r[0][0],+r[0][1]],[+r[1][0],+r[1][1]]]),s):e},s.scaleExtent=function(r){return arguments.length?(u[0]=+r[0],u[1]=+r[1],s):[u[0],u[1]]},s.translateExtent=function(r){return arguments.length?(h[0][0]=+r[0][0],h[1][0]=+r[1][0],h[0][1]=+r[0][1],h[1][1]=+r[1][1],s):[[h[0][0],h[0][1]],[h[1][0],h[1][1]]]},s.constrain=function(r){return arguments.length?(n=r,s):n},s.duration=function(r){return arguments.length?(l=+r,s):l},s.interpolate=function(r){return arguments.length?(m=r,s):m},s.on=function(){var r=d.on.apply(d,arguments);return r===d?s:r},s.clickDistance=function(r){return arguments.length?(i=(r=+r)*r,s):Math.sqrt(i)},s.tapDistance=function(r){return arguments.length?(f=+r,s):f},s}const de=t=>{const e=window.innerWidth*.8,n=window.innerHeight*.8,c=i=>{i.children?i.children.forEach(c):i.importance=t.adjacencyData[i.name]?Object.values(t.adjacencyData[i.name]).reduce((f,s)=>f+s,0):0};c(t.data);const a=bt(t.data).sum(i=>i.lines??0),u=a.links(),h=a.descendants(),l=ne(h).force("link",Ut(u).id(i=>i.index??0).distance(0).strength(.5)).force("charge",ie().strength(i=>3*-Math.min(h[i.index].data.lines??100,500))).force("x",re()).force("y",oe()),m=zt("svg").attr("width",e).attr("height",n).attr("viewBox",[-e/2,-n/2,e,n]).attr("style","max-width: 100%; height: auto;"),d=Object.entries(t.adjacencyData).flatMap(([i,f])=>Object.entries(f).map(([s,x])=>({source:h.find(M=>M.data.name===i),target:h.find(M=>M.data.name===s),value:x}))).filter(i=>i.source&&i.target),v=m.append("g").attr("stroke","#17a").selectAll("line").data(d).join("line").attr("stroke-width",i=>Math.sqrt(i.value)).attr("stroke-opacity",i=>i.value/50).attr("x1",i=>i.source.x).attr("y1",i=>i.source.y).attr("x2",i=>i.target.x).attr("y2",i=>i.target.y),N=m.append("g").attr("stroke","#000").attr("stroke-opacity",1).attr("stroke-width",1.5).selectAll("line").data(u).join("line"),p=m.append("g").attr("fill","#fff").attr("stroke","#000").attr("stroke-width",1.5).selectAll("circle").data(h).join("circle").attr("fill",i=>i.children?null:"#000").attr("stroke",i=>i.children?null:"#fff").attr("r",i=>i.children?.length?10:Math.sqrt(i.data.importance+2)).call(ge(l));p.append("title").text(i=>i.data.name);const y=m.append("g").style("font","10px sans-serif").attr("pointer-events","none").attr("selectable","false").attr("text-anchor","begin").selectAll("text").data(a.descendants()).join("text").style("fill-opacity",i=>i.children?.length?1:i.data.importance/10).text(i=>i.data.name);l.on("tick",()=>{N.attr("x1",i=>i.source.x).attr("y1",i=>i.source.y).attr("x2",i=>i.target.x).attr("y2",i=>i.target.y),v.attr("x1",i=>i.source.x).attr("y1",i=>i.source.y).attr("x2",i=>i.target.x).attr("y2",i=>i.target.y),p.attr("cx",i=>i.x).attr("cy",i=>i.y),y.attr("x",i=>i.x).attr("y",i=>i.y)}),l.on("end",()=>{console.log("Simulation ended")});const b=fe().scaleExtent([.5,32]).on("zoom",i=>{const{transform:f}=i;m.attr("transform",f)});return m.call(b).call(b.transform,ct),xt(()=>l.stop()),m.node()},ge=t=>{function e(a,u){a.active||t.alphaTarget(.2).restart(),u.fx=u.x,u.fy=u.y}function n(a,u){u.fx=a.x,u.fy=a.y}function c(a,u){a.active||t.alphaTarget(0),u.fx=null,u.fy=null}return jt().on("start",e).on("drag",n).on("end",c)};export{de as default};
