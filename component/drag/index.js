// component/drag/index.js
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        dragList: {
            type: Array,
            value: [],
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        drapPlaceIndex: -1,
        drapPlaceHeight: 0,
        dragIndex: -1,
        drapTop: 0,
        elQuery: null,
    },
     
    lifetimes:{
        attached(){
            this.initDragData()
        },
    },
    /**
     * 组件的方法列表
     */
    methods: {
        initDragData() {
            let { dragList } = this.data;
            dragList.forEach( (item, index) => {
                this.getElement(`.drag_block_${index}`, (res)=>{
                    item.height = res.height
                    item.top = res.top
                })
            })
            // console.log('dragList', dragList)
        },
        getElement(str,cal){
            let { elQuery } = this.data; 
            if (elQuery === null ) elQuery = this.createSelectorQuery()
            elQuery.select(str).boundingClientRect()
            elQuery.selectViewport().scrollOffset()
            elQuery.exec((res) => {
                if(cal) cal(res[0])
            })
        },
        bindStartDrag(event) {
            // console.log(event)
            let { index: dragIndex } = event.currentTarget.dataset
            this.getElement(`.drag_block_${dragIndex}`, (res)=>{
                // console.log(res)
                this.setData({
                    dragIndex,
                    drapTop: res.top,
                    drapPlaceIndex: dragIndex ,
                    drapPlaceHeight: res.height * 1.2 ,
                })
            })
           
        },
        bindEndDrag() {
            let { dragIndex , drapPlaceIndex, dragList } = this.data
            // console.log('bindEndDrag', dragIndex , drapPlaceIndex)
            if ( dragIndex === -1) return
            let dragItem = {...dragList[dragIndex]};
            dragList.splice(dragIndex,1);
            if (drapPlaceIndex === -1) {
                drapPlaceIndex = dragList.length 
            } else if ( dragIndex < drapPlaceIndex ) {
                drapPlaceIndex -= 1
            }
            dragList.splice(drapPlaceIndex, 0, dragItem);
    
            this.setData({
                dragList,
                drapPlaceIndex: -1,
                dragIndex: -1,
                drapTop: 0,
            }, ()=>{
                 this.initDragData()
            })
            this.triggerEvent('EndDrag', { dragList } )
        },
        bindMoveDrag(event) {

            
            console.log(event)
            // let drapTop = event.touches[0].pageY  -  event.currentTarget.offsetTop;
      
            let moveTop = event.touches[0].clientY
            let { dragIndex,drapPlaceIndex} = this.data;
            if (dragIndex === -1) return
            // console.log('getDragPlaceIndex', this.getDragPlaceIndex(drapTop))
            drapPlaceIndex = this.getDragPlaceIndex(moveTop)
            this.setData({
                drapPlaceIndex,
                drapTop: moveTop,
            })
           
        },
        getDragPlaceIndex(moveTop){
            let { dragList, drapTop, drapPlaceHeight, dragIndex } = this.data
            let len = dragList.length;
            let heightTotal = moveTop >= drapTop ?  drapPlaceHeight : 0  ;

            for (let i = 0; i <  len; i ++) {
                // if ( dragList[dragIndex].top  +  dragTop  <= dragList[i].top + (dragTop < 0 ? dragList[i].height/10: 0)  ) {
                //     return i 
                // }
                heightTotal += (i !== dragIndex && dragList[i].height);
                if (  moveTop + dragList[i].height/3  <=  heightTotal    ) {
                    return i 
                }
            }
            return -1
        }
    }
})
