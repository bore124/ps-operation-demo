export const draggable = {
    mounted(el) {
        let isDragging = false;
        let startX, startY;

        const iniGrab = (e)=>{
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            el.style.cursor = 'grabbing';
            e.preventDefault(); // 防止拖动时选择文本
        }

        window.addEventListener('keydown', (e)=>{
            if (e.code === 'Space'){
                e.preventDefault();
                if (!el._mousedown) {
                    el.style.cursor = 'grab';
                    el.addEventListener('mousedown',iniGrab)
                    el._mousedown = iniGrab
                }

            }
        });

        window.addEventListener('keyup', (e)=>{
            if (e.code === 'Space'){
                e.preventDefault();
                el.style.cursor = 'default';
                el.removeEventListener('mousedown',el._mousedown)
                isDragging = false;
                el._mousedown = undefined
            }
        });


        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            console.log(el.scrollLeft)
            el.scrollLeft -= deltaX;
            el.scrollTop -= deltaY;

            startX = e.clientX;
            startY = e.clientY;
        });

        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            el.style.cursor = 'grab';
        });
    }

};
export const zoom = {
    mounted(el) {
        let rect = el.getBoundingClientRect()

        const canvasSizeChange = (event) => {
           event.preventDefault();
           let scaleMatch = el.style.transform.match(/scale\(([^)]+)\)/);
           let scale = scaleMatch ? parseFloat(scaleMatch[1]) : 1;
           const delta = event.deltaY > 0 ? -0.1 : 0.1;

           scale = Math.min(Math.max(scale + delta, 0.1), 4); // 限制缩放范围

           console.log(event.clientX ,rect.left )
           const x = event.clientX - rect.left ; // 鼠标位置相对于元素的 X 坐标
           const y = event.clientY - rect.top; // 鼠标位置相对于元素的 Y 坐标
           el.style.transformOrigin = `${x}px ${y}px`;
           el.style.transform = `scale(${scale})`;
        }
        window.addEventListener('keydown', (e)=>{

            if ( e.altKey) {
                e.preventDefault();
                if (!el._zoomListener){
                    el.addEventListener('wheel', canvasSizeChange);
                    el._zoomListener = canvasSizeChange;
                }
            }
        });

        window.addEventListener('keyup', (e)=>{
            console.log(e)
            if ( e.key === "Alt") {
                el.removeEventListener('wheel', el._zoomListener);
                el._zoomListener = undefined
            }
        });

        window.addEventListener('blur', function() {
            el.removeEventListener('wheel', el._zoomListener);
            el._zoomListener = undefined
        });

    }
}
