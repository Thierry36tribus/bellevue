Vue.component('person', {
  template: '<li><a href="">{{person.name}}</a></li>',
  props: ['person']
})

Vue.component('list', {
  template: 
    `<div>
      <p>Liste de trucs</p>
      <p>Pas tous intéressants</p>
      <ul>
        <person v-for="item in items" :person="item" :key="item.name"></person>
      </ul>
    </div>
    `,
    props: ['items']
})

const listView = Vue.extend({ 
  template: '<list :items="persons"></list>',
  data: function() {
    return {
      persons: [{name:"Toto"}, {"name": "Titi"}, {"name": "Tutu"}]
    }
  }
}) 
const aboutView = { template: '<div>Une très belle vue, version 1.0</div>' }

const router = new VueRouter({
  routes: [
    { path: '/', component: listView, alias: "/list"},
    { path: '/about', component: aboutView },
    { path: '*', redirect: "/"}
  ]
})

new Vue({
  router: router,
  el: '#application'  
})
