const  tag={
  state:{
    visitedviews:[],
  },
  mutations:{//这
    ADD_VISITED_VIEWS:(state,view)=>{//打开新页签--添加路由数据的方法      if(state.visitedviews.some(v=>v.path==view.path))return;
      state.visitedviews.push({
        name:view.name,
        path:view.path,
        title:view.meta.title || 'no-title'
      })
    },
    DEL_VISITED_VIEWS:(state,view)=>{//关闭页签--删除路由数据的方法
      for(let [i,v] of state.visitedviews.entries()){
        if(v.path == view.path){
          state.visitedviews.splice(i,1)
          break
        }
      }
    }
  },
  actions:{//调用这里去触发mutations，如何调用？在组件内使用this.$store.dispatch('action中对应名字', 参数)
    addVisitedViews({commit},view){//通过解构赋值得到commit方法
      commit('ADD_VISITED_VIEWS',view)//去触发ADD_VISITED_VIEWS，并传入参数
    },
    delVisitedViews({commit},state,view){
      return new Promise((resolve)=>{//resolve方法：未来成功后回掉的方法
        commit('DEL_VISITED_VIEWS',view);
        resolve([...state.visitedviews]);
      });
    }

  }
}
export default tagsview
