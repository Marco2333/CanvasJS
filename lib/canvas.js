(function(window,undefined){
	function Canvas(id) {
		var canvas = document.getElementById(id);
		if(!canvas.getContext('2d')) {
			alert("您的浏览器版本过低，请升级为高版本！");
			return null;
		}
		this.root = canvas;
	}

	Canvas.prototype = {
		init: function() {
			this.ct = this.root.getContext('2d');
			this.ct.beginPath();
			return this;
		},
		strokeRect: function(x, y, width, height) {
			var ct = this.ct;
			ct.strokeRect(x, y, width, height);
			return this;
		},
		fillRect: function(x, y, width, height) {
			var ct = this.ct;
			ct.fillRect(x, y, width, height);
			return this;
		},
		drawTriangle: function(x1, y1, x2, y2, x3, y3) {
			var ct = this.ct;
		
			if(arguments.length < 6) {
				return this;
			} 
			ct.moveTo(x1, y1);
			ct.lineTo(x2, y2);
			ct.lineTo(x3, y3);
			ct.lineTo(x1, y1);

			return this;
		},
		drawRoundRect: function (x, y, width, height, radius) {
			var ct = this.ct;

			ct.moveTo(x + radius, y);
			ct.arcTo(x + width, y, x + width, y + height, radius);
			ct.arcTo(x + width, y + height, x, y + height,radius);
			ct.arcTo(x, y + height, x, y, radius);
			ct.arcTo(x, y, x + radius, y ,radius);

			return this;
		},
		lineArrow: function(start,end,alpha,len,color) {
		    var delta_x, delta_y, theta
		    ,s_x = start.x, s_y = start.y
		    ,e_x = end.x, e_y = end.y
		    ,ct = this.ct;

		 	ct.beginPath();
		    if(color != null && typeof color == "string") {
		        ct.strokeStyle = color;
		    }
		    delta_x = e_x - s_x > 0 ? e_x - s_x : -(e_x - s_x);
		    delta_y = e_y - s_y > 0 ? e_y - s_y : -(e_y - s_y);
		    theta = Math.atan(delta_x/delta_y);
		 
		    delta_x = Math.cos(Math.PI / 2 - alpha - theta) * len;
		    delta_y = Math.sin(Math.PI / 2 - alpha - theta) * len;
		 
		    arrow_x = e_x - s_x > 0 ? e_x - delta_x : e_x + delta_x;
		    arrow_y = e_y - s_y > 0 ? e_y - delta_y : e_y + delta_y;
		 
		    ct.moveTo(e_x,e_y);
		    ct.lineTo(arrow_x,arrow_y);
		 
		    delta_x = Math.sin(theta - alpha) * len;
		    delta_y = Math.cos(theta - alpha) * len;
		 
		    arrow_x = e_x - s_x > 0 ? e_x - delta_x : e_x + delta_x;
		    arrow_y = e_y - s_y > 0 ? e_y - delta_y : e_y + delta_y;
		 
		    ct.moveTo(e_x,e_y);
		    ct.lineTo(arrow_x,arrow_y);        
		 
		    ct.moveTo(e_x,e_y);
		    ct.lineTo(s_x,s_y);

		    return this;
		},
		fillText: function(text, x, y) {
			this.ct.fillText(text, x, y);
			return this;
		},
		lineWidth: function(w) {
			this.ct.lineWidth = w;
			return this;
		},
		lineCap: function(cap) {
			this.ct.lineCap = cap;
			return this;
		},
		lineJoin: function(join) {
			this.ct.lineJoin = join;
			return this;
		},
		lineStyle: function(w, cap, join) {
			var ct = this.ct;
			ct.lineWidth = w;
			ct.lineCap = cap;
			ct.lineJoin = join;
			return this;
		},
		createLinearGradient: function(x1, y1, x2, y2) {
			this.gt = this.ct.createLinearGradient(x1, y1, x2, y2);
			return this;
		},
		createRadialGradient: function(x1, y1, r1, x2, y2, r2) {
			this.gt = this.ct.createRadialGradient(x1, y1, r1, x2, y2, r2);
			return this;
		},
		createGradient: function(flag, a, b, c, d, e, f) {
			var ct = this.ct, args, gt;

			if(flag) {
				args = Array.prototype.slice.call(arguments,5)
				gt = ct.createLinearGradient(a, b, c, d)
			}
			else {
				args = Array.prototype.slice.call(arguments,7);
				gt = ct.createRadialGradient(a, b, c, d, e, f);
			}
			if(!args.length) {
				this.gt = gt;
				return this;
			}

			var i, len, arg0 = args[0];
			if(args.length == 1 && Object.prototype.toString.call(arg0) === "[object Array]") {
				for(i = 1, len = arg0.length;i < len;i += 2) {
					gt.addColorStop(arg0[i - 1],arg0[i]);
				}
				this.gt = gt;
				return this;
			}
			for(i = 1, len = args.length;i < len;i += 2) {
				gt.addColorStop(args[i - 1],args[i]);
			}
			this.gt = this;

			return this;
		},
		addColorStop: function(s, c) {
			var i, len, ct = this.ct, gt = this.gt;
			if(arguments.length === 1 && Object.prototype.toString.call(s) === "[object Array]") {
				for(i = 1, len = s.length;i < len;i += 2) {
					gt.addColorStop(s[i - 1],s[i]);
				}
				return this;
			}
			for(i = 1, len = args.length;i < len;i += 2) {
				gt.addColorStop(args[i - 1],args[i]);
			}
			return this;
		},
		setPattern: function(image, style) {
			var ct = this.ct, 
			pattern = context.createPattern(image, style);
			ct.fillStyle = pattern;
			return this;
		},
		quadraticCurveTo: function(cpx,cpy,x,y) {
			this.ct.quadraticCurveTo(cpx,cpy,x,y);
			return this;
		},
		bezierCurveTo: function(cp1x,cp1y,cp2x,cp2y,x,y) {
			this.ct.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);
			return this;
		},
		save: function() {
			this.ct.save();
			return this;
		},
		restore: function() {
			this.ct.restore();
			return this;
		},
		strokeStyle: function(ss) {
			if(!ss) {
				this.ct.strokeStyle = this.gt;
				return this;
			}
			this.ct.strokeStyle = ss;
			return this;
		},
		moveTo: function(x, y) {
			this.ct.moveTo(x, y);
			return this;
		},
		lineTo: function(x, y) {
			this.ct.lineTo(x, y);
			return this;
		},
		arc: function(x, y, r, begin, end, dir) {
			this.ct.arc(x, y, r, begin, end,dir);
			return this;
		},
		fillStyle: function(fs) {
			if(!fs) {
				this.ct.fillStyle = this.gt;
			}
			this.ct.fillStyle = fs;
			return this;
		},
		stroke: function() {
			var ct = this.ct;
			ct.stroke();
			ct.beginPath();
			return this;
		},
		fill: function() {
			var ct = this.ct;
			ct.fill();
			ct.beginPath();
		}
	}
	window.Canvas = Canvas;
})(window)