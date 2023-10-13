This directory is used for wrapping the CSS / Style libary chosen 
for this project, so that:

1. We avoid namespace collisions.
2. We can easily swap out one libary for another, simply by 
redoing these wrapper components.

### Example

We choose Semantic UI.
We wrap all the SUI components here.
Thus, Button becomes AppButton, etc.
We change to Material UI.
We then only have to change the wrappers.
Thus, MUI's Button replaces SUI's Button inside AppButton.
Everything else works easily thereafter.

### Conventions

Wrapper Component is named as AppComponent, e.g. AppButton, AppAccordion, etc.