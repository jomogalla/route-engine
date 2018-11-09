## SETUP:
1. Open index.html in browser
2. done


## PROS of this system:
- Easy to understand workflows
- Easy to compose new workflows

## Cons of this system:
- Could be potentially confusing with both routes and workflow containing overlapping/disparate data 
- route guards and mixin might be hard to understand at first glance (behind the scenes magic)
- route guards and mixin could continue to grow and become unwieldy or start to contain a lot of switchy statements
 

## REMAINING QUESTIONS:
- How to repeat certain workflow pieces (such as Config for multiple devices)
  - modify the steps array with new steps if devices are added? Would probably need to have the steps store a CCIN or uid of some sort

- different workflows might have different required steps... how do we work this in?
  - Have a requiredSteps override in the workflow array?? having required steps in two places might b weird
 

- Steps such as cart summary could have multiple different next steps, how do we account for this?