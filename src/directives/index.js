import {useStateStore} from '@/utils/store';
import {getPxNumber} from "@/utils/tools.js";


export const draggable = {
    mounted(el) {
        let isDragging = false;
        let startX, startY;

        const iniGrab = (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            el.childNodes[0].style.cursor = 'grabbing';
            e.preventDefault(); // 防止拖动时选择文本
        }

        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (!el._mousedown) {
                    el.childNodes[0].style.cursor = 'grab';
                    el.addEventListener('mousedown', iniGrab)
                    el._mousedown = iniGrab
                }

            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                el.childNodes[0].style.cursor = 'default';
                el.removeEventListener('mousedown', el._mousedown)
                isDragging = false;
                el._mousedown = undefined
            }
        });


        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            el.scrollLeft -= deltaX;
            el.scrollTop -= deltaY;

            startX = e.clientX;
            startY = e.clientY;
        });

        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            el.childNodes[0].style.cursor = 'grab';
        });
    }

};
export const zoom = {
    mounted(el) {
        let rect = el.getBoundingClientRect()
        let store = useStateStore()


        const canvasSizeChange = (event) => {
            event.preventDefault();
            let scaleMatch = el.style.transform.match(/scale\(([^)]+)\)/);
            let scale = scaleMatch ? parseFloat(scaleMatch[1]) : 1;
            const delta = event.deltaY > 0 ? -0.1 : 0.1;

            scale = Math.min(Math.max(scale + delta, 0.1), 4); // 限制缩放范围
            store.setZoomSize(scale)
            const x = event.clientX - rect.left; // 鼠标位置相对于元素的 X 坐标
            const y = event.clientY - rect.top; // 鼠标位置相对于元素的 Y 坐标
            el.style.transformOrigin = `${x}px ${y}px`;
            el.style.transform = `scale(${scale})`;
        }
        window.addEventListener('keydown', (e) => {

            if (e.altKey) {
                e.preventDefault();
                if (!el._zoomListener) {
                    el.addEventListener('wheel', canvasSizeChange);
                    el._zoomListener = canvasSizeChange;
                }
            }
        });

        window.addEventListener('keyup', (e) => {
            console.log(e)
            if (e.key === "Alt") {
                el.removeEventListener('wheel', el._zoomListener);
                el._zoomListener = undefined
            }
        });

        window.addEventListener('blur', function () {
            el.removeEventListener('wheel', el._zoomListener);
            el._zoomListener = undefined
        });

    }
}


export const toolFunction = {
    mounted(el, binding) {
        el._dragSelection = new DragSelection(el);
        el._dragCreate = new DragCreate(el);


        // 初始化代码
        el._dragSelection.trigger()
    },
    updated(el, binding) {
        el._cleanup();
        switch (binding.value) {
            case "move":
                el._dragSelection.trigger()
                break
            case "plus":
                el._dragCreate.trigger()
                break
        }
    },
    beforeUnmount(el) {
        // 移除事件监听器
        el._cleanup();
    }
}


class DragSelection {
    constructor(el) {
        this.el = el;
        this.startX = 0;
        this.startY = 0;
        this.createBox = null;
        this.store = useStateStore()
        this.canTriger = false; // 追踪空格键状态
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.el._cleanup = this.cleanup.bind(this);
    }

    onKeyDown(e) {
        if (e.key === " ") {
            this.canTriger = true;
        }
    }

    onKeyUp(e) {
        if (e.key === " ") {
            this.canTriger = false;
        }
    }

    trigger() {
        this.el.addEventListener('mousedown', this.onMouseDown);
        this.el.style.cursor = 'default';
        document.addEventListener('keydown', this.onKeyDown); // 监听键盘按下
        document.addEventListener('keyup', this.onKeyUp);     // 监听键盘释放
    }

    onMouseDown(e) {
        if (this.canTriger) {
            // 如果空格键被按下，则不执行操作并返回
            return;
        }
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.createBox = document.createElement('div');
        this.createBox.style.position = 'absolute';
        this.createBox.style.border = '1px dashed #000';
        this.el.appendChild(this.createBox);

        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    onMouseMove(e) {
        let currentX = e.clientX - this.el.getBoundingClientRect().left;
        let currentY = e.clientY - this.el.getBoundingClientRect().top;
        let offsetLeft = this.el.offsetLeft - this.el.parentElement.scrollLeft
        let offsetTop = this.el.offsetTop - this.el.parentElement.scrollTop
        let scale = this.store.zoomSize
        let width = Math.abs(currentX - this.startX) / scale;
        let height = Math.abs(currentY - this.startY) / scale;
        this.createBox.style.width = width + 'px';
        this.createBox.style.height = height + 'px';
        this.createBox.style.zIndex = 9;
        this.createBox.style.left = Math.min(currentX, this.startX) - offsetLeft + 'px';
        this.createBox.style.top = Math.min(currentY, this.startY) - offsetTop + 'px';
    }

    onMouseUp() {
        // 这里可以添加检查哪些元素在 selectionBox 内的逻辑
        this.el.removeChild(this.createBox);
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }

    cleanup() {
        this.el.removeEventListener('mousedown', this.onMouseDown);
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        document.removeEventListener('keydown', this.onKeyDown); // 移除监听器
        document.removeEventListener('keyup', this.onKeyUp);     // 移除监听器
    }
}


class DragCreate {
    constructor(el) {
        this.el = el;
        this.startX = 0;
        this.startY = 0;
        this.store = useStateStore()
        this.createBox = null;
        this.canTriger = false; // 追踪空格键状态
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.el._cleanup = this.cleanup.bind(this);
    }

    trigger() {
        this.el.addEventListener('mousedown', this.onMouseDown);
        this.el.style.cursor = 'crosshair';
        document.addEventListener('keydown', this.onKeyDown); // 监听键盘按下
        document.addEventListener('keyup', this.onKeyUp);     // 监听键盘释放
    }

    onKeyDown(e) {
        if (e.key === " ") {
            this.canTriger = true;
        }
    }

    onKeyUp(e) {
        if (e.key === " ") {
            this.canTriger = false;
        }
    }

    onMouseDown(e) {
        if (this.canTriger) {
            // 如果空格键被按下，则不执行操作并返回
            return;
        }
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.createBox = document.createElement('div');
        this.createBox.style.position = 'absolute';
        this.createBox.style.border = '1px solid ';
        this.createBox.style.borderColor = '#000';
        this.el.appendChild(this.createBox);
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    onMouseMove(e) {
        let currentX = e.clientX;
        let currentY = e.clientY;
        let offsetLeft = this.el.offsetLeft - this.el.parentElement.scrollLeft
        let offsetTop = this.el.offsetTop - this.el.parentElement.scrollTop
        let scale = this.store.zoomSize
        let width = Math.abs(currentX - this.startX) / scale;
        let height = Math.abs(currentY - this.startY) / scale;
        this.createBox.style.width = width + 'px';
        this.createBox.style.height = height + 'px';
        this.createBox.style.zIndex = 9;
        this.createBox.style.left = Math.min(currentX, this.startX) - offsetLeft + 'px';
        this.createBox.style.top = Math.min(currentY, this.startY) - offsetTop + 'px';
    }

    onMouseUp() {
        // 如果图形太小就就直接remove
        if (getPxNumber(this.createBox.style.width) < 5 || getPxNumber(this.createBox.style.height) < 5) {
            this.el.removeChild(this.createBox);
            document.removeEventListener('mousemove', this.onMouseMove);
            document.removeEventListener('mouseup', this.onMouseUp);
            return
        }

        let temp = this.store.getCanvasList
        temp.push({
            name: "元素" + (temp.length + 1),
            element: this.createBox,
            index: (temp.length + 1)
        })
        this.store.setCanvasList(temp)


        // 这里可以添加检查哪些元素在 selectionBox 内的逻辑
        // document.body.removeChild(this.createBox);
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }

    cleanup() {
        this.el.removeEventListener('mousedown', this.onMouseDown);
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        document.removeEventListener('keydown', this.onKeyDown); // 移除监听器
        document.removeEventListener('keyup', this.onKeyUp);     // 移除监听器
    }
}


