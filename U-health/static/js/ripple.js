function ripple() {
	var btn = document.querySelector(".btn");
	var ripple = document.querySelector(".ripple");
	btn.onclick=function(event) {
		this.children[0].classList.add("animated");
		var size;
		//计算点击的波纹的最大值，并设置为宽高
		size = Math.max(this.offsetWidth,this.offsetHeight);
		ripple.style.width = size + "px";
		ripple.style.height = size + "px";
		//设置鼠标点击的位置为中心点，在这个中心点向四周散开的效果
		ripple.style.top = -(this.offsetHeight-event.offsetY) + "px";
		ripple.style.left = -(this.offsetWidth/2-event.offsetX) + "px";
		setTimeout(function(){
			btn.children[0].classList.remove("animated");
		},800)
}
}