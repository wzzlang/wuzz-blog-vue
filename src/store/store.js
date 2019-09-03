import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  lenTabs:'',
  tagList: [],
};
const mutations = {
  add_tag(state, tag) {
    if (state.tagList.some(item => item.path === tag.path))
      return;
    state.tagList.push(tag);
  },
  del_tag(state, tag) {
    for (let i in state.tagList) {
      if (tag === state.tagList[i].path)
        state.tagList.splice(i, 1);
    }
  },
  del_other(state,tag){
    state.tagList=[tag];
  },
  del_all(){
    state.tagList=[];
  },
};
const actions = {
  add_tag(context, tag) {
    context.commit('add_tag', tag);
  },
  del_tag(context, tag) {
    context.commit('del_tag', tag);
  },
  del_other(context, tag) {
    context.commit('del_other', tag);
  },
  del_all(context) {
    context.commit('del_all');
  },
};
export default new Vuex.Store({
  state,
  mutations,
  actions,
})
