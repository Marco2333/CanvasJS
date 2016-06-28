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
		},
		fillRect: function(x, y, width, height) {
			var ct = this.ct;
			ct.fill Rect(x, y, width, height);
		},
		drawTriangle: function(x1, y1, x2, y2, x3, y3, ss, fs) {
			var ct = this.ct;
		
			if(arguments.length < 6) {
				return this;
			} 
			console.log(this,x1,x2,x3);
			ct.moveTo(x1, y1);
			ct.lineTo(x2, y2);
			ct.lineTo(x3, y3);
			ct.lineTo(x1, y1);
			if(fs) {
				ct.fillStyle = fs;
				ct.fill();
			}
			else {
				if(ss) {
					ct.strokeStyle = ss;
				}
				ct.stroke();
			}
			return this;
		},
		drawRoundRect: function (x, y, width, height, radius, ss, fs) {
			var ct = this.ct;
			ct.beginPath();
			ct.moveTo(x + radius, y);
			ct.arcTo(x + width, y, x + width, y + height, radius);
			ct.arcTo(x + width, y + height, x, y + height,radius);
			ct.arcTo(x, y + height, x, y, radius);
			ct.arcTo(x, y, x + radius, y ,radius);

			if(ss) {
				ct.strokeStyle = ss;
				ct.stroke();
			}
			if(fs) {
				ct.fillStyle = fs;
				ct.fill();
			}
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
		    ct.stroke();
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