var nextStep = {
    computed: {
        completed() {
            var currentRouteName = this.$route.name;
            var completed = router.app._data.completed.slice();

            return completed.indexOf(currentRouteName) > -1; 
        }
    },
    methods: {
        completeStep() {
            // this.$route.meta.completed = true;
            this.$parent._data.completed.push(this.$route.name);        // This would actually modify the store, not rudely access parent scope
        },
        nextStep() {
            var currentRouteName = this.$route.name;
            var currentStepIndex = workflow.indexOf(currentRouteName);

            return workflow[currentStepIndex + 1];
        }
    }
}

const workflow = [
    'one',
    'two',
    'three',
    'four',
    'five'
];

const grandPadWorkFlow = ['']

const Component1 = {
    template: '#one',
    mixins: [nextStep]
};

const Component2 = {
    template: '#two',
    mixins: [nextStep]
};

const Component3 = {
    template: '#three',
    mixins: [nextStep]
};

const Component4 = {
    template: '#four',
    mixins: [nextStep]
};

const Component5 = {
    template: '#five',
    mixins: [nextStep]
};

const routes = [
    { 
        name: 'one',
        path: '/1', 
        component: Component1,
        meta: {
        }    
    },
    { 
        name: 'two',
        path: '/2', 
        component: Component2,
        meta: {
            requiredStepsBeforeEntry: ['one', 'three']      // different workflows might have different requirements.... 
        }    
    },
    { 
        name: 'three',
        path: '/3', 
        component: Component3,
        meta: {
        }    
    },
    { 
        name: 'four',
        path: '/4', 
        component: Component4,
        meta: {
        }    
    },
    { 
        name: 'five',
        path: '/5', 
        component: Component5,
        meta: {
            requiredStepsBeforeEntry: ['one', 'two', 'three', 'four']
        }    
    },
]

const router = new VueRouter({
    routes
});

new Vue({
    router,
    data() {
        return {
            completed: []               // WOULD BE IN STORE AND/OR ON BASKET
        };
    }
}).$mount('#app');


router.beforeEach((to, from, next) => {
    var requiredSteps = to.meta.requiredStepsBeforeEntry;
    var completedSteps = router.app._data.completed.slice();     // This would use the store, not rudely access app scope

    // skip completed steps
    if(completedSteps.indexOf(to.name) > -1) {
        var toStepIndex = workflow.indexOf(to.name);

        next({ name: workflow[toStepIndex + 1] });
    }

    // If we have required steps, make sure theyve been completed first
    if (requiredSteps && requiredSteps.length > 0) {
        var missingSteps = _.difference(requiredSteps, completedSteps);

        if (missingSteps && missingSteps.length > 0) {
            next({name: missingSteps[0]});
        } 
    } 
    
    // if we get here, go to the original location
    next();
});