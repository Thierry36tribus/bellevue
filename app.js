const PERSONS =  [{id:1, name:"Toto"}, {id:2, "name": "Titi"}, {id:3, "name": "Tutu"}]

Vue.component('person-summary', {
  template: '<span>{{person.name}}</span>',
  props: ['person']
})

Vue.component('list', {
  template: 
    `<div>
      <p>Liste de trucs</p>
      <p>Pas tous intéressants</p>
      <ul>
        <li v-for="item in items" :key="item.id"><router-link :to="'/person/' + item.id"><person-summary :person="item" ></person-summary></router-link></li>
      </ul>
    </div>
    `,
    props: ['items']
})

const listView = Vue.extend({ 
  template: '<list :items="persons"></list>',
  data: function() {
    return {
      persons: PERSONS
    }
  }
}) 
const personView = Vue.extend({ 
  template: `<div>
              <h1>{{person.name}}</h1>
              <p>Fiche détaillée</p>
            </div>`,
  data: function() {
    const findPerson = function(personId){
      for (let person of PERSONS) {
        if (person.id == personId) return person
      }
      return undefined
    }
    return {person: findPerson(this.$route.params.personId)}
  }
}) 
const aboutView = { template: '<div>Une très belle vue, version 1.0</div>' }

const router = new VueRouter({
  routes: [
    { path: '/', component: listView, alias: "/list"},
    { path: '/person/:personId', component: personView },
    { path: '/about', component: aboutView },
    { path: '*', redirect: "/"}
  ]
})

new Vue({
  router: router,
  el: '#application'  
})
